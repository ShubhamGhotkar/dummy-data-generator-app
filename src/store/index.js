import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAlert: false,
    showNav: true,
  },
  getters: {},
  mutations: {},
  actions: {
    hideNav() {
      this.$store.state.showNav = false;
    },
  },
  modules: {},
});
