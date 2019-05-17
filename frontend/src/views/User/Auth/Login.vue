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
      try {
        this.authResponse = await (await fetch(
          "http://localhost:3000/api/v1/auth/login",
          {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )).json();
        this.$store.commit("setSessionToken", this.authResponse.token);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: this.authResponse.status,
          title: this.authResponse.message
        });
        this.$router.push("/");
      } catch (error) {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          title: "API Error"
        });
      }
    },
    async regiser() {
      const { username, password, email } = this;
      try {
        this.authResponse = await (await fetch(
          "http://localhost:3000/api/v1/auth/register",
          {
            method: "post",
            body: JSON.stringify({ username, password, email }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )).json();
        this.$store.commit("setSessionToken", this.authResponse.token);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: this.authResponse.status,
          title: this.authResponse.message
        });
        this.$router.push("/");
      } catch (error) {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          title: "API Error"
        });
      }
    }
  }
};
</script>
