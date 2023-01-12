<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div
      class="h-60 lg:h-auto lg:w-96 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
    >
      <a href="#!">
        <img
          class="rounded-t-lg"
          v-bind:src="'finalbackend/public/' + this.image_url"
          alt=""
        />
      </a>
    </div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-8">
        <div class="text-gray-900 font-normal text-xl mb-2">
          {{ this.title }}
        </div>

        <div class="text-gray-900 font-normal text-xl mb-2">discription</div>
        <p class="text-gray-700 text-base">{{ this.description }}</p>

        <div class="text-gray-900 font-normal text-xl mb-2">steps</div>
        <p class="text-gray-700 text-base">{{ this.steps }}</p>

        <div class="text-gray-900 font-normal text-xl mb-2">ingridents</div>
        <p class="text-gray-700 text-base">{{ this.ingridents }}</p>

        <div class="text-gray-900 font-normal text-xl mb-2">
          time to prepare meals
        </div>
        <p class="text-gray-700 text-base">{{ this.time }}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><button
            type="button"
            class="inline-block px-3 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            id="like"
            @click="likebutton()"
          >
            LIKE
          </button>
          <p>{{ this.like }}</p></span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><span>
            <select v-model="rated">
              <option value="2" selected>2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select></span
          >
          <button
            type="button"
            class="inline-block px-3 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            id="rating"
            @click="ratingbutton()"
          >
            rating
          </button>
          <p>{{ this.rating }}</p></span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><button
            type="button"
            class="inline-block px-3 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            id="favourite"
            @click="favbutton()"
          >
            Fvourite
          </button>
          <p id="fav">NAN</p>
        </span>
      </div>
    </div>
  </div>

  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <h3 class="text-gray-900 font-normal text-xl mb-2">comments</h3>
      <div
        v-if="this.datas != 'nodatas'"
        v-for="space in this.datas"
        :key="space.id"
      >
        <h5 class="text-gray-700 text-base">{{ space.comment }}</h5>
        <br />
      </div>

      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >YOUR COMMENTS</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
        v-model="comment"
      ></textarea>
      <br />
      <button
        @click="
          creatcomment({
            comment: this.comment,
          })
        "
        class="w-1000 hover:bg-sky-800 ... px-10 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-blue"
      >
        COMMENT
      </button>
    </div>
  </div>
  {{ this.message }}
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
export default {
  name: "singleFood",

  components: {},
  data() {
    return {
      id1: 0,
      datas: [],
      index: [],
      store: [],
      title: "",
      val: 0,
      enterd: "",
      selected: "",
      time: "",
      filterd: "",
      val1: 0,
      message: "",
      foodid: "",
      like: 0,
      rating: 0,
      id: 0,
      unique: "",
      rated: "",
      value: "",
      yourate: 0,
      comment: "",
      retrive: "",
      title: "",
      description: "",
    };
  },

  methods: {
    likebutton: function () {
      this.unique = localStorage.getItem("unique");

      this.val1 = this.val1 + 1;
      if (this.val1 % 2 == 0) {
        document.getElementById("like").style.backgroundColor = "blue";
        this.like = this.like - 1;
        this.update_foodstaffs({
          id: this.id,
          like: this.like,
          rating: this.rating,
          foodid: this.unique,
        }).then((data) => console.log(data));
      } else {
        document.getElementById("like").style.backgroundColor = "yellow";
        this.like = this.like + 1;

        this.update_foodstaffs({
          id: this.id,
          like: this.like,
          rating: this.rating,
          foodid: this.unique,
        }).then((data) => console.log(data));
      }
    },

    ratingbutton: function () {
      this.unique = localStorage.getItem("unique");
      this.value = (parseInt(this.rated) + this.rating) / 2;
      this.yourate = parseInt(this.value);
      this.rating = this.yourate;
      this.update_foodstaffs({
        id: this.id,
        like: this.like,
        rating: this.rating,
        foodid: this.unique,
      }).then((data) => console.log(data));

      document.getElementById("rating").style.backgroundColor = "yellow";
    },
    favbutton: function () {
      document.getElementById("fav").innerHTML = "FAV";
    },

    creatcomment() {
      this.unique = localStorage.getItem("unique");
      this.insert_comments({
        comment: this.comment,
        foodid: this.unique,
      }).then((data) =>
        this.getcomment({ foodid: this.unique }).then(
          (data) => (this.datas = data.data.getcomment.datas)
        )
      );
    },
    check() {
      this.message = localStorage.getItem("detail");
      if (this.message == "nodatas") {
        this.insert_foodstaffs({
          like: 0,
          rating: 0,
          foodid: this.foodid,
        }).then((data) =>
          this.detailinfo({ foodid: this.foodid }).then(
            (data) => (
              (this.index = data.data.detailinfo.datas),
              (this.like = this.index[0].like),
              (this.rating = this.index[0].rating),
              (this.id = this.index[0].id)
            )
          )
        );
      }
    },
  },

  created() {
    this.foodid = this.$route.params.foodid;
    localStorage.setItem("unique", this.foodid);
    this.title = this.$route.params.title;
    this.description = this.$route.params.description;
    this.ingridents = this.$route.params.ingridents;
    this.image_url = this.$route.params.image_url;
    this.steps = this.$route.params.steps;
    this.time = this.$route.params.time;
    this.detailinfo({ foodid: this.foodid }).then(
      (data) => (
        (this.index = data.data.detailinfo.datas),
        localStorage.setItem("detail", this.index),
        (this.like = this.index[0].like),
        (this.rating = this.index[0].rating),
        (this.id = this.index[0].id)
      )
    );
    this.getcomment({ foodid: this.foodid }).then(
      (data) => (this.datas = data.data.getcomment.datas)
    );

    this.check();
  },

  setup() {
    const foodid = ref("en");
    const id = ref("id");
    const like = ref("en");
    const rating = ref("en");
    const comment = ref("com");

    const { mutate: insert_comments } = useMutation(
      gql`
        mutation insert_comments($comment: String!, $foodid: String!) {
          insert_comments(objects: [{ comment: $comment, foodid: $foodid }]) {
            returning {
              comment
            }
          }
        }
      `,
      () => ({
        variables: {
          comment: comment.value,
          foodid: foodid.value,
        },
      })
    );

    const { mutate: insert_foodstaffs } = useMutation(
      gql`
        mutation insert_foodstaffs(
          $like: Int!
          $rating: Int!
          $foodid: String!
        ) {
          insert_foodstaffs(
            objects: [{ like: $like, rating: $rating, foodid: $foodid }]
          ) {
            returning {
              like
            }
          }
        }
      `,
      () => ({
        variables: {
          like: like.value,
          rating: rating.value,
          foodid: foodid.value,
        },
      })
    );

    const { mutate: update_foodstaffs } = useMutation(
      gql`
        mutation update_foodstaffs(
          $id: Int!
          $like: Int!
          $rating: Int!
          $foodid: String!
        ) {
          update_foodstaffs(
            where: { id: { _eq: $id } }

            _set: { like: $like, rating: $rating, foodid: $foodid }
          ) {
            affected_rows
            returning {
              id
              like
              rating
              foodid
            }
          }
        }
      `,
      () => ({
        variables: {
          id: id.value,
          like: like.value,
          rating: rating.value,
          foodid: foodid.value,
        },
      })
    );

    const { mutate: getcomment } = useMutation(
      gql`
        mutation getcomment($foodid: String!) {
          getcomment(foodid: $foodid) {
            datas
          }
        }
      `,
      () => ({
        variables: {
          foodid: foodid.value,
        },
      })
    );

    const { mutate: detailinfo } = useMutation(
      gql`
        mutation detailinfo($foodid: String!) {
          detailinfo(foodid: $foodid) {
            datas
          }
        }
      `,
      () => ({
        variables: {
          foodid: foodid.value,
        },
      })
    );

    return {
      update_foodstaffs,
      getcomment,
      insert_comments,
      insert_foodstaffs,
      detailinfo,
    };
  },
};
</script>
<style scoped></style>
