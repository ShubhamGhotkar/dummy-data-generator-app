<template>
  <div id="app" data-app>
    <div class="nav"><TheNavbar /></div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
export default {
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content {
  padding-top: 0.3rem;
}
</style>

<style lang="scss">
@import "./sass/style.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 10px;
  font-family: "Poppins", sans-serif;
}
</style>
