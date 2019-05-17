<script>
import store from "../../../store";

export default {
  created() {
    this.logout();
  },
  watch: {
    $route: "logout"
  },
  methods: {
    async logout() {
      this.$store.commit("setSessionToken", undefined);
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
