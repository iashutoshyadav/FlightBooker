import api from './api';

export const userService = {
  getWalletBalance: async () => {
    const response = await api.get('/user/wallet/balance');
    return response.data;
  },

  getTransactions: async () => {
    const response = await api.get('/user/wallet/transactions');
    return response.data;
  },

  addMoney: async (amount) => {
    const response = await api.post('/user/wallet/add', { amount });
    return response.data;
  },
};

export default userService;