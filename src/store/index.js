import { createStore } from 'vuex';
import ClientApi from '@/services/ClientApi.js';

export default createStore({
  state: {
    idUser: "",
    transactions: [],
  },
  getters: {
  },
  mutations: {
    newUser(state, idUser) {
      state.idUser = idUser;
    },
    insertTransaction(state){
      ClientApi.getHistory(state.idUser)
      .then((response) => {
        state.transactions = response.data;
      }).catch(() => {
        alert("Error");
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
