import React from 'react';
import { Link } from 'react-router-dom';
import ChatBot from '../components/chatbot/ChatBot';

function Home() {
  return (
    <>
      <div className="flex justify-end w-11/12 mt-2">
        <Link
          to="/dashboard"
          className="bg-red-500 px-3 py-2 rounded-lg text-white font-semibold"
        >
          Iniciar Sesion
        </Link>
      </div>
      <ChatBot />
    </>
  );
}

export default Home;
