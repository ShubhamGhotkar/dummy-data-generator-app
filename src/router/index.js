import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/LandingPage.vue";
import ApiView from "../views/ApiView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/mock-api",
    name: "Api",
    component: ApiView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
