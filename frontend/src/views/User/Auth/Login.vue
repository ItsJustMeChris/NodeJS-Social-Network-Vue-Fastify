<template>
  <div>
    <div>
      <button @click="selection = 'login'">Login</button>
      <button @click="selection = 'register'">Register</button>
    </div>
    <div v-if="selection === 'login'">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" placeholder="Password" v-model="password">
      <button @click="login">Login</button>
    </div>
    <div v-if="selection === 'register'">
      <input type="text" v-model="username" placeholder="Username">
      <input type="text" v-model="email" placeholder="Email">
      <input type="password" placeholder="Password" v-model="password">
      <button @click="regiser">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: { requestedAction: String },
  data() {
    return {
      username: null,
      password: null,
      email: null,
      selection: this.requestedAction
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      const authResponse = await this.callAPI("auth/login", "post", {
        username,
        password
      });
      if (authResponse.token)
        this.$store.commit("setSessionToken", authResponse.token);
      this.$router.push("/");
    },
    async regiser() {
      const { username, password, email } = this;
      const authResponse = await this.callAPI("auth/register", "post", {
        username,
        password,
        email
      });
      if (authResponse.token)
        this.$store.commit("setSessionToken", authResponse.token);
      this.$router.push("/");
    }
  }
};
</script>
