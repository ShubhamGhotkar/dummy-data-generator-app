<template>
  <div class="btn-container">
    <div
      class="btn-container-btn btn1"
      :class="{ active: active }"
      @click="toggleActive(text_1)"
    >
      {{ text_1 }}
    </div>
    <div
      class="btn-container-btn btn2"
      :class="{ active: !active }"
      @click="toggleActive(text_2)"
    >
      {{ text_2 }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text_1: {
      type: String,
      require: true,
      default: "",
    },
    text_2: {
      type: String,
      require: true,
      default: "",
    },
  },
  data() {
    return {
      active: true,
      btnName: this.text_1,
    };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
      this.emit("activeClass", this.active);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/style.scss";
.btn-container {
  width: 13rem;
  height: 2.6rem;
  background: whitesmoke;
  padding: 0.3rem;
  border-radius: 0.2rem;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  font-size: 1.1rem;
  font-weight: 500;
  color: $primary-gray;

  &-btn {
    height: 100%;
    flex: 0 0 50%;
    background: whitesmoke;
    border-radius: inherit;

    display: grid;
    place-items: center;

    &:hover {
      cursor: pointer;
    }
  }
}
.active {
  background: white;
  transition: all 0.2s ease-in-out;
}
</style>
