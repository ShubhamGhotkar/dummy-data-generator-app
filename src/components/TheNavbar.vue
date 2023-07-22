<template>
  <v-app-bar dense elevation="4" outlined class="v-bar-container">
    <v-row>
      <v-col>
        <v-btn
          color="primary"
          dark
          elevation="2"
          class="v-bar-container-btn"
          @click="handleRun"
        >
          generate data >></v-btn
        >
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss" scoped>
.v-bar-container {
  width: 100% !important;
  height: 7vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &-btn {
    padding: 0 2rem !important;
    margin-right: 2rem;
  }
}
</style>
