import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sessionsReducer } from "./session-slice";

const sessionsPersistConfig = {
  key: "sessions",
  storage: storage,
  whitelist: ["id", "name"],
};

const rootReducer = combineReducers({
  sessions: persistReducer(sessionsPersistConfig, sessionsReducer),
});

export const store = configureStore({
  reducer: { sessions: sessionsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
