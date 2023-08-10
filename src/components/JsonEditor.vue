<template>
  <div ref="jsonEditorContainer" class="json-editor-container"></div>
</template>

<script>
import { fakerGenerateEntry } from "../data/fakerData";
import { mapMutations } from "vuex";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

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
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      jsonEditorData: {},
      jsonEditorOptions: {},
      showSuggestionOnEditor: false,
      editorError: [],
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

  updatedData() {
    console.log("updated");
    return this.getEditorData();
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
  updated() {
    this.getEditorError();
  },

  methods: {
    ...mapMutations(["SET_SHOW_MESSAGE"]),

    initJSONEditor() {
      try {
        const container = this.$refs.jsonEditorContainer;
        this.editor = new JSONEditor(container, this.jsonEditorOptions);

        this.editor.set(this.getObjectFromArray(this.jsonEditorData));

        const aceEditor = this.editor.aceEditor;

        if (aceEditor) {
          aceEditor.getSession().on("change", this.onEditorChange);
          aceEditor.on("paste", this.onEditorPaste);
          aceEditor.on("focus", this.onEditorFocus);
          aceEditor.on("copy", this.onEditorCopy);
          aceEditor.on("cut", this.onEditorCut);

          this.$once("hook:beforeDestroy", () => {
            aceEditor.getSession().off("change", this.onEditorChange);
            aceEditor.off("paste", this.onEditorPaste);
            aceEditor.off("focus", this.onEditorFocus);
            aceEditor.off("copy", this.onEditorCopy);
            aceEditor.off("cut", this.onEditorCut);
          });
        }
      } catch (error) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `Error initializing JSONEditor:${error}`,
        });
      }
    },

    showSuggestions() {
      try {
        const aceEditor = this.editor.aceEditor;
        if (!aceEditor) {
          this.SET_SHOW_MESSAGE({
            showMessage: true,
            showMessageText: `Ace editor not found.`,
          });
          return;
        }

        const currentPosition = aceEditor.getCursorPosition();
        const line = aceEditor.session.getLine(currentPosition.row);
        const currentWord = this.getCurrentWord(line, currentPosition.column);
        const container = document.createElement("div");
        const suggestionItem = document.createElement("ul");
        const showAllDataType = document.createElement("button");
        showAllDataType.innerText = "Show All";
        suggestionItem.classList.add("selectOption");
        showAllDataType.classList.add("show-all-datatype");
        container.classList.add("suggestion-box-container");

        container.appendChild(showAllDataType);

        let filteredSuggestions = fakerGenerateEntry.filter((suggestion) => {
          let fakerType = suggestion.data_type.toLocaleLowerCase();
          let checkWord = currentWord.replace(/"/g, "").toLocaleLowerCase();
          return fakerType.includes(checkWord);
        });

        if (filteredSuggestions.length === 0) {
          filteredSuggestions = fakerGenerateEntry;
        }
        const suggestionBox = this.$refs.jsonEditorContainer;

        if (!suggestionBox) {
          this.SET_SHOW_MESSAGE({
            showMessage: true,
            showMessageText: `Suggestion box element not found.`,
          });
          return;
        }

        filteredSuggestions.forEach((suggestion) => {
          const option = document.createElement("li");
          option.classList.add("list-item");
          option.textContent = suggestion.data_type;
          suggestionItem.appendChild(option);
        });

        container.appendChild(suggestionItem);

        suggestionItem.addEventListener(
          "click",
          (event) => {
            this.insertSuggestion(event.target.innerText);
            this.hideSuggestion();

            this.emitUpdateData();
          },
          { once: true }
        );

        showAllDataType.addEventListener("click", () => {
          console.log("click");
          filteredSuggestions = fakerGenerateEntry;
          suggestionItem.innerHTML = "";
          filteredSuggestions.forEach((suggestion) => {
            const option = document.createElement("li");
            option.classList.add("list-item");
            option.textContent = suggestion.data_type;
            suggestionItem.appendChild(option);
          });
        });
        container.style.position = "absolute";
        container.style.top = currentPosition.row * 25 + "px";
        container.style.left = currentPosition.column * 13 + "px";

        suggestionBox.appendChild(container);

        this.$once("hook:beforeDestroy", () => {
          container.remove();
        });
      } catch (error) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `Error showing suggestions:${error}`,
        });
      }
    },

    onEditorChange(e) {
      const aceEditor = this.editor.aceEditor;
      const currentPosition = aceEditor.getCursorPosition();
      const line = aceEditor.session.getLine(currentPosition.row);
      const isBackspacePressed = e.action === "remove";
      this.showSuggestionOnEditor =
        line.indexOf(":") === line.lastIndexOf(":") ? true : false;
      this.getEditorError();
      if (
        e.lines[0] === ":" &&
        this.showSuggestionOnEditor &&
        !isBackspacePressed
      ) {
        this.showSuggestions(...e.lines);
        aceEditor.setReadOnly(true);
      } else {
        this.hideSuggestion();
        this.$emit("setChangeData", this.getEditorData());
      }

      this.countEdiorObject();
      this.getEditorError();
    },

    onEditorFocus() {
      this.getEditorError();
    },

    onEditorPaste(e) {
      const errors = this.editorError;

      if (errors.length > 0 && errors[0].text !== "Bad string") {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `${errors[0].text} Error occurred while pasting data.\n ${e.text}`,
        });
      } else {
        this.updatingJsonData = true;
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "Data is pasted successfully.\n" + e.text,
        });
      }

      this.countEdiorObject();
      this.getEditorError();
    },

    onEditorCopy(e) {
      this.SET_SHOW_MESSAGE({
        showMessage: true,
        showMessageText: "Data copied successfully.\n" + e.text,
      });
    },

    onEditorCut() {
      this.updatingJsonData = false;
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
      const suggestion = document.getElementsByClassName(
        "suggestion-box-container"
      );
      if (suggestion) {
        Array.from(suggestion).forEach((item) => {
          item.remove();
        });
        this.editor.aceEditor.setReadOnly(false);
      }
    },

    checkEditorError() {
      const aceEditor = this.editor.aceEditor;
      const errors = aceEditor
        .getSession()
        .getAnnotations()
        .map((m) => m.type);

      if (errors[0] === "error") {
        return true;
      } else {
        return false;
      }
    },

    getEditorError() {
      const aceEditor = this.editor.aceEditor;
      const errors = aceEditor.getSession().getAnnotations();

      const errorMessages = errors.map((error) => {
        return {
          type: error.type,
          row: error.row,
          column: error.column,
          text: error.text,
        };
      });

      this.editorError = errorMessages;
    },

    getEditorData() {
      try {
        const aceEditor = this.editor.aceEditor;
        if (aceEditor) {
          const data = aceEditor.getValue();
          if (this.countEdiorObject()) {
            throw new Error("Multiple objects found in editor");
          } else {
            return JSON.parse(data);
          }
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          return;
          // this.SET_SHOW_MESSAGE({
          //   showMessage: true,
          //   showMessageText:
          //     "Invalid JSON data. Check the input value." + error,
          // });
        } else {
          this.SET_SHOW_MESSAGE({
            showMessage: true,
            showMessageText:
              "An error occurred while parsing JSON data: " + error.message,
          });
        }
      }
    },

    emitUpdateData() {
      console.log("COUNTER OBJECT", this.countEdiorObject());
      if (this.countEdiorObject()) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "Something wrong Editor",
        });
        return;
      }
      this.$emit("updateDataFromEditor", this.getEditorData());
    },

    countEdiorObject() {
      const aceEditor = this.editor.aceEditor;
      const data = aceEditor.getValue();
      const objectCount = data.split("{").length - 1;
      if (objectCount > 1) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "Multiple Object Not Valid ",
        });
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
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
  color: $primary-text-color;
  border-right: 0.05rem solid $secondary-border;
  border-left: 0.05rem solid $secondary-border;
}
.json-editor-container .jsoneditor-statusbar {
  background: $primary-white !important;
  color: $primary-text-color;
  border-top: 0.05rem solid $secondary-border;
  border-bottom: 0.05rem solid $secondary-border;
}
.json-editor-container .jsoneditor-poweredBy {
  display: none;
}

.suggestion-box-container {
  max-width: 25rem;
  max-height: 10rem;
  background: $primary-whitsmoke !important;
  padding: 0.5rem 0;
  box-shadow: 0 0 0.5rem $primary-whitsmoke;
  border: 0.1rem solid $primary-whitsmoke;

  display: flex;
  justify-content: center;
  flex-direction: column;
}
.selectOption {
  max-width: 15rem;
  max-height: 10rem !important;
  z-index: 9999;
  padding: 0.3rem 0.5rem;
  outline: none;
  font-size: 1rem;
  color: $primary-gray;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  cursor: pointer;
  z-index: 9999999 !important;

  &::-webkit-scrollbar {
    width: 0.1cm;
  }
}
.show-all-datatype {
  font-size: 0.8rem;
  border: 0.1rem solid $primary-whitsmoke;
  background: $primary-button-background;
  color: $primary-white;
  padding: 0.1rem 0.5rem;
  border-radius: 0.3rem;
  outline: none;
  cursor: pointer;
  align-self: flex-end;
  border-bottom: 0.1rem solid $primary-whitsmoke;
  &:hover {
    transform: scale(1.03);
  }
}
.list-item {
  width: 100%;
  font-size: 0.8rem;
  background: $primary-white;
  // border-bottom: 0.1rem solid $primary-whitsmoke;
  box-shadow: 0 0 0.5rem $primary-whitsmoke;
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
  margin: 0.4rem 0;
  text-align: center;

  overflow: hidden;

  text-overflow: ellipsis;
  text-transform: capitalize;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
