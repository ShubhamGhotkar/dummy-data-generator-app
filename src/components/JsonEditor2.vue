<template>
  <div ref="jsonEditorContainer" class="json-editor-container"></div>
</template>

<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

export default {
  mounted() {
    this.initJSONEditor();
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },

  methods: {
    initJSONEditor() {
      const container = this.$refs.jsonEditorContainer;

      // Replace 'yourData' with the JSON data you want to edit
      const jsonData = {
        first_name: "John",
        last_name: "Doe",
      };

      const options = {
        mode: "text",
      //   filter: false,
        // You can specify options here if needed
      };

      this.editor = new JSONEditor(container, options);
      this.editor.set(jsonData);
    },
  },
};
</script>

<style lang="scss">
/* Add any custom styling for the JSONEditor container if needed */
.json-editor-container {
  height: 400px;
  /* Add other styles as per your requirement */
}
</style>
