import React, { useState } from 'react';
import Message from '../Message';
import uuid from '../../utils/uuid';
import OrderServices from '../../services/OrderServices';

const opciones = {
  1: 'Tour pasadía Cabo de la vela',
  2: 'Tours pasadía playa de mayapo',
  3: 'Tours pasadía Camarones',
  4: 'Tours pasadía palomino',
  5: 'Tours Ruta vallenata',
  6: 'Tour cabo de la vela: Noche de alojamiento',
  7: 'Tour punta gallina: noche de alojamiento',
  8: 'Volver'
};

const metodosPago = {
  1: 'Pago en Efectivo',
  2: 'Pago con Tarjeta',
  3: 'Cargo a la Habitación'
};

function Transporte({ setOperacion }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  function handleSubmit() {
    if (message !== '') {
      let response = '';
      if (message === '8' && messages.length === 0) setOperacion('bot');
      if (
        messages.length === 0 &&
        (parseInt(message, 10) < 0 || parseInt(message, 10) > 8)
      ) {
        setError('Opción Invalida.');
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }

      if (messages.length === 0 && message === '1') {
        response = {
          own: false,
          content: [
            'Descripcion: Salida 06:30 Am despues de tomar el desayuno del hotel\n' +
              'Transporte en 4x4 full aire, visita a uribia, capital indigena y manaure, visita a las salinas.\n' +
              'incluye almuerzo (No a la carta)\n',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 0 && message === '2') {
        response = {
          own: false,
          content: [
            'Descripción: Salida 08:30 Am después de tomar el desayuno del hotel\n' +
              'Transporte en vehículo automóvil,\n' +
              'incluye almuerzo\n',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 0 && message === '3') {
        response = {
          own: false,
          content: [
            'Descripción: Salida 08:30 Am después de tomar el desayuno del hotel\n' +
              'Transporte en vehículo automóvil,\n' +
              'incluye almuerzo\n',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 0 && message === '4') {
        response = {
          own: false,
          content: [
            'Descripción: Salida 08:30 Am después de tomar el desayuno del hotel\n' +
              'Transporte en vehículo automóvil,\n' +
              'incluye almuerzo\n',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 0 && message === '5') {
        response = {
          own: false,
          content: [
            'Descripción: Salida 07:00 Am después de tomar el desayuno del hotel\n' +
              'Transporte en vehículo automóvil, recorrido por los municipios de la provincia de padilla (Hatonuevo,Barrancas, Distraccion, -fonseca) Visita a la ventana marroncita, entrada y salida al museo del cacique de la junta Diomedes Diaz\n' +
              'incluye almuerzo',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 0 && message === '6') {
        response = {
          own: false,
          content: [
            'Descripcion: Salida 08:30 Am despues de tomar el desayuno del hotel\n' +
              'Transporte en 4x4 full aire, visita a uribia, capital indigena y manaure, visita a las salinas. visita al cabo de la vela del pilon de azucar, el faro, ojo del agua\n' +
              'incluye 2 almuerzo - 1 Cena -1 desayuno',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 0 && message === '7') {
        response = {
          own: false,
          content: [
            'Descripcion: Salida 08:30 Am despues de tomar el desayuno del hotel\n' +
              'Transporte en 4x4 full aire, visita a uribia, capital indigena y manaure, visita a las salinas. visita al cabo de la vela del pilon de azucar, el faro, ojo del agua, recorrido en lancha a puerto bolivar - bahia hondita - punta soldado - punta aguja - visita a las dunas de taroa - faro de punta gallinas\n' +
              'incluye 3 almuerzo - 2 Cena -2 desayuno',
            '1.Reservar',
            '2.Volver'
          ]
        };
      }

      if (messages.length === 2) {
        response = {
          own: false,
          content: ['¿Cual es su nombre?']
        };
      }

      if (messages.length === 4) {
        response = {
          own: false,
          content: ['¿Cual es su habitación?']
        };
      }

      if (messages.length === 6) {
        response = {
          own: false,
          content: [
            '¿Forma de pago?',
            '1. Pago en Efectivo',
            '2. Pago con tarjeta',
            '3. Cargo a la habitación'
          ]
        };
      }

      if (messages.length === 8) {
        OrderServices.save({
          tipo: 'Transporte',
          content: {
            servicio:
              opciones[messages[0].content[0]] || messages[0].content[0],
            nombre: messages[4].content[0],
            habitacion: messages[6].content[0],
            metodo_de_pago: metodosPago[message] || message
          }
        });
        response = {
          own: false,
          content: ['Su reserva esta confirmada, feliz dia']
        };
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
            'Lista de Tours Waya',
            '1. Tour pasadía Cabo de la vela',
            '2. Tours pasadía playa de mayapo',
            '3. Tours pasadía Camarones',
            '4. Tours pasadía palomino',
            '5. Tours Ruta vallenata',
            '6. Tour cabo de la vela: Noche de alojamiento',
            '7. Tour punta gallina: noche de alojamiento',
            '8. Volver'
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

export default Transporte;
