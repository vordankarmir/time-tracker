import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Session {
  id: number;
  name: string;
  time: string;
}

interface SessionTime {
  id: number;
  time: string;
}

interface SessionsState {
  sessions: Session[];
}

const initialSessions: SessionsState = {
  sessions: [],
};

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState: initialSessions,
  reducers: {
    addSession: (state, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload);
    },
    updateLatestSession: (state, action: PayloadAction<string>) => {
      if (state.sessions.length > 0) {
        const latestSession = state.sessions[state.sessions.length - 1];
        latestSession.name = action.payload;
      }
    },
    setSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = state.sessions.concat(action.payload);
    },
    deleteSession: (state, action: PayloadAction<number>) => {
      state.sessions = state.sessions.filter(
        (session, i) => i !== action.payload
      );
    },
    deleteLatestSession: (state) => {
      state.sessions.pop();
    },
    changeSessionTime: (state, action: PayloadAction<SessionTime>) => {
      const session = state.sessions.find((s) => s.id === action.payload.id);
      if (session) {
        session.time = action.payload.time;
      }
    },
  },
});

export const {
  setSessions,
  addSession,
  updateLatestSession,
  deleteSession,
  deleteLatestSession,
  changeSessionTime,
} = sessionsSlice.actions;
export const sessionsReducer = sessionsSlice.reducer;
