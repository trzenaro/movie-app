import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import Login from './components/Login.vue';
import Main from './components/Main.vue';
import Categories from './components/Categories.vue';
import Collection from './components/Collection.vue';
import Users from './components/Users.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login, name: 'login', meta: { isPublic: true } },
  {
    path: '/',
    component: Main,
    name: 'main',
    children: [
      { path: 'collection', component: Collection, name: 'collection' },
      { path: 'categories', component: Categories, name: 'categories' },
      { path: 'users', component: Users, name: 'users' },
    ]
  }
];

const router = new VueRouter({ mode: 'history', routes })
router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    next();
  } else if (!store.getters.isLoggedIn) {
    next(false);
    store.dispatch('logout');
  } else {
    next();
  }
})

export default router;