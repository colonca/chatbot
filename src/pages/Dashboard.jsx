import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';
import Navbar from '../parts/Navbar';
import ChatBot from '../components/chatbot/ChatBot';

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-y-hidden">
        <Sidebar />
        <div className="panel flex-grow flex flex-col px-6 mt-8">
          <Navbar />
          <div className="flex-grow overflow-y-auto">
            <Routes>
              <Route exact path="/dashboard/operadores" />
            </Routes>
          </div>
        </div>
      </div>
      <ChatBot isAsesor />
    </div>
  );
}

export default Dashboard;
