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
export default {};
</script>

<style>
</style>
