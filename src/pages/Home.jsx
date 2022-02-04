import React from 'react';
import { Link } from 'react-router-dom';
import Canvas from '../components/chats/Canvas';
import ChatClient from '../components/chats/ChatClient';

function Home() {
  return (
    <>
      <div className="flex justify-end w-11/12 mt-2">
        <Link
          to="/login"
          className="bg-red-500 px-3 py-2 rounded-lg text-white font-semibold"
        >
          Iniciar Sesion
        </Link>
      </div>
      <Canvas>
        <ChatClient />
      </Canvas>
    </>
  );
}

export default Home;
