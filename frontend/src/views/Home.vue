<template>
  <div class="home">
    <p>Current Session: {{ $store.getters.sessionToken }}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>
