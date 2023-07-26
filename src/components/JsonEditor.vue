<template>
  <JsonEditorVue
    v-model="jsonData"
    style="height: 100%; width: 100%"
    mode="text"
    :search="false"
  />
</template>

<script>
import JsonEditorVue from "json-editor-vue";

export default {
  components: {
    JsonEditorVue,
  },
  // props: {
  //   editorOutput: {
  //     type: Boolean,
  //     require: false,
  //     default: true,
  //   },
  // },
  data() {
    return {
      jsonData: { first_name: "String", last_name: "String" },
      editorOptions: {
        mode: "code",
      },
    };
  },
};
</script>

<style lang="scss">
@import "../sass/style.scss";
.jse-menu.svelte-497ud4.svelte-497ud4 {
  background: $editor-background !important;
}
</style>
