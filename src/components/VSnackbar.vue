<template>
  <div class="text-center ma-2 snack-bar">
    <v-snackbar v-model="showSnackbar" absolute right top :timeout="2500">
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    showSnackbar: {
      get() {
        return this.$store.state.showMessage;
      },
      set(value) {
        this.$store.commit("SET_SHOW_MESSAGE", { show: value, message: "" });
      },
    },
    snackbarMessage() {
      return this.$store.state.showMessageText;
    },
  },
  watch: {},
  methods: {
    closeSnackbar() {
      this.$store.commit("SET_SHOW_MESSAGE", { show: false, message: "" });
    },
  },
};
</script>

<style lang="scss" scoped>
.snack-bar {
  width: fit-content;
  height: fit-content;
  position: fixed;
  right: 1%;
  top: 7%;
}
</style>
