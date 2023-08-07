<template>
  <section class="input-field-section">
    <div
      class="input-field-container"
      v-for="input in schemaObjectArray"
      :key="input.id"
      style="transition: all 0.6s ease-in"
    >
      <div class="input-field-container-input-field">
        <v-text-field
          solo
          placeholder="Add field"
          style="max-height: 30px !important; padding: 0 !important"
          v-model="input.schemaKey"
        ></v-text-field>
      </div>

      <div class="input-field-container-input-type">
        <DialogPopup
          :field_type="input.schemaType"
          :id="input.id"
          @selectDataType="setDataTypeToInputField"
        />
      </div>
      <div class="input-field-container-cancle-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="input-field-container-cancle-btn-svg"
          @click="deleteSchemaObject(input.id)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import DialogPopup from "./DialogPopup.vue";
import { mapMutations } from "vuex";
export default {
  props: {
    objectList: {
      type: Array,
      require: true,
    },
  },
  components: {
    DialogPopup,
  },
  watch: {
    objectList: {
      handler(newData) {
        this.schemaObjectArray = newData;
      },
      deep: true,
    },
  },
  mounted() {
    this.schemaObjectArray = this.objectList;
  },
  data() {
    return {
      showList: false,
      schemaObjectArray: [],
      selectedItem: "String",
      items: ["String", "Number", "URL", "ID"],
    };
  },

  methods: {
    ...mapMutations(["SET_SHOW_MESSAGE"]),
    deleteSchemaObject(id) {
      this.schemaObjectArray = this.schemaObjectArray.filter(
        (field) => field.id !== id
      );
      this.$emit("updateSchemaArray", this.schemaObjectArray);
      this.SET_SHOW_MESSAGE({
        showMessage: true,
        showMessageText: "Delete Field successfully.",
      });
    },
    setDataTypeToInputField(dataType, id) {
      let updateDataTypeArray = this.schemaObjectArray.map((schemaObject) => {
        if (schemaObject.id === id) {
          schemaObject.schemaType = dataType;
        }
        return schemaObject;
      });

      this.schemaObjectArray = updateDataTypeArray;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
.input-field-section {
  width: 100%;
  height: max-content;

  display: flex;
  flex-direction: column;
  gap: 0;
}
.input-field-container {
  width: 100%;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  &-input-field {
    flex: 0 0 42%;
    height: 100%;
    display: grid;
    place-items: center;
  }
  &-input-type {
    flex: 0 0 42%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: end;
  }
  &-cancle-btn {
    flex: 0 0 3%;
    height: 100%;
    display: grid;
    place-items: center;
    cursor: pointer;

    display: grid;
    place-items: center;
    &-svg {
      height: 1.4rem;
      width: 1.4rem;
      stroke: $primary-black;
    }
  }
}

.v-list-container {
  position: relative;

  &-list {
    width: 100%;
    position: absolute;
    top: 2rem;
    left: 0;
    z-index: 999;
  }
}

.schema-type-span {
  height: 100%;
  width: 100%;
  padding-left: 0.8rem;
}
</style>

<style lang="scss">
.v-text-field.v-text-field--solo .v-input__control {
  min-height: fit-content !important;
  padding: 0;
}

.input-field-container-input-field
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot,
.input-field-container-input-type
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
  border: 1px solid rgb(201, 200, 200) !important;
  padding: 0.05rem 0 0.05rem 0.8rem !important;
  margin-bottom: 0.5rem !important;
}
</style>
