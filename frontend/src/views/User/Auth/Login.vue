<template>
  <div>
    <div>
      <button @click="selection = 'login'">Login</button>
      <button @click="selection = 'register'">Register</button>
    </div>
    <div v-if="selection === 'login'">
      <Login/>
    </div>
    <div v-if="selection === 'register'">
      <Register/>
    </div>
  </div>
</template>

<script>
import Login from '../../../components/User/Auth/Login';
import Register from '../../../components/User/Auth/Register';

export default {
  name: 'login',
  props: { requestedAction: String },
  components: {
    Login,
    Register,
  },
  data() {
    return {
      selection: this.requestedAction,
    };
  },
  methods: {},
};
</script>
