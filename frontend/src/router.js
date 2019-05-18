import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/User/Auth/Login.vue';
import Sessions from './views/User/Auth/Session.vue';
import LogOut from './components/User/Auth/Logout.vue';
import store from './store';

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
        requiresAuth: false,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: { requestedAction: 'login' },
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Login,
      props: { requestedAction: 'register' },
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOut,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.sessionToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if ((to.matched.some(record => record.name === 'login') || to.matched.some(record => record.name === 'register')) && store.getters.sessionToken) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
