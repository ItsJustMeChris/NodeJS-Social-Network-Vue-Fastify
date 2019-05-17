<template>
  <header>
    <main>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/about">About</router-link>
      <router-link class="link" to="/login" v-if="!$store.getters.sessionToken">Login</router-link>
      <router-link class="link" to="/sessions" v-if="$store.getters.sessionToken">Sessions</router-link>
      <router-link class="link" to="/logout" v-if="$store.getters.sessionToken">Logout</router-link>
    </main>
  </header>
</template>

<script>
export default {};
</script>

<style>
.link {
  margin-right: 1rem;
}
</style>
