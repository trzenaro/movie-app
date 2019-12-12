import Vue from 'vue'
import axios from 'axios';
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import App from './App.vue'

import config from './config';
axios.defaults.baseURL = config.API_URL;
axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  config.headers['refresh-token'] = `${localStorage.getItem('refresh-token')}`
  return config;
});

axios.interceptors.response.use((response) => {
  const token = response.headers.token;
  const refreshToken = response.headers['refresh-token'];
  if (token && refreshToken) {
    store.commit('updateTokens', { token, refreshToken })
  }
  return response;
}, (error) => {
  if (error.response.status === 401) {
    store.dispatch('logout');
  }
});

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')