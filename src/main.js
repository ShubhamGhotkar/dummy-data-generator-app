import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vuetify from "./plugins/Vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Vuetify,

  render: (h) => h(App),
}).$mount("#app");
