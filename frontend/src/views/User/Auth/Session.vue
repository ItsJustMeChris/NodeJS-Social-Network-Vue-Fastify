<template>
  <div>
    <ul>
      <li v-for="(session, index) in sessions" :key="index">{{ session }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "session",
  data() {
    return {
      sessions: null
    };
  },
  beforeCreated() {
      this.sessions = await (await fetch('http://localhost:3000/api/v1/auth/sessions',
      {
        method: 'post',
        body: JSON.stringify({session}),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json();
  },
  methods: {
    async login() {
      const { username, password } = this;
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
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: this.authResponse.status,
        title: this.authResponse.message
      });
    }
  }
};
</script>
