import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../parts/Sidebar';
import Navbar from '../parts/Navbar';
import useLoadUser from '../hooks/useLoadUser';
import Canvas from '../components/chats/Canvas';
import ChatAsesor from '../components/chats/ChatAsesor';

function Dashboard() {
  useLoadUser();
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
      <Canvas title="Camilo Colón" client={false}>
        <ChatAsesor />
      </Canvas>
    </div>
  );
}

export default Dashboard;
