import React, { useState } from "react";
import "./style.css";
import Tracker from "../tracker/Tracker";

interface Session {
  name: string;
  trackerIsOn: boolean;
}

function Session() {
  const [newSession, setNewSession] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleNewOnClick = () => {
    setNewSession(true);
    const newSession = {
      name: "",
      trackerIsOn: false,
    };
    setSessions(sessions.concat(newSession));
  };

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      setNewSession(false);
      const currentSession = sessions[sessions.length - 1];
      currentSession.name = sessionName;
      currentSession.trackerIsOn = true;
      setSessions(sessions);
    }
  };

  const handleSetSessionName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(ev.target.value);
  };

  const handleDeleteSession = (index: number) => {
    const currentSession = sessions[index];
    if (currentSession != null) {
      currentSession.trackerIsOn = false;
    }
    setSessions(sessions.filter((s, i) => i !== index));
    setNewSession(false);
  };

  return (
    <>
      <div className="session-block">
        <h1 className="session-header">Sessions</h1>
        <button className="new-button" onClick={() => handleNewOnClick()}>
          New
        </button>
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
      </div>
      <ul className="tracker-block">
        {sessions
          .filter((session) => session.name)
          .map((session, index) => (
            <li key={index} className="list-item">
              {session.name}
              <button
                className="delete-button"
                onClick={() => handleDeleteSession(index)}
              >
                Delete session
              </button>
              {session.trackerIsOn ? (
                <>
                  <Tracker />
                </>
              ) : null}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Session;
