import { createStore } from 'vuex';
import ClientApi from '@/services/ClientApi.js';

export default createStore({
  state: {
    idUser: "",
    transactions: [],
  },
  getters: {
    getTransactions: (state) => {
      return state.transactions;
    },
    getCurrentStatus: (state) => {
      const wallet = [];
      state.transactions.forEach((transaction) => {
        const index = wallet.findIndex((element) => element.crypto_code == transaction.crypto_code);
        if (index == -1) {
          if (transaction.action == "sale") {
            const negativeTransaction = { ...transaction };
            negativeTransaction.crypto_amount = -parseFloat(negativeTransaction.crypto_amount);
            negativeTransaction.money = -parseFloat(negativeTransaction.money);
            const { crypto_amount, crypto_code, money } = negativeTransaction;
            wallet.push({ crypto_amount, crypto_code, money });
          } else {
            const { crypto_amount, crypto_code, money } = transaction;
            wallet.push({ crypto_amount, crypto_code, money });
          }
        } else {
          if (transaction.action == "purchase") {
            wallet[index].crypto_amount += parseFloat(transaction.crypto_amount);
            wallet[index].money += parseFloat(transaction.money);
          } else {
            wallet[index].crypto_amount -= parseFloat(transaction.crypto_amount);
            wallet[index].money -= parseFloat(transaction.money);
          }
        }
      });
      return wallet;
    },
  },
  mutations: {
    newUser(state, idUser) {
      state.idUser = idUser;
    },
    insertTransaction(state){
      ClientApi.getTransactions(state.idUser)
      .then((response) => {
        state.transactions = response.data;
      }).catch(() => {
        alert("Error");
      });
    },
    deleteTransaction(state, transactionId) {
      state.transactions = state.transactions.filter(transaction => transaction._id !== transactionId);
    },
    updateTransaction(state, updatedTransaction) {
      const index = state.transactions.findIndex(transaction => transaction._id === updatedTransaction._id);
      if (index !== -1) {
        state.transactions.splice(index, 1, updatedTransaction);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
