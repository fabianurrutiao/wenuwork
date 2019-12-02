import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import FavoritosPage from '@/pages/Favoritos/Favoritos';
import GraficosPage from '@/pages/Graficos/Graficos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        {
          path: 'favoritos',
          name: 'FavoritosPage',
          component: FavoritosPage,
        },
        {
          path: 'graficos',
          name: 'GraficosPage',
          component: GraficosPage,
        },
      ],
    },
  ],
});
