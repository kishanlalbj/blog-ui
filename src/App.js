import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h4>React JS</h4>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  );
}

export default App;
