<template>
  <div ref="jsonEditorContainer" class="json-editor-container"></div>
</template>

<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import { fakerGenerateEntry } from "../data/fakerData";

export default {
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          mode: "code",
          enableSort: false,
          enableTransform: false,
        };
      },
    },
    jsonData: {
      type: Object,
      default: () => {
        return {
          _id: "id",
          first_person: "string",
          last_person: "string",
          full_name: "String",
          Image: "url",
        };
      },
    },
  },
  data() {
    return {
      jsonEditorData: {},
      jsonEditorOptions: {},
    };
  },
  watch: {
    jsonData(newData) {
      this.jsonEditorData = newData;
      this.editor.set(this.jsonEditorData);
    },
  },
  created() {
    this.jsonEditorData = this.jsonData;
    this.jsonEditorOptions = this.options;
  },
  mounted() {
    this.initJSONEditor();
    this.jsonEditorData = this.jsonData;
    this.jsonEditorOptions = this.options;
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },

  methods: {
    initJSONEditor() {
      const container = this.$refs.jsonEditorContainer;
      this.editor = new JSONEditor(container, this.jsonEditorOptions);

      this.editor.set(this.jsonEditorData);

      // Add event listener to the aceEditor to capture keystrokes
      const aceEditor = this.editor.aceEditor;
      aceEditor.getSession().on("change", (e) => {
        this.handleEditorChange(...e.lines);
      });
    },
    handleEditorChange(key) {
      if (key === ":") {
        this.showSuggestions(key);
      }
    },

    showSuggestions() {
      const aceEditor = this.editor.aceEditor;
      const currentPosition = aceEditor.getCursorPosition();
      const line = aceEditor.session.getLine(currentPosition.row);
      const currentWord = this.getCurrentWord(line, currentPosition.column);

      let filteredSugestions = fakerGenerateEntry.filter((suggestion) => {
        let fakerType = suggestion.data_type.toLocaleLowerCase();
        let checkWord = currentWord.replace(/"/g, "").toLocaleLowerCase();
        return fakerType.includes(checkWord);
      });

      const suggestionBox = this.$refs.jsonEditorContainer;

      if (!suggestionBox) {
        return;
      }

      const suggestionItem = document.createElement("select");
      suggestionItem.classList.add("selectOption");

      filteredSugestions.forEach((suggestion) => {
        const option = document.createElement("option");
        option.textContent = suggestion.data_type;
        suggestionItem.appendChild(option);
      });

      suggestionItem.addEventListener("change", (event) => {
        this.insertSuggestion(event.target.value);
        suggestionItem.remove();
      });

      suggestionItem.style.position = "absolute";
      suggestionItem.style.top = currentPosition.row * 20 + "px";
      suggestionItem.style.left = currentPosition.column * 10 + "px";
      suggestionBox.appendChild(suggestionItem);
    },
    getCurrentWord(line, column) {
      const lineBeforeCursor = line.slice(0, column);
      const words = lineBeforeCursor.split(/\s+/);
      return words[words.length - 1];
    },
    insertSuggestion(suggestion) {
      const aceEditor = this.editor.aceEditor;
      const currentPosition = aceEditor.getCursorPosition();
      aceEditor.session.insert(currentPosition, `"${suggestion}"`);
    },
  },
};
</script>

<style lang="scss" scoped>
.json-editor-container {
  height: 100% !important;
  width: 100% !important;
  outline: none;
  position: relative;
}
</style>
<style lang="scss">
@import "../sass/style.scss";
.json-editor-container div.jsoneditor-outer.has-main-menu-bar {
  margin-top: -35px;
  padding-top: 35px;
  background: $editor-background;
}
.json-editor-container .jsoneditor {
  outline: none !important;
  border: none;
}

.json-editor-container .ace-jsoneditor .ace_gutter {
  background: $primary-white !important;
  color: #333;
  border-right: 0.05rem solid #dadada;
  border-left: 0.05rem solid #dadada;
}
.json-editor-container .jsoneditor-statusbar {
  background: $primary-white !important;
  color: #333;
  border-top: 0.05rem solid #dadada;
  border-bottom: 0.05rem solid #dadada;
}
.json-editor-container .jsoneditor-poweredBy {
  display: none;
}

.selectOption {
  // position: absolute;
  // top: 20%;
  // right: 20%;
  background: purple;
}
</style>
