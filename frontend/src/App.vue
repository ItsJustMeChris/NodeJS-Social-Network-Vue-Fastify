<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/struct/Header.vue';

export default {
  data() {
    return {
      sessionChecker: null,
    };
  },
  created() {
    this.checkSession();
    this.sessionChecker = setInterval(this.checkSession, 60000);
  },
  beforeDestroy() {
    clearInterval(this.sessionChecker);
  },
  components: {
    Header,
  },
  methods: {
    async checkSession() {
      const token = this.$store.getters.sessionToken;
      if (token) {
        const { auth } = await this.callAPI('auth/verify', 'post', { token });
        if (!auth) {
          this.$store.commit('setSessionToken', undefined);
          this.$router.push('/');
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
