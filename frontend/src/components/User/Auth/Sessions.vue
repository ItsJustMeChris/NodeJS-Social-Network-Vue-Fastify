<template>
  <div>
    <p>Sessions:</p>
    <div class="card-container">
      <div class="card" v-for="(session, index) in sessions" :key="index">
        <div
          class="card-head"
        >{{session.ip}} {{session.token === $store.getters.sessionToken ? ' | current' : ''}}</div>
        <div class="card-body">{{session.token}}</div>
        <div class="card-foot">
          <button
            v-if="session.token !== $store.getters.sessionToken"
            class="float-right"
            @click="removeSession(session.token)"
          >X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessions: [],
    };
  },
  beforeMount() {
    this.fetchSessions();
  },
  watch: {
    $route: 'fetchSessions',
  },
  methods: {
    async removeSession(token) {
      await this.callAPI('auth/logout', 'post', { token });
      this.sessions = this.sessions.filter(e => e.token !== token);
      if (this.sessions.length === 0) {
        this.$store.commit('setSessionToken', undefined);
        this.$router.push('/');
      }
    },
    async fetchSessions() {
      const sessions = await this.callAPI('auth/sessions', 'post', {
        token: this.$store.getters.sessionToken,
      });
      if (sessions) this.sessions = sessions;
    },
  },
};
</script>

<style scoped>
.card {
  width: 25rem;
  min-height: 5rem;
  background: #333;
  margin: 2rem;
}

.card-head {
  padding: 1rem;
  border-bottom: 2px solid #999;
}

.card-body {
  height: 2rem;
  padding: 2rem;
}

.card-foot {
  height: 2rem;
  background: #888;
  padding: 1rem;
}
</style>
