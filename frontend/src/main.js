import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    async callAPI(endpoint, method, params) {
      try {
        const response = await (await fetch(
          `http://localhost:3000/api/v1/${endpoint}`,
          {
            method,
            body: JSON.stringify(params),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )).json();
        if (response.status && response.message) {
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            type: response.status,
            title: response.message,
          });
        }
        return response;
      } catch (error) {
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          type: 'error',
          title: 'API Error',
        });
        return null;
      }
    },
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
