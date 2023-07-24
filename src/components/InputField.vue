<template>
  <section>
    <div
      class="input-field-container"
      v-for="input in inputArray"
      :key="input.id"
      style="transition: all 0.6s ease-in"
    >
      <div class="input-field-container-input-field">
        <v-text-field
          solo
          placeholder="Add field"
          style="max-height: 30px !important; padding: 0 !important"
          v-model="input.fieldName"
        ></v-text-field>
      </div>

      <div class="input-field-container-input-type">
        <!-- <v-select :items="['Foo', 'Bar']" label="Items"></v-select> -->
        <v-text-field
          solo
          placeholder="Add field"
          style="max-height: 30px !important; padding: 0 !important"
          v-model="input.fieldType"
        ></v-text-field>
      </div>
      <div class="input-field-container-cancle-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="input-field-container-cancle-btn-svg"
          @click="removeDataField(input.id)"
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
export default {
  props: {
    arr: {
      type: Array,
      require: true,
    },
  },
  created() {
    this.inputArray = this.arr;
  },
  data() {
    return {
      showList: false,
      inputArray: [],
      selectedItem: null,
    };
  },
  updated() {
    console.log(this.inputArray);
  },
  methods: {
    removeDataField(id) {
      this.inputArray = this.inputArray.filter((field) => field.id !== id);
      console.log("updatedData", this.inputArray);
      this.$emit("deleteFieldFromArray", this.inputArray);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-field-container {
  width: 80%;
  height: 3rem;
  margin: 0.5rem auto;
  background: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &-input-field {
    flex: 0 0 45%;
    height: 100%;
    display: grid;
    place-items: center;
    gap: 1rem;
  }
  &-input-type {
    flex: 0 0 45%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: end;
  }
  &-cancle-btn {
    flex: 0 0 10%;
    height: 100%;
    display: grid;
    place-items: center;
    cursor: pointer;

    display: grid;
    place-items: center;
    &-svg {
      height: 2rem;
      width: 2rem;
      stroke: #000;
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
</style>

<style lang="scss">
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 24px !important;
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
