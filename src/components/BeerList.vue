/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <section>
    <div class="b-grid p-2">
      <template v-for="post of data" :key="post.id">
        <Beer :item="post" @init:details="initializeDetails" />
      </template>
    </div>
    <BeerDetails :objitem="detailsObj" @close:details="closeDetails" />
  </section>
  <div v-if="loading">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; display: block"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#e6ad06"
        stroke-width="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#000000"
        stroke-width="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
      </circle>
    </svg>
  </div>
  <p v-if="error">error</p>
</template>

<script>
import { ref, onMounted } from "@vue/runtime-core";
import Beer from "./Beer.vue";
import BeerDetails from "./Details.vue";

export default {
  name: "BeerList",
  components: {
    Beer,
    BeerDetails,
  },
  methods: {
    initializeDetails(val) {
      this.detailsObj = val;
    },
    closeDetails() {
      this.detailsObj = {};
    },
  },
  data() {
    return {
      isMobile: false,
      detailsObj: {},
    };
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    function fetchBeers() {
      loading.value = true;

      return fetch("https://api.punkapi.com/v2/beers?page=2&per_page=10", {
        method: "get",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          data.value = json;
        })
        .catch((err) => {
          error.value = err;
          if (err.json) {
            return err.json.then((json) => {
              console.log(json);
              error.value.message = json;
            });
          }
        })
        .then(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      fetchBeers();
    });

    return {
      data,
      loading,
      error,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
