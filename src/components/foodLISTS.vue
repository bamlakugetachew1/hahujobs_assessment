<template>
  <div class="min-h-screen bg-indigo-50">
    <nav>
      <div
        class="w-full bg- bg-gradient-to-tr from-indigo-600 to-purple-600 py-6 flex items-center justify-between px-10 md:px-20 xl:px-30"
      >
        <h1 class="text-white text-2xl font-semibold">RECEIPES</h1>
        <div class="flex items-center space-x-10">
          <div class="hidden lg:block">
            <input
              type="text"
              class="py-1 px-1 outline-none rounded-md w-40"
              v-model="enterd"
            />
            <button
              class="border border-white px-4 py-1 rounded-md text-white text-xl"
              @click="loginuser({ enterd: this.enterd })"
            >
              Search
            </button>
          </div>

          <div class="hidden lg:block">
            <select v-model="filterd">
              <option value="time" selected>duration</option>
              <option value="ingridents">ingridents</option>
            </select>
            <button
              class="border border-white px-4 py-1 rounded-md text-white text-xl"
              @click="filterfoods({ filterd: this.filterd })"
            >
              Filter
            </button>
          </div>

          <button
            class="border border-white px-4 py-1 rounded-md text-white text-xl"
          >
            <router-link
              :to="{
                name: 'createFood',
              }"
              >ADD RECIPES</router-link
            >
          </button>
          <button
            href="#"
            @click="logout"
            class="border border-white px-4 py-1 rounded-md text-white text-xl"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </nav>
    {{ this.message }}

    <h1
      v-if="this.index == 'nodatas'"
      class="text-gray-900 text-xl font-medium mb-2"
    >
      no foods found with the enterd propertiy
    </h1>
    <main>
      <div class="container w-full md:px-40 mx-auto py-20" v-if="this.val == 0">
        <div
          class="md:grid lg:grid-cols-3 md:grid-cols-2 mlg:grid-cols-3 md:gap-10 space-y-6 md:space-y-0 px-10 md:px-0 mx-auto"
        >
          <div
            class="flex justify-center"
            v-for="space in result.foods"
            :key="space.id"
          >
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!">
                <img
                  class="rounded-t-lg"
                  v-bind:src="'finalbackend/public/' + space.image_url"
                  alt=""
                />
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">
                  <router-link
                    :to="{
                      name: 'singleFood',
                      params: {
                         foodid: space.id,
                        title:space.title,
                        description:space.description,
                        steps:space.steps,
                        time:space.time,
                        ingridents:space.ingridents,
                        image_url:space.image_url,
                      },
                    }"
                  >
                    {{ space.title }}</router-link>
                </h5>
                <p class="text-gray-700 text-base mb-4">
                  {{ space.description }}
                </p>

                <p class="text-gray-700 text-base mb-4">
                  time takes: {{ space.time }}
                </p>
                <p class="text-gray-700 text-base mb-4">
                  ingridents: {{ space.ingridents }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="container w-full md:px-40 mx-auto py-20"
        v-if="this.val != 0 && this.index != 'nodatas'"
      >
        <div
          class="md:grid lg:grid-cols-3 md:grid-cols-2 mlg:grid-cols-3 md:gap-10 space-y-6 md:space-y-0 px-10 md:px-0 mx-auto"
        >
          <div
            class="flex justify-center"
            v-for="space in this.index"
            :key="space.id"
          >
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!">
                <img
                  class="rounded-t-lg"
                  v-bind:src="'finalbackend/public/' + space.image_url"
                  alt=""
                />
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">

                        <router-link
                    :to="{
                      name: 'singleFood',
                      params: {
                        foodid: space.id,
                        title:space.title,
                        description:space.description,
                        steps:space.steps,
                        time:space.time,
                        ingridents:space.ingridents,
                        image_url:space.image_url,
                      },
                    }"
                  >
                    {{ space.title }}</router-link>


                </h5>
                <p class="text-gray-700 text-base mb-4">
                  {{ space.description }}
                </p>

                <p class="text-gray-700 text-base mb-4">
                  time takes: {{ space.time }}
                </p>
                <p class="text-gray-700 text-base mb-4">
                  ingridents: {{ space.ingridents }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import router from "../index.js";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
const CHARACTERS_QUERY = gql`
  query foods {
    foods {
      id
      title
      description
      image_url
      time
      ingridents
      steps

    }
  }
`;

export default {
  name: "foodLISTS",
  components: {},
  data() {
    return {
      datas: [],
      index: [],
      detail: [],
      title: "",
      val: 0,
      enterd: "",
      selected: "",
      time: "",
      filterd: "",
      val1: 0,
      message: "",
      foodid: "",
      like: "",
      rating: "",
    };
  },

  created() {
    const reloaded = localStorage.getItem("reloaded");
    if (reloaded !== "true") {
      localStorage.setItem("reloaded", "true");
      location.reload();
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      router.push({ path: "/loginPage" });
    },

    loginuser() {
      this.val = this.val + 1;
      this.gettitle({ title: this.enterd }).then((data) => {
        this.index = data.data.gettitle.datas;
      });
    },

    filterfoods() {
      this.val = this.val + 1;
      if (this.filterd == "time") {
        this.durationfilter().then((data) => {
          this.index = data.data.durationfilter.datas;
        });
      }

      if (this.filterd == "ingridents") {
        this.ingridentsfilter().then((data) => {
          this.index = data.data.ingridentsfilter.datas;
        });
      }
    },
  },

  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    const title = ref("en");
    const foodid = ref("foc");
    const { mutate: gettitle } = useMutation(
      gql`
        mutation gettitle($title: String!) {
          gettitle(title: $title) {
            datas
          }
        }
      `,
      () => ({
        variables: {
          title: title.value,
        },
      })
    );

    const { mutate: durationfilter } = useMutation(
      gql`
        query durationfilter {
          durationfilter {
            datas
          }
        }
      `,
      () => ({})
    );

    const { mutate: ingridentsfilter } = useMutation(
      gql`
        query ingridentsfilter {
          ingridentsfilter {
            datas
          }
        }
      `,
      () => ({})
    );

    return {
      result,
      loading,
      error,
      gettitle,
      durationfilter,
      ingridentsfilter,
    };
  },
};
</script>
<style></style>
