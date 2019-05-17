<template></template>


<script>
export default {
  created() {
    this.logout();
  },
  watch: {
    $route: "logout"
  },
  methods: {
    async logout() {
      const token = this.$store.getters.sessionToken;

      this.$router.replace(
        "/",
        async () => {
          this.$store.commit("setSessionToken", undefined);
          try {
            console.log(token);
            const logoutResponse = await (await fetch(
              "http://localhost:3000/api/v1/auth/logout",
              {
                method: "post",
                body: JSON.stringify({
                  token
                }),
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
              type: logoutResponse.status,
              title: logoutResponse.message
            });
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
        () => {}
      );
    }
  }
};
</script>

<style>
</style>
