import React, { useState } from 'react';
import Message from '../Message';
import uuid from '../../utils/uuid';

function HouseKeeping({ setOperacion }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  function handleSubmit() {
    if (message !== '') {
      if (message === '9' && messages.length === 0) setOperacion('bot');
      let response = '';
      if (messages.length === 0)
        response = {
          own: false,
          content: ['Cual es el Numero de la Habitacón ?']
        };
      if (messages.length === 2)
        response = { own: false, content: ['Cual es su nombre ?'] };
      if (messages.length === 4) {
        response = {
          own: false,
          content: [
            'Gracios por comunicarte con nosotros, pronto estará el servicio en camino.',
            '1. Volver'
          ]
        };
      }
      if (messages.length === 6 && message === '1') setOperacion('bot');
      setMessages([...messages, { own: true, content: [message] }, response]);
    }
    setMessage('');
  }
  return (
    <div>
      <div className="h-96 relative overflow-y-auto py-4">
        <Message
          own={false}
          content={[
            'Estas son las opciones que tenemos dispnibles para ti 😎',
            '1. Toallas 🛀',
            '2. Almohadas ☁',
            '3. Planchas 👔',
            '4. Cobijas 🥶',
            '5. Solicitud de mantenimiento 🛠',
            '6. Mesas y Sillas 🪑',
            '7. Kit Dental 🦷',
            '8. Kit Afeitar 🪒',
            '9. volver ↩'
          ]}
        />
        {messages &&
          messages.map((item) => (
            <Message key={uuid()} own={item.own} content={item.content} />
          ))}
      </div>
      <div className="relative block border-t-2 rounded-lg border-gray-100">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 right-1 flex items-center pr-2 cursor-pointer">
          <svg
            onClick={() => {
              handleSubmit();
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </span>
        <input
          className="placeholder:italic placeholder:text-gray-400 block bg-white w-full py-4 pl-2 pr-3 focus:outline-none focus:border-gray-50 focus:ring-gray-50 focus:ring-1 sm:text-sm"
          placeholder="Escribir mensaje"
          value={message || ''}
          type="text"
          onKeyPress={(event) => {
            if (event.code === 'Enter') handleSubmit();
          }}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
    </div>
  );
}

export default HouseKeeping;
