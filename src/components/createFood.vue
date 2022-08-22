<template>
  <div>
    <div
      class="md:grid lg:grid-cols-2 md:grid-cols-2 mlg:grid-cols-3 md:gap-10 space-y-6 md:space-y-0 px-10 md:px-0 mx-auto"
    >
      <form>
        <div class="form-group mb-6">
          <input
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="title"
            v-model="title"
          />
        </div>
        <div class="form-group mb-6">
          <textarea
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlTextarea13"
            rows="3"
            placeholder="description"
            v-model="description"
          ></textarea>
        </div>
        <div class="form-group mb-6">
          <textarea
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlTextarea13"
            rows="3"
            placeholder="steps"
            v-model="steps"
          ></textarea>
        </div>
        <div class="form-group mb-6">
          <textarea
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlTextarea13"
            rows="3"
            placeholder="ingridents"
            v-model="ingridents"
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="
            creatfoods({
              catagory: this.catagory,
              description: this.description,
              image_url: this.image_url,
              ingridents: this.ingridents,
              steps: this.steps,
              time: this.time,
              title: this.title,
            })
          "
        >
          ADD RECIPES
        </button>
      </form>

      <form>
        <div class="form-group mb-6">
          <input
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="catagory"
            v-model="catagory"
          />
        </div>
        <div class="form-group mb-6">
          <input
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput8"
            placeholder="time to prepare meal"
            v-model="time"
          />
        </div>
        <div class="form-group mb-6">
          <input
            type="file"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput8"
            placeholder="image files"
            ref="file"
            @change="onFileChange"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import router from "../index.js";
import axios from "axios";
export default {
  name: "createFood",
  components: {},
  data() {
    return {
      id1: 0,
      email: "",
      name: "",
      name1: "",
      email1: "",
      index: [],
      count: 0,
      fname: "",
      lname: "",
      cemail: "",
      title: "",
      description: "",
      catagory: "",
      steps: "",
      ingridents: "",
      time: "",
      image_url: "",
      file1: "",
      files: "",
      file: "",
      items: "",
      selectedFile: "",
    };
  },

  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.selectedFile = selectedFile;
      this.image_url = selectedFile.name;
    },

    async onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      axios
        .post("http://localhost:3000/upload", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    creatfoods() {
      this.insert_foods({
        catagory: this.catagory,
        description: this.description,
        image_url: this.image_url,
        ingridents: this.ingridents,
        steps: this.steps,
        time: this.time,
        title: this.title,
      }).then(
        (data) => this.onUploadFile(),
        router.push({ path: "/foodLISTS" })
      );
    },
  },
  created() {},

  setup() {
    const catagory = ref("en");
    const description = ref("en");
    const image_url = ref("vue js tutorials");
    const ingridents = ref("2015");
    const steps = ref("en");
    const time = ref("en");
    const title = ref("vue js tutorials");
    const { mutate: insert_foods } = useMutation(
      gql`
        mutation insert_foods(
          $catagory: String!
          $description: String!
          $image_url: String!
          $ingridents: String!
          $steps: String!
          $time: String!
          $title: String!
        ) {
          insert_foods(
            objects: [
              {
                catagory: $catagory
                description: $description
                image_url: $image_url
                ingridents: $ingridents
                steps: $steps
                time: $time
                title: $title
              }
            ]
          ) {
            returning {
              __typename
            }
          }
        }
      `,
      () => ({
        variables: {
          catagory: catagory.value,
          description: description.value,
          image_url: image_url.value,
          ingridents: ingridents.value,
          steps: steps.value,
          time: time.value,
          title: title.value,
        },
      })
    );

    return {
      insert_foods,
    };
  },
};
</script>
