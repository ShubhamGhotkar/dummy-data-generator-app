<template>
  <div class="popup-container">
    <div class="popup-container-content">
      <v-card elevation="2" color="#000"></v-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../sass/style.scss";
.popup-container {
  height: 100vh;
  width: 100vw;
  background: $background-blur;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: grid;
  place-items: center;
  &-content {
    height: 80vh;
    width: 80vw;
    background: $primary-white;

    padding: 0;
    border-radius: 0.3rem;
  }
}
</style>
