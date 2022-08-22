<template>
  <h3 class="px-7 font-semibold text-gray-800" style="font-family: 'Source Sans Pro', sans-serif">
    {{ this.index }}
  </h3>
  <div class="container w-80 mx-auto my-20 px-6 py-6 shadow">
    <h1 class="text-pink-600 font-bold font-sans text-4xl text-center">
      SIGN UP
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
        @click="createuser({ name: this.name, email: this.email })"
        class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
export default {
  name: "signupPage",

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
    };
  },

  methods: {
    reset() {
        this.name="",
        this.email="",
        this.index=""
    },

    createuser() {
      this.register({ name: this.name, email: this.email }).then(
        (data) => (this.index = data.data.register.message)
      );
    },
  },
  created() {},

  setup() {
    const name = ref("en");
    const email = ref("en");

    const { mutate: register } = useMutation(
      gql`
        mutation register($name: String!, $email: String!) {
          register(name: $name, email: $email) {
            message
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
      register,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
