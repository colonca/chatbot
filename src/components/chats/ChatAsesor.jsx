import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import socket from '../../services/socket';
import Message from '../Message';
import uuid from '../../utils/uuid';
import { read, save } from '../../services/localstorage';

function ChatAsesor() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    const data = read('MESSAGES-ASESOR');
    if (data) setMessages(data);
  }, []);

  useEffect(() => {
    save('MESSAGES-ASESOR', messages);
  }, [messages]);

  useEffect(() => {
    socket.emit('asesor', {
      id: user.id,
      name: user.name
    });
    socket.on('message', (value) => {
      if (value.receptor === user.id) {
        setMessages([...messages, { own: false, content: [value.text] }]);
      }
    });
  }, [messages, user]);

  const submit = () => {
    if (message) {
      setMessages([...messages, { own: true, content: [message] }]);
      socket.emit('message', {
        emisor: user.id,
        type: 'asesor',
        text: message
      });
    }
    setMessage('');
  };

  return (
    <div>
      <div className="h-96 overflow-y-auto py-4">
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
              submit();
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
          type="text"
          value={message}
          name="message"
          onKeyPress={(event) => {
            if (event.code === 'Enter') submit();
          }}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
    </div>
  );
}

export default ChatAsesor;
