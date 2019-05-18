<template>
  <div>Logged Out</div>
</template>


<script>
export default {
  created() {
    this.logout();
  },
  watch: {
    $route: 'logout',
  },
  methods: {
    async logout() {
      const token = this.$store.getters.sessionToken;
      await this.callAPI('auth/logout', 'post', {
        token,
      });
      this.$store.commit('setSessionToken', undefined);
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
