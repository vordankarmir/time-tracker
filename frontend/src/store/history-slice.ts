import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface History {
  id: number;
  name: string;
  timer: string;
  date: number;
  checked: boolean;
}

interface HistoryState {
  history: History[];
}

interface CheckEvent {
  id: number;
  checked: boolean;
}

const initialHistory: HistoryState = {
  history: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState: initialHistory,
  reducers: {
    addToHistory: (state, action: PayloadAction<History>) => {
      state.history.push(action.payload);
      state.history.sort((a, b) => b.id - a.id);
    },
    setHistory: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
    },
    changeCheckedStatus: (state, action: PayloadAction<CheckEvent>) => {
      const currentSession = state.history.find(
        (h) => h.id === action.payload.id
      );
      if (currentSession) {
        currentSession.checked = action.payload.checked;
        state.history.push();
      }
    },
  },
});

export const { addToHistory, setHistory, changeCheckedStatus } =
  historySlice.actions;
export const historyReducer = historySlice.reducer;
