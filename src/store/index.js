import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    schemaObjectArray: [
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
    ],
  },
  getters: {},
  mutations: {
    removeSchemaObjectFromArray() {},
  },
  actions: {},
  modules: {},
});
