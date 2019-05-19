<template>
  <div>{{profileData.name}}</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      profileData: null,
    };
  },
  beforeMount() {
    this.fetchProfile();
  },
  watch: {
    $route: 'fetchProfile',
  },
  methods: {
    async fetchProfile() {
      const data = await this.callAPI(
        `user/${this.$route.params.id}/info`,
        'post',
        {
          token: this.$store.getters.sessionToken,
        }
      );
      console.log(data);
      if (data) {
        this.profileData = data;
      }
    },
  },
};
</script>
