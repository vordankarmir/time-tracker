import React, { useState } from "react";
import "./style.css";
import Tracker from "../tracker/Tracker";

interface Session {
  id: number;
  name: string;
}

function Session() {
  const [newSession, setNewSession] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleNewOnClick = () => {
    setNewSession(true);
    const newSession = {
      id: sessions.length + 1,
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
      setSessions(sessions);
    }
  };

  const handleSetSessionName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(ev.target.value);
  };

  const handleDeleteSession = (index: number) => {
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
            <div key={session.id} className="row">
              <li key={session.id} className="list-item">
                {session.name}
                <Tracker props={{ name: sessionName }} />
              </li>
              <button
                className="delete-button"
                onClick={() => handleDeleteSession(index)}
              >
                Delete session
              </button>
            </div>
          ))}
      </ul>
    </>
  );
}

export default Session;
