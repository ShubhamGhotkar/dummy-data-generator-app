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
            :arr="InputFieldArray"
            @deleteFieldFromArray="updateData"
          />
        </div>
      </div>
      <span>OR</span>
      <div class="input-container-item">
        <JsonField />
      </div>
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
import JsonField from "@/components/JsonField.vue";

export default {
  data() {
    return {
      showAlert: false,
      InputFieldArray: [
        {
          id: uuidv4(),
          fieldName: "first_name",
          fieldType: "String",
        },
        {
          id: uuidv4(),
          fieldName: "last_name",
          fieldType: "String",
        },
      ],
    };
  },
  components: {
    InputField,
    JsonField,
  },

  methods: {
    addAnotherFieldToInputArray() {
      let newField = {
        id: uuidv4(),
        fieldName: "gender",
        fieldType: "Number",
      };

      this.InputFieldArray.push(newField);
    },
    updateData(data) {
      console.log(data);
      this.InputFieldArray = data;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    background: whitesmoke;
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
        background: white;
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

        background: #8472d6;
        color: white;
        text-align: center;
        padding: 0.3rem 0.6rem;
        border-radius: 0 0.2rem 0 0;
        &:hover {
          background: #cdc4f5;
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
  background: rgba(245, 196, 106, 0.362);
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
</style>
