
import { useState } from 'react';
import './App.css';
// import About from './component/About';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';
import React from 'react';
import Alert from './component/Alert';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  const[mode, setMode] =useState('dark');

  const toggleMode = () => {
    if (mode === 'light') {
        setMode('dark');
        document.body.style.backgroundColor = 'grey';
    }
    else {
        setMode('light');
        document.body.style.backgroundColor = 'white';
    }
};
  return (
   <>
   
<Navbar title ="DarkFire TextUtils" mode = {mode} toogleMode = {toggleMode} Aboutext = "About"/>
<Alert Alert ="You Are In DarkFire TextUtils"/>
<div className="container my-3">
  

<TextForm heading ="Enter the text to analyze"/>
{/* <About/>  */}
</div>
   </>
  );
}

export default App;
