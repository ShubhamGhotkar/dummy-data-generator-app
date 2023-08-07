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
    </div>
    <div class="output-container">
      <div class="output-container-btn">
        <v-btn elevation="1" class="output-btn" @click="showJson = true"
          >JSON</v-btn
        >
        <v-btn elevation="1" class="output-btn" @click="showJson = false"
          >API</v-btn
        >
        <v-btn
          elevation="1"
          class="output-btn text-copy"
          v-if="showCopyBtn"
          @mouseenter="handleShowCopyBtn"
          >Copy</v-btn
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
          />
        </div>
        <div class="output-container-editor-Api" v-else></div>
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
      outputJsonData: { key: "output will show here" },
      addFieldCount: 1,
      editorFieldData: [],
    };
  },
  components: {
    InputField,
    FloatBtn,

    JsonEditor,
  },
  watch: {
    schemaObjectArray: {
      handler() {},
      deep: true,
    },
  },

  mounted() {
    this.fakerKeyArray = fakerGenerateEntry;
    this.editorFieldData = this.schemaObjectArray;
  },
  methods: {
    addAnotherFieldToInputArray() {
      let schemaObject = {
        id: uuidv4(),
        schemaKey: `add_field_${this.addFieldCount++}`,
        schemaType: "text",
      };

      this.schemaObjectArray.push(schemaObject);
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

      for (let schema of this.schemaObjectArray) {
        let acessKey = this.fakerKeyArray.find(
          (fakerKey) => fakerKey.data_type === schema.schemaType
        );
        if (acessKey) {
          outputObject[schema.schemaKey] = acessKey.getData();
        } else {
          outputObject[schema.schemaKey] = "";
        }
      }
      this.outputJsonData = outputObject;
    },
    generateDataFromJsonSchema() {
      let updatedData = this.$refs.jsonEditor.getEditorData();
      this.setEditorDataToSchemaObject(updatedData);
      this.generateDataFromSchema();
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

    // box-shadow: 0 0 0.9rem rgb(218, 216, 216);
    box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
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

      &::-webkit-scrollbar {
        width: 1rem;
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
  // padding: 0 0 0.04rem 0.04rem !important;
  padding: 0 !important;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5) !important;
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
  border-top: 1px solid rgb(201, 200, 200);
  border-bottom: 1px solid rgb(201, 200, 200);
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
      border: 1px solid rgb(201, 200, 200) !important;
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

  // box-shadow: 0 0 0.9rem rgb(218, 216, 216);
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
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
  min-height: 35px !important;
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
  border: 1px solid rgb(201, 200, 200) !important;
}
</style>
