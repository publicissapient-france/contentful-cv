import VueRouter from 'vue-router';
import Cv from '@/components/page/Cv';
import Auth from '@/components/page/Auth';
import {authGuard} from '@/auth/authGuard';

const routes = [
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/cv/:id',
    component: Cv,
    beforeEnter: authGuard,
  },
  {
    path: '*',
    redirect: '/auth',
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
