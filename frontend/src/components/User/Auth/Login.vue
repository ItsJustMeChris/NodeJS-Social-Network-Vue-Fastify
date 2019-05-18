<template>
  <div>
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      const authResponse = await this.callAPI('auth/login', 'post', {
        username,
        password,
      });
      if (authResponse.token) {
        this.$store.commit('setSessionToken', authResponse.token);
      }
      this.$router.push('/');
    },
  },
};
</script>
