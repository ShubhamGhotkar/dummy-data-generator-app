<template>
  <ul class="api-section">
    <!-- <li class="api-section-list" v-for="num in apiList" :key="num">
      <span class="api-section-list-copybtn">copy</span>
    </li> -->

    <v-data-table
      :headers="headers"
      :items="apiList"
      :search="search"
    ></v-data-table>
  </ul>
</template>

<script>
export default {
  mounted() {
    this.$store.state.showNav = false;
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Sr No",

          value: "srNo",
        },
        { text: "Methods", value: "methods" },
        { text: "URL", value: "url" },
        { text: "Copy", value: "carbs" },
      ],
      apiList: [
        {
          srNo: "1",
          methods: "Get",
          url: "",
        },
        {
          srNo: "2",
          methods: "POST",
          url: "",
        },
        {
          srNo: "3",
          methods: "PUT",
          url: "",
        },
        {
          srNo: "4",
          methods: "DELETE",
          url: "",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../sass/style.scss";
.api-section {
  height: 100%;
  width: 100%;
  background: $primary-whitsmoke;

  list-style: none;
  // padding-top: 1rem;
  padding: 0 2rem;

  &-list {
    width: 50% !important;
    height: 2.5rem;
    background: $primary-white;
    margin: 0.7rem auto;

    transition: all 0.7s ease;
    border-radius: 0.5rem;
    position: relative;

    &-copybtn {
      position: absolute;
      top: 0.1rem;
      right: 0.2rem;
      font-size: 0.7rem;
      border: 0.01rem solid $primary-border;
      padding: 0 0.5rem;
      border-radius: 0.12rem;
      opacity: 0.3;

      &:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
}
</style>
