import "./index.css";
import router from "./index.js";
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
const cache = new InMemoryCache();
const token = localStorage.getItem("token");
console.log(token);
const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:8080/v1/graphql",

  headers: {
    "X-Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router).mount("#app");
