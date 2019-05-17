<template>
  <div>
    Sessions:
    <div v-for="(session, index) in sessions" :key="index">
      {{ session }}
      <div v-if="session.token === $store.getters.sessionToken">Current</div>
      <button @click="removeSession(session.token)">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "session",
  data() {
    return {
      sessions: []
    };
  },
  created() {
    this.fetchSessions();
  },
  watch: {
    $route: "fetchSessions"
  },
  methods: {
    async removeSession(token) {
      try {
        const logoutResponse = await (await fetch(
          "http://localhost:3000/api/v1/auth/logout",
          {
            method: "post",
            body: JSON.stringify({ token }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )).json();
        this.sessions = this.sessions.filter(e => e.token !== token);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: logoutResponse.status,
          title: logoutResponse.message
        });
        if (this.sessions.length === 0) {
          this.$store.commit("setSessionToken", undefined);
          this.$router.push("/");
        }
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
    async fetchSessions() {
      try {
        this.sessions = await (await fetch(
          "http://localhost:3000/api/v1/auth/sessions",
          {
            method: "post",
            body: JSON.stringify({ token: this.$store.getters.sessionToken }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )).json();
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
