import axios from 'axios';

const TicketServices = {
  getTicketClient: async (id) => {
    const { data } = await axios.get(`/api/ticket/client/${id}`);
    return data;
  },
  getTicketAsesor: async (id) => {
    const { data } = await axios.get(`/api/ticket/asesor/${id}`);
    return data;
  }
};

export default TicketServices;
