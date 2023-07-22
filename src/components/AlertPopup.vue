<template>
  <v-alert border="bottom" color="#008000" type="success" class="v-alert-show"
    >Show API...!</v-alert
  >
</template>

<script>
export default {
  statusCode: {
    sucess: "sucess",
    error: "error",
    warning: "warning",
    info: "info",
  },
};
</script>

<style lang="scss">
.v-alert-show {
  width: max-content !important;
  height: max-content !important;
  color: hsl(120, 100%, 25%);
  padding: 0.5rem 1.2rem !important;
}
</style>
