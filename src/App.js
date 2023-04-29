import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TaskList from "./TaskList";

function App() {
  return (
    <div className="App">
      <h1>Homework Tracker</h1>
      <TaskList />
    </div>
  );
}

export default App;
