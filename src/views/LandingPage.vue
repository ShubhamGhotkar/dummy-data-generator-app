<template>
  <section class="homepage-container">
    <div class="input-container">
      <div class="input-container-item">
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
      </div>
      <div class="input-container-item editor-container">
        <JsonEditor />
      </div>
    </div>
    <div class="row-input">
      <div class="row-input-add-field" @click="addAnotherFieldToInputArray">
        <span>+ Add Another Field</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center">
        <div class="row-input-item">
          <span class="row-input-item-rows">Rows</span>
        </div>
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
    </div>
    <CombineBtn text_1="Json" text_2="Api" />
    <div class="output-container">
      <div class="output-container-editor">
        <JsonEditor />
      </div>
      <!-- <div class="output-container-btn">
        <v-btn elevation="1" class="output-btn">JSON</v-btn>
        <v-btn elevation="1" class="output-btn">API</v-btn>
        <v-btn elevation="1" class="output-btn-copy">Copy</v-btn>
      </div> -->
    </div>
    <!-- <TypePopup /> -->
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import InputField from "@/components/InputField.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import CombineBtn from "@/components/CombineBtn.vue";
// import TypePopup from "@/components/TypePopup.vue";

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
    };
  },
  components: {
    InputField,
    JsonEditor,
    CombineBtn,
    // TypePopup,
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

  gap: 3rem;

  &-item {
    flex: 0 0 45%;
    height: 100%;
    position: relative;

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

  &-item {
    font-size: 1.2rem;
    &-rows {
      font-size: 1.1rem;
      font-weight: 400;
      letter-spacing: 0.03rem;
      color: $primary-gray;
    }
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
  // background: $primary-whitsmoke;
  // position: relative;
  display: flex;
  // gap: 1rem;

  // padding: 0.5rem 0 0.5rem 0.5rem;
  border: 0.5rem solid $primary-whitsmoke;
  margin-top: 0.5rem;
  &-btn {
    flex: 0 0 4%;
    // width: max-content;
    // display: flex;
    // justify-content: flex-start;
    // align-items: flex-start;
    // gap: 0.1rem;

    // position: absolute;
    // &:not(&:nth-last-child(1)) {
    //   top: 0;
    //   left: 0;
    //   z-index: 999;
    // }
    // &:nth-last-child(1) {
    //   top: 0;
    //   right: 0;
    // }
  }
  &-editor {
    flex: 0 0 93%;
    height: 100%;
    // background: red;
  }
}
.editor-container {
  background: whitesmoke;
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
// .output-btn {
//   &:nth-child(1) {
//     border-radius: 0 0 0.3rem 0 !important;
//   }
//   &:nth-child(2) {
//     border-radius: 0 0 0.3rem 0.3rem !important;
//   }

//   &-copy {
//     border-radius: 0 0 0 0.3rem !important;
//   }
// }
.row-input-item
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
  border: 1px solid rgb(201, 200, 200) !important;
}

// .output-container .jse-menu .svelte-497ud4,
// .output-container .jse-navigation-bar.svelte-15r3ahw.svelte-15r3ahw {
//   display: none;
// }
</style>
