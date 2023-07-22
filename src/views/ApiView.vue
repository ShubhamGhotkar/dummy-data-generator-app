<template>
  <section class="api-section"></section>
</template>

<script>
export default {
  mounted() {
    this.$store.state.showNav = false;
  },
};
</script>

<style scoped lang="scss">
.api-section {
  width: 60%;
  margin: 0 auto;
  min-height: 40vh;
  max-height: auto;
  background: salmon;
}
</style>
