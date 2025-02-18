import moment from "moment";
import { useState, useEffect } from "react";
import "./style.css";
import { changeSessionTime } from "../../store/session-slice";
import { useAppDispatch } from "../../store/store";

interface Props {
  props: {
    id: number;
    time: string;
  };
}

function Tracker({ props }: Props) {
  const dispatch = useAppDispatch();
  const [timerState, setTimerState] = useState("stopped");
  const [intervalId, setIntervalId] = useState(0);
  let { id, time } = props;

  useEffect(() => {
    if (timerState === "running") {
      const intervalId = setInterval(() => {
        dispatch(
          changeSessionTime({
            id,
            time: moment(time, "H:mm:ss").add(1, "second").format("H:mm:ss"),
          })
        );
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
  }

  function handlePauseOnClick() {
    clearInterval(intervalId);
    setTimerState("stopped");
  }

  return (
    <>
      <div>
        <span className="timer">{time}</span>
        {timerState === "stopped" ? (
          <button className="start-button" onClick={() => hanldeStartOnClick()}>
            Start
          </button>
        ) : (
          <button className="pause-button" onClick={() => handlePauseOnClick()}>
            Pause
          </button>
        )}
        <button className="stop-button" onClick={() => handleStopOnClick()}>
          Stop
        </button>
      </div>
    </>
  );
}

export default Tracker;
