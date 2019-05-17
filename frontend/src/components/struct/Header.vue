<template>
  <header>
    <main>
      <router-link
        v-for="route in $router.options.routes"
        :to="route"
        :key="route.path"
        v-if="route.meta.authedShouldShow"
      >{{route.name}}</router-link>
    </main>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>
