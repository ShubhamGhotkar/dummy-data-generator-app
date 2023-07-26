<template>
  <div class="float-btn" v-if="showFloat">
    <div
      class="float-btn-add-another-field"
      @click="addAnotherFieldToInputArray"
      v-if="add_field"
    >
      <span>+ Add Another Field</span>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center">
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
        ></v-text-field>
      </div>
    </div>
    <div class="float-btn-generate-btn">
      <v-btn
        color="primary"
        dark
        elevation="2"
        class="v-bar-container-btn"
        @click="handleRun"
        style="background-color: $primary-sky !important"
      >
        generate data >></v-btn
      >
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
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
.float-btn {
  width: 100%;
  height: 3rem;
  background: $cerulean-color;

  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &add-another-field {
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
</style>
