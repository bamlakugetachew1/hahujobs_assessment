import { createWebHistory, createRouter } from "vue-router";
import signupPage from "./components/signupPage.vue";
import loginPage from "./components/loginPage.vue";
import foodLISTS from "./components/foodLISTS.vue";
import createFood from "./components/createFood.vue";
import singleFood from "./components/singleFood.vue";

import App from "./App.vue";
const routes = [
  {
    path: "/singleFood",
    name: "singleFood",
    component: singleFood,
  },

  {
    path: "/foodLISTS",
    name: "foodLISTS",
    component: foodLISTS,
  },

  {
    path: "/createFood",
    name: "createFood",
    component: createFood,
  },

  {
    path: "/home",
    name: "App",
    component: App,
  },

  {
    path: "/signupPage",
    name: "signupPage",
    component: signupPage,
  },

  {
    path: "/loginPage",
    name: "loginPage",
    component: loginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
