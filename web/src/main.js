import Vue from 'vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import App from './App.vue'
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({ mode: 'history', routes })
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
