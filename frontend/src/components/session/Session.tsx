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
  const [trackerIsOn, setTrackerIsOn] = useState(false);

  const handleNewOnClick = () => {
    setNewSession(true);
    const newSession = { id: sessions.length + 1, name: "" };
    setSessions(sessions.concat(newSession));
  };

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      setNewSession(false);
      setTrackerIsOn(true);
      sessions[sessions.length - 1].name = sessionName;
      setSessions(sessions);
    }
  };

  const handleSetSessionName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(ev.target.value);
  };

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter((s) => s.id !== id));
    console.log(sessions);
  };

  return (
    <div className="session-block">
      <h1>Sessions</h1>
      <button onClick={() => handleNewOnClick()}>New</button>
      {newSession ? (
        <input
          type="text"
          placeholder="Name your session"
          onChange={(ev) => handleSetSessionName(ev)}
          onKeyDown={(ev) => handleOnKeyDown(ev)}
        ></input>
      ) : null}
      <div>
        {sessions.map((session) => (
          <div key={session.id}>
            {session.name}
            <button onClick={() => handleDeleteSession(session.id)}>
              Delete session
            </button>
            {trackerIsOn ? <Tracker /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Session;
