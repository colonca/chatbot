import React, { useEffect, useMemo, useState } from 'react';
import { object } from 'prop-types';
import BreadCrumbs from '../components/ BreadCrumbs';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import uuid from '../utils/uuid';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ModalDelete from '../components/ModalDelete';
import OrderServices from '../services/OrderServices';

function Orders() {
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    content: null
  });
  const [orders, setOrders] = useState([]);

  const columns = useMemo(
    () => [
      'Tipo',
      'Nombre',
      'Habitación',
      'Servicio',
      'Tipo de Pago',
      'Descripción',
      'Estado',
      'Acciones'
    ],
    []
  );

  async function changeStatus({ id, estado }) {
    const resp = await OrderServices.change({ id, estado });
    if (resp.status === 200) {
      setDeleteModal({ show: false, content: null });
      const data = await OrderServices.get();
      if (data.status === 200) setOrders(data.result);
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const resp = await OrderServices.get();
        if (resp.status === 200) setOrders(resp.result);
      } catch (e) {
        alert(e);
      }
    }
    fetch();
  }, [deleteModal]);

  return (
    <div>
      <BreadCrumbs
        items={[
          { title: 'home', url: '/dashboard' },
          { title: 'Ordenes', url: '/dashboard/orders' }
        ]}
      />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Ordenes</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: <div>hello</div>
                })
              }
            >
              Agregar
            </button>
          </div>
        </div>
        <Table columns={columns} title="Operadores">
          {orders.map((item) => (
            <tr key={uuid()}>
              <td>{item.tipo}</td>
              <td>{item.content.nombre}</td>
              <td>{item.content.habitacion || 'N/A'}</td>
              <td>{item.content.servicio}</td>
              <td>{item.content.metodo_de_pago || 'N/A'}</td>
              <td>
                <ul>
                  {Object.keys(item.content).map((key) => {
                    if (key === 'servicio' || key === 'nombre') return null;
                    return (
                      <li>
                        <span className="font-semibold">{`${key}: `}</span>
                        {item.content[key]}
                      </li>
                    );
                  })}
                </ul>
              </td>
              <td>{item.estado}</td>
              <td className="">
                <ButtonEdit
                  onClick={() =>
                    setDeleteModal({
                      show: true,
                      content:
                        '¿Esta segur@ que quiere confirmar esta orden? \n Este proceso será permanente 🔥',
                      // eslint-disable-next-line no-underscore-dangle
                      action: { id: item._id, estado: 'FINALIZADO' }
                    })
                  }
                />
                <ButtonDelete
                  onClick={() => {
                    setDeleteModal({
                      show: true,
                      content:
                        '¿Está segur@ que desea rechazar esta orden? Este proceso será\n            permanente 🔥',
                      // eslint-disable-next-line no-underscore-dangle
                      action: { id: item._id, estado: 'CANCELADO' }
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </Table>
      </div>
      {deleteModal.show && (
        <ModalDelete
          content={deleteModal.content}
          onDelete={() => {
            changeStatus(deleteModal.action);
          }}
          onClose={() => setDeleteModal({ show: false, content: null })}
        />
      )}
      {modal.show && (
        <Modal
          size={modal.size}
          onClose={() => {
            setModal({ show: false, content: null });
          }}
        >
          {modal.content}
        </Modal>
      )}
    </div>
  );
}

export default Orders;
