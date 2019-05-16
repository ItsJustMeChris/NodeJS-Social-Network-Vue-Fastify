import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    sessionToken: null,
  },
  mutations: {
    setSessionToken(state, token) {
      // eslint-disable-next-line no-param-reassign
      state.sessionToken = token;
    },
  },
  getters: {
    sessionToken: state => state.sessionToken,
  },
  actions: {
  },
});
