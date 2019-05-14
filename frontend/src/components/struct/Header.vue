<template>
  <header>
    <main>
      <router-link
        v-for="route in $router.options.routes"
        :to="route"
        :key="route.path"
      >{{route.name}}</router-link>
    </main>
  </header>
</template>

<script>
export default {
  data() {
    return {
      authResponse: null
    };
  },
  methods: {
    async testAuth() {
      this.authResponse = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "post",
          body: JSON.stringify({ username: "test", password: "test" }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(r => r.json());
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

<style>
.fade {
  transition: 5s;
}
</style>
