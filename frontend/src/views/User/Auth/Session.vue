<template>
  <div>
    Sessions:
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
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchSessions()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchSessions'
  },
  methods: {
    async fetchSessions() {
      this.sessions = await (await fetch('http://localhost:3000/api/v1/auth/sessions',
      {
        method: 'post',
        body: JSON.stringify({ token: this.$store.getters.sessionToken }),
        headers: {
          'Content-Type': 'application/json'
        }
      })).json();
    },
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
