// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {setToken} from '../src/components/service/Storage.service'
import Home from './components/controller/home/Home';
import Signin from './components/controller/signin/Signin';
import Signup from './components/controller/signup/Signup';
import Users from './components/controller/user/Users';

function App() {
  setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJwbSIsImlhdCI6MTcxNTU3ODQ0MX0.SmD8wAO9Ag8JQKHo36j_TOEBGC7lI8cqsuRoFPeYyIc")
   
  return (
    
    <div className="App">
       <BrowserRouter>
      <div className="wrapper">
        <Routes>
          
          <Route path="/" element={<Home></Home>}> </Route>
          <Route path="/signin" element={<Signin></Signin>}> </Route>
          <Route path="/signup" element={<Signup></Signup>}> </Route>
          <Route path="/users" element={<Users></Users>}> </Route>
         
        </Routes>
      </div>
    </BrowserRouter>
    {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header> */}
    </div>
  );
}

export default App;
