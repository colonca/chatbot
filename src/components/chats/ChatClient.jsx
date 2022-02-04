import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';
import Message from '../Message';
import uuid from '../../utils/uuid';
import useLocalStorageClient from '../../hooks/useLocalStorageClient';
import { read, save } from '../../services/localstorage';

function ChatClient() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { key } = useLocalStorageClient();

  useEffect(() => {
    const data = read('MESSAGES-CLIENT');
    if (data) setMessages(data);
  }, []);

  useEffect(() => {
    save('MESSAGES-CLIENT', messages);
  }, [messages]);

  useEffect(() => {
    if (key) {
      socket.emit('ticket', {
        client: key,
        area: 'soporte'
      });
      socket.on('message', (value) => {
        if (value.receptor === key) {
          setMessages([...messages, { own: false, content: [value.text] }]);
        }
      });
    }
  }, [key, messages]);

  const handlesubmit = () => {
    if (message) {
      setMessages([...messages, { own: true, content: [message] }]);
      socket.emit('message', {
        emisor: key,
        type: 'cliente',
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
              handlesubmit();
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
            if (event.code === 'Enter') handlesubmit();
          }}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
    </div>
  );
}

export default ChatClient;
