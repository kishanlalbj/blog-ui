import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div data-test='app' className='App'>
      <h4>React JS</h4>
      <p data-test='app-counter'>{count}</p>
      <button
        data-test='app-button-increment'
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <button
        data-test='app-button-decrement'
        onClick={() => setCount(count - 1)}
      >
        decrement
      </button>
    </div>
  );
}

export default App;
