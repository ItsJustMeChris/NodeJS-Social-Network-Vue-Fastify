import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/User/Auth/Login.vue';
import Sessions from './views/User/Auth/Session.vue';
import LogOut from './components/User/Auth/Logout.vue';
import store from './store';

const { sessionToken } = store.getters;

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        authedShouldShow: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        authedShouldShow: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        authedShouldShow: sessionToken === null,
      },
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOut,
      meta: {
        authedShouldShow: sessionToken !== null,
      },
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions,
      meta: {
        authedShouldShow: sessionToken !== null,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.authedShouldShow)) {
    return null;
  }
  return next();
});

export default router;
