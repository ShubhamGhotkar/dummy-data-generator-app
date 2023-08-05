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
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      jsonEditorData: {},
      jsonEditorOptions: {},
      previousKey: "",
      showSuggestionOnEditor: false,
      updatedData: {},
    };
  },

  watch: {
    jsonData: {
      handler(newData) {
        this.jsonEditorData = newData;
        this.editor.set(this.getObjectFromArray(this.jsonEditorData));
      },
      deep: true,
    },
  },

  created() {
    this.jsonEditorData = this.jsonData;
    this.jsonEditorOptions = this.options;
  },
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
      this.editor = new JSONEditor(container, this.jsonEditorOptions);

      this.editor.set(this.getObjectFromArray(this.jsonEditorData));

      const aceEditor = this.editor.aceEditor;

      if (aceEditor) {
        aceEditor.getSession().on("change", (e) => {
          const currentPosition = aceEditor.getCursorPosition();
          const line = aceEditor.session.getLine(currentPosition.row);

          const isBackspacePressed = e.action === "remove";

          this.showSuggestionOnEditor =
            line.indexOf(":") === line.lastIndexOf(":") ? true : false;

          if (
            e.lines[0] === ":" &&
            this.showSuggestionOnEditor &&
            !isBackspacePressed
          ) {
            this.showSuggestions(...e.lines);
          } else {
            this.hideSuggestion();
          }
        });
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

      suggestionItem.addEventListener(
        "click",
        (event) => {
          this.insertSuggestion(event.target.innerText);
          console.log("this.checkEditorError()", this.checkEditorError());
          this.hideSuggestion();
          if (!this.checkEditorError()) {
            this.$emit("updateDataFromEditor", this.getEditorData());
          }
        },
        { once: true }
      );

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

    getObjectFromArray(jsonArray) {
      if (Array.isArray(jsonArray)) {
        let jsonData = jsonArray.reduce((obj, item) => {
          obj[item.schemaKey] = item.schemaType;
          return obj;
        }, {});

        return jsonData;
      }
      return jsonArray;
    },

    hideSuggestion() {
      const suggestion = document.getElementsByClassName("selectOption");
      if (suggestion) {
        Array.from(suggestion).forEach((item) => {
          item.remove();
        });
      }
    },
    checkEditorError() {
      try {
        const jsonString = this.editor.getText();
        JSON.parse(jsonString);
        return false;
      } catch (error) {
        // console.log("JSON parsing error:", error.message);
        return true;
      }
    },
    async getEditorError() {
      const error = await this.editor.validate();
      if (error) {
        let errorMessage = error[0].message;
        return errorMessage;
      }

      return false;
    },
    getEditorData() {
      const aceEditor = this.editor.aceEditor;
      if (aceEditor) {
        const data = aceEditor.getValue();
        return JSON.parse(data);
      }
      return null;
    },

    isShowSugestion(error) {
      switch (error) {
        case `this.getEditorError() Parse error on line 7:<br>...age_url",  "name":}<br>---------------------^<br>Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got '}'`:
          return true;

        default:
          return false;
      }
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
