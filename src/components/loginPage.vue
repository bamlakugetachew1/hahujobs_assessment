<template>
  <h3
    class="px-7 font-semibold text-gray-800"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    {{ this.index }}
  </h3>
  <div class="container w-80 mx-auto my-20 px-6 py-6 shadow">
    <h1 class="text-pink-600 font-bold font-sans text-4xl text-center">
      LOGIN
    </h1>
    <div class="h-0.5 bg-gray-200 w-36 mx-auto mt-2.5"></div>

    <div class="flex flex-col my-5">
      <label class="my-2" for="uname">Username</label>
      <input
        type="text"
        id="uname"
        name="uname"
        v-model="name"
        class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100 text-pink-500"
      />
      <label class="my-2" for="psw">Email</label>
      <input
        type="email"
        id="psw"
        name="psw"
        v-model="email"
        class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100 text-pink-500"
      />
    </div>
    <div class="text-center mt-3">
      <button
        @click="reset"
        class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded"
      >
        RESET
      </button>
      <button
        @click="loginuser({ name: this.name, email: this.email })"
        class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import router from "../index.js";
export default {
  name: "loginPage",
  components: {},
  data() {
    return {
      id1: 0,
      email: "",
      name: "",
      name1: "",
      email1: "",
      index: "",
      count: 0,
      email2: "",
      email3: "",
    };
  },

  methods: {
    reset() {
      (this.name = ""), (this.email = ""), (this.index = "");
    },

    loginuser() {
      this.login({ name: this.name, email: this.email }).then((data) => {
        this.index = data.data.login.message;
        this.email2 = data.data.login.token;
        if (this.index == "you are logged in") {
          localStorage.setItem("token", this.email2);
          router.push({ path: "/foodLISTS" });
        } else {
          console.log("awesome works");
        }
      });
    },
  },

  created() {},

  setup() {
    const name = ref("en");
    const email = ref("en");
    const { mutate: login } = useMutation(
      gql`
        mutation login($name: String!, $email: String!) {
          login(name: $name, email: $email) {
            message
            token
          }
        }
      `,
      () => ({
        variables: {
          name: name.value,
          email: email.value,
        },
      })
    );

    return {
      login,
    };
  },
};
</script>
<style scoped></style>
