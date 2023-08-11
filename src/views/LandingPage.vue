<template>
  <section class="homepage-container">
    <div class="input-container">
      <div
        class="input-container-item input-section"
        @mouseenter="handleshowInputFloat"
        @mouseleave="handleHideInputFloat"
      >
        <div class="input-container-item-tittle">
          <span class="field-person">Field Name</span>
          <span class="field-type">Type</span>
        </div>
        <div class="input-container-item-input-field field-container">
          <InputField
            :objectList="sendData"
            @updateSchemaArray="setUpdatedSchemaArray"
          />
        </div>
        <FloatBtn
          :showFloat="showInputFloat"
          @addAnotherFieldToInputArray="addAnotherFieldToInputArray"
          @mouseenter="handleshowInputFloat"
          @generateData="generateDataFromSchema"
        />
      </div>
      <div
        class="input-container-item editor-section"
        @mouseenter="handleshowEditorFloat"
        @mouseleave="handleHideEditorFloat"
      >
        <JsonEditor
          @updateDataFromEditor="setEditorDataToSchemaObject"
          @setChangeData="setChangeData"
          @pasteEvent="pasteEvent"
          :jsonData="sendData"
          ref="jsonEditor"
        />
        <FloatBtn
          :add_field="false"
          :showFloat="showEditorFloat"
          @mouseenter="handleshowEditorFloat"
          @generateData="generateDataFromJsonSchema"
        />
      </div>
      <VSnackbar />
    </div>
    <div class="output-container">
      <div class="output-container-btn">
        <v-btn elevation="1" class="output-btn" @click="showJson = true"
          >JSON</v-btn
        >
        <v-btn elevation="1" class="output-btn" @click="showJson = false"
          >API</v-btn
        >
      </div>
      <div
        class="output-container-editor"
        @mouseenter="handleShowCopyBtn"
        @mouseleave="handleHideCopyBtn"
      >
        <div
          class="output-container-editor-Json"
          @mouseenter="handleShowCopyBtn"
          v-if="showJson"
        >
          <JsonEditor
            :options="{
              mode: 'text',
              enableTransform: false,
              enableSort: false,
            }"
            :jsonData="outputJsonData"
            ref="jsonOutputData"
          />
          <v-btn
            elevation="1"
            class="output-btn text-copy"
            v-if="showCopyBtn"
            @mouseenter="handleShowCopyBtn"
            @click="copyDataToClickboard"
            >Copy</v-btn
          >
        </div>
        <div class="output-container-editor-Api" v-else>
          <ApiView />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import InputField from "@/components/InputField.vue";
import FloatBtn from "@/components/FloatBtn.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import { fakerGenerateEntry } from "../data/fakerData";
import VSnackbar from "@/components/VSnackbar.vue";
import { mapMutations } from "vuex";
import ApiView from "@/components/ApiView.vue";
export default {
  computed: {
    sendData() {
      return this.schemaObjectArray;
    },
  },
  data() {
    return {
      schemaObjectArray: [
        {
          id: uuidv4(),
          schemaKey: "_id",
          schemaType: "id",
        },
        {
          id: uuidv4(),
          schemaKey: "first_person",
          schemaType: "first_name",
        },
        {
          id: uuidv4(),
          schemaKey: "last_person",
          schemaType: "last_name",
        },

        {
          id: uuidv4(),
          schemaKey: "Full Name",
          schemaType: "full_name",
        },
        {
          id: uuidv4(),
          schemaKey: "Image",
          schemaType: "image_url",
        },
      ],
      fakerKeyArray: [],
      showJson: true,
      showCopyBtn: false,
      showInputFloat: false,
      showEditorFloat: false,
      outputJsonData: {},
      editorFieldData: [],
    };
  },
  components: {
    InputField,
    FloatBtn,
    VSnackbar,
    JsonEditor,
    ApiView,
  },

  mounted() {
    this.fakerKeyArray = fakerGenerateEntry;
    this.editorFieldData = this.schemaObjectArray;
  },
  methods: {
    ...mapMutations(["SET_SHOW_MESSAGE"]),
    addAnotherFieldToInputArray() {
      let schemaObject = {
        id: uuidv4(),
        schemaKey: `New_field`,
        schemaType: "text",
      };

      this.schemaObjectArray.push(schemaObject);
      this.SET_SHOW_MESSAGE({
        showMessage: true,
        showMessageText: "Another Field Added successfully.",
      });
    },

    handleshowInputFloat() {
      this.showInputFloat = true;
    },
    handleHideInputFloat() {
      this.showInputFloat = false;
    },
    setUpdatedSchemaArray(data) {
      this.schemaObjectArray = data;
    },
    handleshowEditorFloat() {
      this.showEditorFloat = true;
    },
    handleHideEditorFloat() {
      this.showEditorFloat = false;
    },
    handleShowCopyBtn() {
      this.showCopyBtn = true;
    },
    handleHideCopyBtn() {
      this.showCopyBtn = false;
    },
    generateDataFromSchema() {
      let outputObject = {};
      let errorArray = [];

      if (this.schemaObjectArray.length === 0) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `No Data To Generate`,
        });

        return;
      }

      for (let schema of this.schemaObjectArray) {
        let acessKey = this.fakerKeyArray.find(
          (fakerKey) => fakerKey.data_type === schema.schemaType
        );
        if (acessKey && acessKey.getData) {
          outputObject[schema.schemaKey] = acessKey.getData();
        } else {
          errorArray.push(schema.schemaKey);

          outputObject[schema.schemaKey] = "";
        }
      }

      if (errorArray.length > 0) {
        let message = errorArray.map((msg) => msg + "\n");
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: `${message} \n is not a Valid DataType,\n it's Update to Empty String \n and Generate Data`,
        });
      } else {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "Data Generated successfully.",
        });
      }
      setTimeout(() => {
        this.outputJsonData = outputObject;
      }, 0);
    },
    generateDataFromJsonSchema() {
      let updatedData = this.$refs.jsonEditor.getEditorData();
      if (!Array.isArray(updatedData)) {
        this.setEditorDataToSchemaObject(updatedData);
        this.generateDataFromSchema();
      }
    },

    setEditorDataToSchemaObject(editorData) {
      let updatedObject = [];
      for (let [key, value] of Object.entries(editorData)) {
        let object = {
          id: uuidv4(),
          schemaKey: key,
          schemaType: value,
        };
        updatedObject.push(object);
      }

      this.schemaObjectArray.splice(
        0,
        this.schemaObjectArray.length,
        ...updatedObject
      );
    },
    extractSchemaKeys(schemaObjectArray) {
      const extractedObject = schemaObjectArray.reduce((result, item) => {
        result[item.schemaKey] = item.schemaType;
        return result;
      }, {});

      console.log(extractedObject);
      return extractedObject;
    },

    copyDataToClickboard() {
      if (Object.keys(this.outputJsonData).length === 0) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "No Data To Copy.",
        });
        return;
      }
      const jsonData = this.outputJsonData;
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = JSON.stringify(jsonData, null, 2);
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand("copy");
      try {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "Data copied to clipboard.",
        });
      } catch (error) {
        this.SET_SHOW_MESSAGE({
          showMessage: true,
          showMessageText: "Copy failed. Please try again.",
        });
      } finally {
        document.body.removeChild(tempTextarea);
      }
    },
    setChangeData() {},
    pasteEvent(data) {
      if (data) {
        // this.setEditorDataToSchemaObject(data);
        let updatedArray = this.converObjectToArray(data);

        if (updatedArray && this.schemaObjectArray) {
          this.schemaObjectArray.push(...updatedArray);
          // this.schemaObjectArray.splice(0, this.schemaObjectArray.length, [
          //   ...this.schemaObjectArray.length,
          //   ...updatedArray,
          // ]);
          //   this.schemaObjectArray = [
          //     ...this.this.schemaObjectArray,
          //     ...updatedArray,
          //   ];
          console.log("updatedArray", updatedArray);
        }
        // this.schemaObjectArray = updatedArray;
        // "Imagcde": "image_dcdurl"
      }
    },
    converObjectToArray(editorData) {
      if (editorData) {
        let updatedObject = [];
        for (let [key, value] of Object.entries(editorData)) {
          let object = {
            id: uuidv4(),
            schemaKey: key,
            schemaType: value,
          };
          updatedObject.push(object);
        }

        return updatedObject;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";

.homepage-container {
  width: 98%;
  height: 93vh;
  padding: 1rem 1.6rem 0 1.6rem;
  margin: 0 auto;
  background: $landing-page-background-color;
}
.input-container {
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 3rem;

  &-item {
    flex: 0 0 45%;
    height: 100%;
    position: relative;
    justify-self: flex-start;
    padding: 1rem 0 0 0;
    background: $primary-white;

    box-shadow: 0 7px 30px -10px $primary-box-shadow;
    &-tittle {
      width: 100%;
      margin: 0 auto;

      & span {
        font-size: 1.2rem;
        font-weight: 400;
        letter-spacing: 0.03rem;
        color: $primary-gray;
      }
    }
    &-input-field {
      width: 100%;

      height: 90%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      scroll-snap-align: end;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }

  & > span {
    font-size: 1rem;
    font-weight: 500;
  }
}

.field-person {
  padding-left: 1.5rem;
}
.field-type {
  padding-left: 6rem;
}
.editor-section {
  flex: 0 0 52%;
  padding: 0 !important;
  box-shadow: 0 7px 30px -10px $primary-box-shadow !important;
  overflow: hidden;
}

.input-section {
  flex: 0 0 40%;
  padding: 1rem 3.2rem;
  overflow: hidden;
}
// ROW INPUT
.row-input {
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
  margin: 0.5rem 0;

  padding: 0.7rem 0 0.3rem 10rem;
  &-add-field {
    width: max-content;
    cursor: pointer;

    & span {
      text-transform: uppercase;
      letter-spacing: 0.03rem;
      font-size: 1rem;
      font-weight: 500;
      border: 1px solid $primary-border !important;
      background: $primary-white;
      color: $primary-gray;
      text-align: center;
      padding: 0.3rem 0.6rem;
      border-radius: 0.2rem;
      &:hover {
        background: $primary-whitsmoke;
      }
    }
  }
}
.output-container {
  width: 100%;
  height: 42%;

  position: relative;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  box-shadow: 0 7px 30px -10px $primary-box-shadow;
  margin-top: 1.5rem;
  &-btn {
    flex: 0 0 4%;
    height: 100%;
  }
  &-editor {
    flex: 0 0 93%;
    height: 100%;
    border-left: 0.1rem solid $primary-border;

    &-Json {
      width: 100%;
      height: 100%;
    }
    &-Api {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 0, 0.267);
    }
  }
}

.text-copy {
  position: absolute;
  top: 0;
  right: -0.2rem;
  z-index: 999;
}
</style>

<style lang="scss">
@import "../sass/style.scss";
.row-input-item
  > .v-text-field.v-text-field--solo.v-input--dense
  > .v-input__control {
  min-height: 3.5rem !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 10px !important;
  min-width: 100px !important;
  border-radius: 0;
  padding: 1rem !important;
  margin-bottom: 0.05rem;
}

.row-input-item
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
  border: 1px solid $primary-border !important;
}
</style>
