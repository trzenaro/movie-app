import Login from './components/Login.vue';
import Main from './components/Main.vue';
import Categories from './components/Categories.vue';
import Items from './components/Items.vue';
import Users from './components/Users.vue';

export const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Main,
    children: [
      { path: 'items', component: Items },
      { path: 'categories', component: Categories },
      { path: 'users', component: Users },
    ]
  }
];