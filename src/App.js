import { useState, useEffect } from 'react';
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
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    document.body.className = mode === 'dark' ? 'dark-mode' : 'light-mode';
  }, [mode]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode('light');
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <>
      <Navbar 
        title="DarkFire TextUtils" 
        mode={mode} 
        toggleMode={toggleMode} 
        aboutText="About"
      />
      <Alert alert={alert} />
      <div className={`container my-3 text-${mode === 'light' ? 'dark' : 'light'}`}>
        <TextForm 
          heading="Enter the text to analyze" 
          mode={mode}
          showAlert={showAlert}
        />
        {/* <About/>  */}
      </div>
    </>
  );
}

export default App;
