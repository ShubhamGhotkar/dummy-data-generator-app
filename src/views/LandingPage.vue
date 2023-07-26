<template>
  <section class="homepage-container">
    <div class="input-container">
      <div
        class="input-container-item"
        @mouseenter="handleshowInputFloat"
        @mouseleave="handleHideInputFloat"
      >
        <div class="input-container-item-tittle">
          <span class="field-name">Field Name</span>
          <span class="field-type">Type</span>
        </div>
        <div class="input-container-item-input-field field-container">
          <InputField
            :objectList="schemaObjectArray"
            @updateSchemaArray="setUpdatedSchemaArray"
          />
        </div>
        <FloatBtn
          :showFloat="showInputFloat"
          @addAnotherFieldToInputArray="addAnotherFieldToInputArray"
          @mouseenter="handleshowInputFloat"
        />
      </div>
      <div
        class="input-container-item editor-container"
        @mouseenter="handleshowEditorFloat"
        @mouseleave="handleHideEditorFloat"
      >
        <!-- <JsonEditor /> -->
        <JsonEditor2 />
        <FloatBtn
          :add_field="false"
          :showFloat="showEditorFloat"
          @mouseenter="handleshowEditorFloat"
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
        <JsonEditor2 v-if="showJson" />
      </div>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import InputField from "@/components/InputField.vue";
import FloatBtn from "@/components/FloatBtn.vue";
// import JsonEditor from "@/components/JsonEditor.vue";
import JsonEditor2 from "@/components/JsonEditor2.vue";
export default {
  data() {
    return {
      schemaObjectArray: [
        {
          id: uuidv4(),
          schemaKey: "_id",
          schemaType: "Number",
        },
        {
          id: uuidv4(),
          schemaKey: "first_name",
          schemaType: "String",
        },
        {
          id: uuidv4(),
          schemaKey: "last_name",
          schemaType: "String",
        },

        {
          id: uuidv4(),
          schemaKey: "age",
          schemaType: "Number",
        },
        {
          id: uuidv4(),
          schemaKey: "Image",
          schemaType: "URL",
        },
        // {
        //   id: uuidv4(),
        //   schemaKey: "gender",
        //   schemaType: "String",
        // },
      ],
      showJson: true,
      showCopyBtn: false,
      showInputFloat: false,
      showEditorFloat: false,
    };
  },
  components: {
    InputField,
    FloatBtn,
    // JsonEditor,
    JsonEditor2,
  },

  methods: {
    addAnotherFieldToInputArray() {
      let schemaObject = {
        id: uuidv4(),
        schemaKey: "gender",
        schemaType: "String",
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

    box-shadow: 0 0 0.9rem rgb(218, 216, 216);
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

  border: 0.5rem solid $primary-whitsmoke;
  margin-top: 1.5rem;
  &-btn {
    flex: 0 0 4%;
    height: 100%;
  }
  &-editor {
    flex: 0 0 93%;
    height: 100%;
  }
}
.editor-container {
  padding: 0.3rem;
}
.field-container {
  padding: 0 5rem;
}
.field-name {
  padding-left: 6.5rem;
}
.field-type {
  padding-left: 6.5rem;
}
.text-copy {
  position: absolute;
  top: 0;
  right: 0;
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
