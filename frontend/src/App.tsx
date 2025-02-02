import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment";

function App() {
  const [time, setTime] = useState("00:00:00");
  const [timerState, setTimerState] = useState("stopped");
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    if (timerState === "running") {
      const intervalId = setInterval(() => {
        setTime(moment(time, "H:mm:ss").add(1, "second").format("H:mm:ss"));
      }, 1000);
      setIntervalId(intervalId);
      return () => clearInterval(intervalId);
    }
  }, [timerState, time]);

  function hanldeStartOnClick() {
    setTimerState("running");
  }

  function handleStopOnClick() {
    clearInterval(intervalId);
    setTimerState("stopped");
    setTime(moment().startOf("day").format("H:mm:ss"));
  }

  function handlePauseOnClick() {
    clearInterval(intervalId);
    setTimerState("stopped");
  }

  return (
    <div id="App">
      <div id="timer" className="timer">
        {time}
      </div>
      <button onClick={() => hanldeStartOnClick()}>
        <span>Start</span>
      </button>
      <button onClick={() => handlePauseOnClick()}>
        <span>Pause</span>
      </button>
      <button onClick={() => handleStopOnClick()}>
        <span>Stop</span>
      </button>
    </div>
  );
}

export default App;
