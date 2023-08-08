import Vue from "vue";
import Vuex from "vuex";
// import { v4 as uuidv4 } from "uuid";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMessage: false,
    showMessageText: "",
  },
  getters: {},
  mutations: {
    SET_SHOW_MESSAGE(state, payload) {
      // if (state.showMessage) {
      //   state.showMessage = false;
      // }
      state.showMessage = payload.showMessage;
      state.showMessageText = payload.showMessageText;
    },
  },
  actions: {},
  modules: {},
});
