<template>
  <div>
    <input type="text" v-model="username" placeholder="Username">
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="regiser">Register</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      email: null
    };
  },
  methods: {
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
