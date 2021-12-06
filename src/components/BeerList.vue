/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <section class="">
    <div class="b-grid p-2 relative">
      <template v-for="post of data" :key="post.id">
        <Beer
          :item="post"
          @init:details="initializeDetails"
          @addBeer:details="addToBeerlection"
        />
      </template>
      <div class="loading flex-center" v-if="loading">
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
    </div>
    <ul class="pagination">
      <li
        class="page px-2"
        :class="{ active: currentPage == page }"
        @click="fetchBeers(page)"
        v-for="page in pagination"
        :key="page"
      >
        {{ page }}
      </li>
    </ul>
    <BeerDetails :objitem="detailsObj" @close:details="closeDetails" />
    <p v-if="error">error</p>
  </section>
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
    addToBeerlection(val) {
      this.$emit("addBeer:BeerList", val);
    },
  },
  data() {
    return {
      isMobile: false,
      detailsObj: {},
      pagination: [1, 2, 3, 4, 5],
    };
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const currentPage = ref(null);

    const fetchBeers = (beerPage = 1) => {
      loading.value = true;

      return fetch(
        `https://api.punkapi.com/v2/beers?page=${beerPage}&per_page=10`,
        {
          method: "get",
          headers: { "content-type": "application/json" },
        }
      )
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((json) => {
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
          currentPage.value = beerPage;
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchBeers();
    });

    return {
      data,
      loading,
      error,
      currentPage,
      fetchBeers,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pagination {
  padding: 0 2rem;
  margin: 0 auto;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5em;

  .page {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--beer);
  }

  .page.active {
    background-color: #121212;
    color: #fff;
  }

  .page:hover {
    background-color: #eee;
    color: #121212;
  }
}
.loading {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
