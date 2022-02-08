import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';
import Message from '../Message';
import uuid from '../../utils/uuid';
import useLocalStorageClient from '../../hooks/useLocalStorageClient';
import TicketServices from '../../services/TicketService';

function ChatClient() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [position, setPositon] = useState(0);
  const [ticket, setTicket] = useState(null);

  const { key } = useLocalStorageClient();

  useEffect(() => {
    async function fetch() {
      if (key) {
        const resp = await TicketServices.getTicketClient(key);
        if (resp.status === 200) {
          setTicket(resp.result);
          setMessages(
            resp.result.messages.map((item) => ({
              own: item.emisor === key,
              content: [item.text]
            }))
          );
        }
      }
    }
    fetch();
  }, [key]);

  useEffect(() => {
    if (key) {
      socket.emit('TICKET', {
        client: key,
        area: 'SOPORTE'
      });
      socket.on('MESSAGE', (value) => {
        if (value.receptor === key) {
          setMessages([...messages, { own: false, content: [value.text] }]);
        }
      });
      socket.on('QUEUE', (value) => {
        if (value.receptor === key) {
          setPositon(value.position);
        }
      });
    }
  }, [key, messages]);

  const handlesubmit = () => {
    if (message && position === 0) {
      setMessages([...messages, { own: true, content: [message] }]);
      socket.emit('MESSAGE', {
        emisor: key,
        type: 'CLIENTE',
        text: message
      });
    }
    setMessage('');
  };

  return (
    <div>
      <div className="h-96 overflow-y-auto py-4">
        {ticket && (
          <div className="flex flex-col items-center justify-center mb-2 text-sm w-full">
            <p className="">
              <span className="font-semibold">🙆 Asesor/a</span> :{' '}
              {ticket.asesor ? ticket.asesor.name : 'SIN ASIGNAR'}
            </p>
          </div>
        )}
        {position !== 0 && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center my-2 text-sm w-full">
            <p className="w-4/5 text-center">
              🤖 Nuestos asesores se encuentran ocupados , en unos minutos te
              contactare con uno 🤳.
            </p>
            <p className="mt-2">Posición en la cola : {position} 🚶</p>
          </div>
        )}
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
          disabled={position !== 0}
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
