import moment, { now } from "moment";
import { useState, useEffect } from "react";
import { saveHistory } from "../../utils/Config";

interface Props {
  props: {
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
    const historyToSave = {
      timer: time,
      name: props.name,
      date: moment(now()).format("DD/MM/YYYY"),
    };
    await saveHistory(historyToSave);
    setTime(moment().startOf("day").format("H:mm:ss"));
  }

  function handlePauseOnClick() {
    clearInterval(intervalId);
    setTimerState("stopped");
  }

  return (
    <>
      <div className="timer">{time}</div>
      <button onClick={() => hanldeStartOnClick()}>
        <span>Start</span>
      </button>
      <button onClick={() => handlePauseOnClick()}>
        <span>Pause</span>
      </button>
      <button onClick={() => handleStopOnClick()}>
        <span>Stop</span>
      </button>
    </>
  );
}

export default Tracker;
