import moment from "moment";
import { useState, useEffect } from "react";
import { History, addToHistory } from "../../utils/Config";
import "./style.css";

interface Props {
  props: {
    id: number;
    name: string;
  };
}

function Tracker({ props }: Props) {
  const [time, setTime] = useState("00:00:00");
  const [timerState, setTimerState] = useState("stopped");
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    if (timerState === "running") {
      const intervalId = setInterval(() => {
        setTime(moment(time, "H:mm:ss").add(1, "second").format("H:mm:ss"));
      }, 1000);
      setIntervalId(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerState, time]);

  function hanldeStartOnClick() {
    setTimerState("running");
  }

  async function handleStopOnClick() {
    clearInterval(intervalId);
    setTimerState("stopped");
    const historyToSave: History = {
      id: props.id,
      timer: time,
      name: props.name,
      date: moment(moment.now()).format("DD/MM/YYYY"),
      checked: false,
    };
    await addToHistory([historyToSave]);
    setTime(moment().startOf("day").format("H:mm:ss"));
  }

  function handlePauseOnClick() {
    clearInterval(intervalId);
    setTimerState("stopped");
  }

  return (
    <>
      <div>
        <span className="timer">{time}</span>
        <button className="start-button" onClick={() => hanldeStartOnClick()}>
          Start
        </button>
        <button className="pause-button" onClick={() => handlePauseOnClick()}>
          Pause
        </button>
        <button className="stop-button" onClick={() => handleStopOnClick()}>
          Stop
        </button>
      </div>
    </>
  );
}

export default Tracker;
