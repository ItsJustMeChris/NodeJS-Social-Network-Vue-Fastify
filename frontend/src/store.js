import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessionToken: null,
  },
  mutations: {
    setSessionToken(state, token) {
      state.sessionToken = token;
    },
  },
  actions: {
  },
});
