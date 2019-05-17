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
  beforeMount() {
    this.fetchSessions();
  },
  watch: {
    $route: "fetchSessions"
  },
  methods: {
    async removeSession(token) {
      await this.callAPI("auth/logout", "post", { token });
      this.sessions = this.sessions.filter(e => e.token !== token);
      if (this.sessions.length === 0) {
        this.$store.commit("setSessionToken", undefined);
        this.$router.push("/");
      }
    },
    async fetchSessions() {
      const sessions = await this.callAPI("auth/sessions", "post", {
        token: this.$store.getters.sessionToken
      });
      if (sessions) this.sessions = sessions;
    }
  }
};
</script>
