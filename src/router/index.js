import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Transactions from '../views/Transactions.vue';
import History from '../views/History.vue';
import Modify from  '../views/Modify.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/modify',
    name: 'Modify',
    component: Modify,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
