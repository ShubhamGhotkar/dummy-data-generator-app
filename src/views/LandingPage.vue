<template>
  <section class="homepage-container">
    <div class="input-container">
      <div class="input-container-item">
        <div class="input-container-item-tittle">
          <span>Field Name</span>
          <span>Type</span>
          <div
            class="input-container-item-add-field"
            @click="addAnotherFieldToInputArray"
          >
            <span>+ Add Another Field</span>
          </div>
        </div>
        <div class="input-container-item-input-field">
          <InputField
            :objectList="schemaObjectArray"
            @updateSchemaArray="setUpdatedSchemaArray"
          />
        </div>
      </div>
      <span>OR</span>
      <div class="input-container-item" ref="jsoneditor"></div>
    </div>
    <div class="row-input">
      <div class="row-input-item"><span>Rows</span></div>
      <div class="row-input-item">
        <v-text-field
          solo
          dense
          placeholder="No of Rows"
          class="row-input-item-text-field"
          type="Number"
        ></v-text-field>
      </div>
    </div>
    <div class="output-container">
      <div class="output-container-btn">
        <v-btn elevation="1" class="output-btn">JSON</v-btn>
        <v-btn elevation="1" class="output-btn">API</v-btn>
      </div>
      <div class="output-container-btn">
        <v-btn elevation="1" class="output-btn-copy">Copy</v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import InputField from "@/components/InputField.vue";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

export default {
  mounted() {
    const container = this.$refs.jsoneditor;
    const jsonSchema = {
      type: "object",
      properties: {
        name: {
          type: "string",
          // minLength: 1,
          // maxLength: 50,
        },
        age: {
          type: "string",
          minimum: 0,
          maximum: 120,
        },
        email: {
          type: "string",
          format: "email",
        },
      },
      // required: ["name", "age"],
    };

    const options = {
      mode: "code",
      enableClipboard: true,
      enableSort: false,
      search: false,
      schema: jsonSchema,
      enableTransform: false,
    };
    this.jsonEditor = new JSONEditor(container, options);

    this.jsonEditor.set({
      first_name: "String",
      last_name: "String",
      age: "Number",
    });
  },
  data() {
    return {
      schemaObjectArray: [
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
      ],
    };
  },
  components: {
    InputField,
    // JsonField,
  },

  methods: {
    addAnotherFieldToInputArray() {
      let schemaObject = {
        id: uuidv4(),
        schemaKey: "gender",
        schemaType: "Number",
      };

      this.schemaObjectArray.push(schemaObject);
    },
    setUpdatedSchemaArray(data) {
      this.schemaObjectArray = data;
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
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  &-item {
    flex: 0 0 48%;
    height: 100%;
    background: $primary-whitsmoke;
    position: relative;

    &-tittle {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      gap: 1rem;

      & span {
        width: 15rem;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.03rem;
        background: $primary-white;
        border-radius: 2px;
        margin-top: -0.4rem;
        padding: 0 0 0.3rem 0;
      }
    }
    &-input-field {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        width: 0;
      }
    }

    &-add-field {
      // height: 3rem;
      width: max-content;
      cursor: pointer;

      position: absolute;
      bottom: 0.25rem;
      left: 0;
      z-index: 999;

      & span {
        text-transform: uppercase;
        letter-spacing: 0.03rem;
        font-size: 1rem;
        font-weight: 500;

        background: $background-purple;
        color: $primary-white;
        text-align: center;
        padding: 0.3rem 0.6rem;
        border-radius: 0 0.2rem 0 0;
        &:hover {
          background: $background-purple-light;
        }
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
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  padding: 0.5rem 0 0.5rem 2.5rem;

  &-item {
    font-size: 1.2rem;
    font-weight: 500;
    &-text-field {
      width: 9rem;

      height: 2rem !important ;
      margin: 0 0 0.4rem 0 !important;
    }
  }
}
.output-container {
  width: 100%;
  height: 42%;
  background: $background-orange-light;
  position: relative;
  &-btn {
    width: max-content;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.1rem;

    &:nth-child(2) {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>

<style lang="scss">
@import "../sass/style.scss";
.v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
  min-height: 35px !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 10px !important;
  border-radius: 0;
  padding: 1rem !important;
}
.output-btn {
  &:nth-child(1) {
    border-radius: 0 0 0.5rem 0 !important;
  }
  &:nth-child(2) {
    border-radius: 0 0 0.5rem 0.5rem !important;
  }

  &-copy {
    border-radius: 0 0 0 0.5rem !important;
  }
}

//

/* Add your custom styles here */
.jsoneditor {
  /* Your styles for the main JSON Editor container */
  // background: red !important;
  border: 1.2px solid $primary-gray !important;
}

.jsoneditor-tree {
  /* Your styles for the tree view mode */
}

.jsoneditor-form {
  /* Your styles for the form view mode */
}

.jsoneditor-text {
  /* Your styles for the text view mode */
}

.jsoneditor-menu {
  /* Your styles for the editor's menu */
  background: $background-purple;
}

/* Add more styles as needed */
</style>
