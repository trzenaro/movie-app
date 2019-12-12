import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import qs from 'qs';
import router from '../router';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refresh-token')
  },

  getters: {
    isLoggedIn: (state) => state.token ? true : false
  },

  mutations: {
    updateTokens(state, payload) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("refresh-token", payload.refreshToken);
    },

    clearTokens(state) {
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
    }
  },

  actions: {
    async login({ commit }, payload) {
      const { email, password } = payload;
      try {
        const { data } = await axios.post('/auth/login', qs.stringify({ email, password }));
        commit('updateTokens', data);
        router.push("/collection");
      } catch (error) {
        console.error(error);
      }
    },

    async logout({ commit }) {
      commit('clearTokens');
      router.push("/login");
    }

  }
})