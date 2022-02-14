import React, { useState } from 'react';
import Message from '../Message';
import uuid from '../../utils/uuid';
import OrderServices from '../../services/OrderServices';

const opciones = {
  1: 'Reservar habitación',
  2: 'Reservar jacuzzi',
  3: 'Reservar GYM',
  4: 'Reservar Sendero',
  5: 'Volver'
};

function Reserva({ setOperacion }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  function handleSubmit() {
    if (message !== '') {
      let response = '';
      if (message === '5' && messages.length === 0) setOperacion('bot');
      if (
        messages.length === 0 &&
        (parseInt(message, 10) < 0 || parseInt(message, 10) > 5)
      ) {
        setError('Opción Invalida.');
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
      if (messages.length === 0 && message === '1') {
        response = { own: false, content: ['¿Cual es su nombre?'] };
      }
      if (messages[0].content[0] === '1') {
        if (messages.length === 2) {
          response = { own: false, content: ['¿Numero de Identificación?'] };
        }
        if (messages.length === 4) {
          response = {
            own: false,
            content: ['¿Por Favor ingrese su Correo Electronico?']
          };
        }
      }
      setMessages([...messages, { own: true, content: [message] }, response]);
      setMessage('');
    }
  }
  return (
    <div>
      <div className="h-96 relative overflow-y-auto py-4">
        <Message
          own={false}
          content={[
            'Que tipo de reserva quieres realizar ?',
            '1. Reservar Habitación',
            '2. Reservar Jacuzzi',
            '3. Reservar GYM',
            '4. Reservar Sendero',
            '5. volver ↩'
          ]}
        />
        {error && <Message own={false} content={[error]} />}
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

export default Reserva;
