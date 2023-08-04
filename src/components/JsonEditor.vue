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
          schema: {
            name: "String",
            age: "Number",
          },
        };
      },
    },
    jsonData: {
      type: Object,
    },
  },
  data() {
    return {
      jsonEditorData: {},
      jsonEditorOptions: {},
      previousKey: "",
      showSuggestion: false,
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
        if (e.lines[0] === ":") {
          this.showSuggestion = !this.showSuggestion;
          console.log(this.showSuggestion);
          this.handleEditorChange(...e.lines);
          this.previousKey = e.lines[0];
        }
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
      const suggestionItem = document.createElement("ul");
      suggestionItem.classList.add("selectOption");

      let filteredSugestions = fakerGenerateEntry.filter((suggestion) => {
        let fakerType = suggestion.data_type.toLocaleLowerCase();
        let checkWord = currentWord.replace(/"/g, "").toLocaleLowerCase();
        return fakerType.includes(checkWord);
      });

      if (filteredSugestions.length === 0) {
        filteredSugestions = fakerGenerateEntry;
      }
      const suggestionBox = this.$refs.jsonEditorContainer;

      if (!suggestionBox) {
        return;
      }

      filteredSugestions.forEach((suggestion) => {
        const option = document.createElement("li");
        option.textContent = suggestion.data_type;
        suggestionItem.appendChild(option);
      });

      suggestionItem.addEventListener("click", (event) => {
        this.insertSuggestion(event.target.innerText);
        suggestionBox.removeChild(suggestionItem);
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
  max-height: 10rem !important;
  box-shadow: 0 0 0.5rem whitesmoke;
  z-index: 9999;
  border: 0.1rem solid whitesmoke;
  padding: 0.3rem 0.5rem;
  background: $primary-white;
  outline: none;
  font-size: 1rem;
  color: $primary-gray;
  overflow-y: scroll;

  cursor: pointer;
  z-index: 9999999 !important;
}
</style>
