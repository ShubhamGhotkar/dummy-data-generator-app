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
        const suggestionItem = document.createElement("ul");
        suggestionItem.classList.add("selectOption");

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
          option.textContent = suggestion.data_type;
          suggestionItem.appendChild(option);
        });

        suggestionItem.addEventListener(
          "click",
          (event) => {
            this.insertSuggestion(event.target.innerText);
            this.hideSuggestion();

            this.emitUpdateData();
          },
          { once: true }
        );

        suggestionItem.style.position = "absolute";
        suggestionItem.style.top = currentPosition.row * 20 + "px";
        suggestionItem.style.left = currentPosition.column * 10 + "px";

        suggestionBox.appendChild(suggestionItem);

        this.$once("hook:beforeDestroy", () => {
          suggestionItem.remove();
        });
      } catch (error) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `Error showing suggestions:${error}`,
        });
      }
    },
    onEditorChange(e) {
      this.getEditorError();
      const errorsText = this.editorError.map((x) => x.text);

      if (errorsText[0] === "Bad string") {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `Use Repair Option`,
        });
      }
      this.countEdiorObject();
      // console.log("this.countEdiorObject()", this.countEdiorObject());
      // if (this.countEdiorObject()) {
      //   console.log("Hai Bhai");
      // }

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
      }
    },

    onEditorFocus() {
      this.getEditorError();
    },

    onEditorPaste(e) {
      this.getEditorError();

      const errors = this.editorError;

      this.countEdiorObject();

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
      const suggestion = document.getElementsByClassName("selectOption");
      if (suggestion) {
        Array.from(suggestion).forEach((item) => {
          item.remove();
        });
      }
      this.editor.aceEditor.setReadOnly(false);
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
          console.log("ERROR 301", this.countEdiorObject());
          if (this.countEdiorObject()) {
            throw new Error("Multiple objects found in editor");
          } else {
            return JSON.parse(data);
          }
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.SET_SHOW_MESSAGE({
            showMessage: true,
            showMessageText: "Invalid JSON data. Check the input value.",
          });
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
    // notValidJson(value) {
    //   this.$emit("notValidData", value);
    // },
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

.selectOption {
  max-height: 10rem !important;
  box-shadow: 0 0 0.5rem $primary-whitsmoke;
  z-index: 9999;
  border: 0.1rem solid $primary-whitsmoke;
  padding: 0.3rem 0.5rem;
  background: $primary-white;
  outline: none;
  font-size: 1rem;
  color: $primary-gray;
  overflow-y: scroll;

  cursor: pointer;
  z-index: 9999999 !important;
}

/* Example CSS for highlighting */
.highlighted-paste {
  background-color: yellow !important; /* Replace with your desired highlight color */
  opacity: 0.5; /* Adjust the opacity to your preference */
}
</style>
