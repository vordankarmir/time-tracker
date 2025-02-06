import "./App.css";
import Session from "./components/session/Session";
import History from "./components/history/History";

function App() {
  return (
    <div id="App">
      <h1>Timer tracker</h1>
      <Session />
      <History />
    </div>
  );
}

export default App;
