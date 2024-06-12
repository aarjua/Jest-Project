import React, {useState} from 'react';
import logo from '../../../logo.svg'
import '../../../App.css';


export default function Home() {
const [count, setCount] = useState(0);

function handleIncrement(){
  setCount(count+1)
}
function handleDecrement(){
  setCount(count-1)
}

  return (
  <div className='App-header'>
    <img src={logo} className="App-logo" alt="app-logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h4>count</h4>
        <p>{count}</p>
        <button name="increment" onClick={handleIncrement}>Increment</button>
        <button name="decrement" onClick={handleDecrement}>Decrement</button>

  </div>
  );
}