// App.js
import React from 'react';
import Chatbot from './Chatbot';
import './App.css';
import botLogo from './illustrations/Rectangle_50.png';


function App() {
  return (
    <div className="App">
      <div className='title'>
        <img src={botLogo} alt='bot-logo' width={50} height={50}/>
      <h1>Akash Opensource AI Chatbot</h1>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
