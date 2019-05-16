<template>
  <div class="home">
    <p>You chose {{ $store.getters.sessionToken }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home"
};
</script>
