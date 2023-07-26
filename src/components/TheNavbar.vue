<template>
  <v-app-bar dense elevation="4" outlined class="v-bar-container"> </v-app-bar>
</template>

<script>
export default {
  methods: { handleRun() {} },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
.v-bar-container {
  width: 100% !important;
  height: 7vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: $cerulean-color !important;
  &-btn {
    padding: 0 2rem !important;
    margin-right: 2rem;
  }
}
</style>

<style lang="scss">
@import "../sass/style.scss";
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background: linear-gradient(
    to left,
    $navbar-background,
    $cerulean-color-light
  ) !important;
}
</style>
