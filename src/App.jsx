import React from 'react';
import './assets/css/index.css';
import ChatBot from './components/chatbot/ChatBot';
import NavBar from './parts/navbar';

function App() {
  return (
    <div className="App">
       <NavBar/>
       <ChatBot />
    </div>
  )
}

export default App
