import axios from 'axios';

const OrderServices = {
  save: async (req) => {
    const { data } = await axios({
      url: '/api/orders/save',
      method: 'POST',
      data: req
    });
    return data;
  },
  get: async () => {
    const { data } = await axios.get('/api/orders');
    return data;
  },
  change: async ({ id, estado }) => {
    const { data } = await axios({
      url: '/api/orders/change',
      method: 'POST',
      data: { id, estado }
    });
    return data;
  }
};

export default OrderServices;
