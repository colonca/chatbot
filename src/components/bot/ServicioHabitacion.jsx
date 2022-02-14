import React, { useState } from 'react';
import Message from '../Message';
import uuid from '../../utils/uuid';
import OrderServices from '../../services/OrderServices';

const opciones = {
  1: 'Salomon a la brasa $44.000',
  2: 'Baby Beef $42.000',
  3: 'Pollo al estilo Waya $34.000',
  4: 'Hamburguesa Tradicional - $27.000',
  5: 'Sándwich de Carne - $21.000',
  6: 'Wrap de Pollo - $25.000',
  7: 'Dulces Tipicos- $10.000',
  8: 'Cheesecake con salsa de agras - $10.000',
  9: 'Cerveza importada - $9.000',
  10: 'Cerveza nacional - $16.000',
  11: 'Gaseosa 400 ml - $8.000',
  12: 'Gaseosa 600 ml - $9.000',
  13: 'Hablar con un asesor',
  14: 'Volver'
};

const metodosPago = {
  1: 'Pago en Efectivo',
  2: 'Pago con Tarjeta',
  3: 'Cargo a la Habitación'
};

function ServicioHabitacion({ setOperacion }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  function handleSubmit() {
    if (message !== '') {
      if (message === '14' && messages.length === 0) setOperacion('bot');
      let response = '';
      if (messages.length === 0) {
        if (parseInt(message, 10) < 0 || parseInt(message, 10) > 14) {
          setError('Opción Invalida');
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }
        response = {
          own: false,
          content: ['Cual es el Numero de la Habitacón ?']
        };
      }
      if (messages.length === 2)
        response = { own: false, content: ['Cual es su nombre ?'] };
      if (messages.length === 4) {
        response = {
          own: false,
          content: [
            'Metodo de pago',
            '1. Pago en Efectivo',
            '2. Pago con Tarjeta',
            '3. Cargo a la Habitación'
          ]
        };
      }
      if (messages.length === 6) {
        if (parseInt(message, 10) < 0 || parseInt(message, 10) > 0) {
          setError('Opcion Invalida');
        }
        response = {
          own: false,
          content: [
            'Gracios por comunicarte con nosotros, pronto estará el servicio en camino.',
            '1. Volver'
          ]
        };
        OrderServices.save({
          tipo: 'Servicio a la Habitación',
          content: {
            servicio:
              opciones[messages[0].content[0]] || messages[0].content[0],
            nombre: messages[4].content[0],
            habitacion: messages[2].content[0],
            metodo_de_pago: metodosPago[message] || message
          }
        });
      }
      if (messages.length === 8) setOperacion('bot');
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
            'Lista de comidas y bebidas disponbles',
            '1. Salomon a la brasa $44.000',
            '2. Baby Beef $42.000',
            '3. Pollo al estilo Waya $34.000',
            '4. Hamburguesa Tradicional - $27.000',
            '5. Sándwich de Carne - $21.000',
            '6. Wrap de Pollo - $25.000',
            '7. Dulces Tipicos- $10.000',
            '8. Cheesecake con salsa de agras - $10.000',
            '9. Cerveza importada - $9.000',
            '10. Cerveza nacional - $16.000',
            '11. Gaseosa 400 ml - $8.000',
            '12. Gaseosa 600 ml - $9.000',
            '14. volver'
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

export default ServicioHabitacion;
