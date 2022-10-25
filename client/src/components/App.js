import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route, 
  } from "react-router-dom";
  import userPage from './userPage/userPage';

import './App.css';

const App = () => {
    return (
        <div className="App">
           <Router>
            <Routes>
              <Route path="/user" element = {<userPage/>}/>
             
            </Routes>
           </Router>
           </div>
          );
}

export default App;
