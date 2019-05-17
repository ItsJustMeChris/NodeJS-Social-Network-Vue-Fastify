<template>
  <div class="home">
    <p>Current Session: {{ $store.getters.sessionToken }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home"
};
</script>
