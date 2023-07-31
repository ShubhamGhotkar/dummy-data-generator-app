<template>
  <div class="float-btn" v-if="showFloat">
    <div class="float-btn-container">
      <div
        class="float-btn-container-add-another-field"
        @click="addAnotherFieldToInputArray"
        v-if="add_field"
      >
        <v-btn class="float-btn-container-add-another-field-btn">
          +add Another Field
        </v-btn>
      </div>
      <div class="float-btn-container-row">
        <div class="float-btn-item">
          <!-- <span class="float-btn-item-rows">Rows</span> -->
        </div>
        <div class="float-btn-item">
          <v-text-field
            solo
            dense
            placeholder="No of Rows"
            class="float-btn-item-text-field"
            type="Number"
            :min="1"
          ></v-text-field>
        </div>
      </div>
    </div>
    <div class="float-btn-generate-btn">
      <v-btn class="float-btn-generate-btn-btn" @click="generateData">
        generate data
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showFloat: {
      type: Boolean,
      require: true,
      default: false,
    },
    add_field: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    addAnotherFieldToInputArray() {
      this.$emit("addAnotherFieldToInputArray");
    },
    generateData() {
      this.$emit("generateData");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
.float-btn {
  width: 100%;
  height: 3rem;
  font-size: 0.7rem;
  color: $primary-white;
  background: $cerulean-color;

  position: absolute;
  bottom: 0;
  left: 0;
  z-index: $top-index;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &-container {
    flex: 0 0 50%;
    margin-left: 0.5rem;

    display: flex;
    align-items: center;
    gap: 0.7rem;
    &-add-another-field {
      width: 50%;
      height: 2rem;
      &-btn {
        height: 100%;
        width: 100%;
        background-color: $primary-white !important;
        height: 1.8rem !important;
        color: $cerulean-color !important;
        box-shadow: none;
        margin-right: 2rem !important;
        border-radius: 0.2rem !important;
        border: 1px solid $primary-border !important;
      }
    }
    &-row {
      width: 40%;

      margin-top: 0.3rem;
      font-size: inherit !important;
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

  &-generate-btn {
    width: 60%;
    height: 2rem;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    &-btn {
      background-color: $primary-white !important;
      height: 1.8rem !important;
      color: $cerulean-color !important;
      box-shadow: none;
      margin-right: 0.7rem !important;
      border-radius: 0.2rem !important;
      border: 1px solid $primary-border !important;
    }
  }
}
</style>

<style lang="scss">
@import "../sass/style.scss";
.float-btn-item
  > .v-text-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot {
  height: 2rem !important;
  width: fit-content !important;
}
.float-btn-item
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
  border: 1px solid $primary-border !important;
}
</style>
