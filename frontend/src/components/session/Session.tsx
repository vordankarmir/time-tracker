import React, { useState } from "react";
import "./style.css";
import Tracker from "../tracker/Tracker";
import { loadHistory } from "../../utils/Config";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addSession,
  deleteLatestSession,
  deleteSession,
  updateLatestSession,
} from "../../store/session-slice";

interface Session {
  id: number;
  name: string;
}

function Session() {
  const dispatch = useAppDispatch();
  const [newSession, setNewSession] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const sessions = useAppSelector((state) => state.sessions.sessions);

  const handleNewOnClick = async () => {
    setNewSession(true);
    let id: number;
    if (sessions.length === 0) {
      const data = await loadHistory();
      const history = JSON.parse(data);
      id = (history[history.length - 1]?.id ?? 0) + 1;
    } else {
      id = sessions[sessions.length - 1].id + 1;
    }
    const newSession = {
      id,
      name: "",
      trackerIsOn: false,
    };
    dispatch(addSession(newSession));
  };

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      setNewSession(false);
      dispatch(updateLatestSession(sessionName));
    }
  };

  const handleSetSessionName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(ev.target.value);
  };

  const handleDeleteSession = (index: number) => {
    dispatch(deleteSession(index));
    setNewSession(false);
  };

  const handleSubmitSession = () => {
    setNewSession(false);
    dispatch(updateLatestSession(sessionName));
  };

  const handleClearSessionInput = () => {
    setNewSession(false);
    dispatch(deleteLatestSession());
  };

  return (
    <>
      <div className="session-block">
        <h1 className="session-header">Sessions</h1>
        <button className="new-button" onClick={() => handleNewOnClick()}>
          New
        </button>
        {newSession ? (
          <>
            <button
              className="submit-session-input-button"
              onClick={() => handleSubmitSession()}
            >
              Submit
            </button>
            <button
              className="clear-session-input-button"
              onClick={() => handleClearSessionInput()}
            >
              Clear
            </button>
          </>
        ) : null}
        <div className="input-block">
          {newSession ? (
            <input
              className="session-input"
              type="text"
              placeholder="Name your session"
              onChange={(ev) => handleSetSessionName(ev)}
              onKeyDown={(ev) => handleOnKeyDown(ev)}
            ></input>
          ) : null}
        </div>
        <div className="timers-table-container">
          <table className="timers-table">
            <tbody>
              {sessions
                .filter((session) => session.name)
                .map((session, index) => (
                  <tr key={session.id} className="timer-table-row">
                    <td className="timer-table-data">{session.name}</td>
                    <td className="timer-table-data">
                      <Tracker props={{ name: session.name, id: session.id }} />
                    </td>
                    <td className="timer-table-data">
                      <button
                        className="delete-session-button"
                        onClick={() => handleDeleteSession(index)}
                      >
                        Delete session
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Session;
