<template>
  <section class="details" :class="{ open: objitem.open }">
    <div>
      <div
        class="close"
        @click="
          $emit('close:details', { open: false, id: '' });
          data = null;
        "
      >
        close
      </div>
    </div>
    <div v-if="data !== null">
      <h2 class="title">{{ data[0].name }}</h2>
      <p class="tagline">{{ data[0].tagline }}</p>
      <p class="age">brewed</p>
      <p class="tagline">{{ data[0].first_brewed }}</p>
      <img class="details-img" :src="data[0].image_url" alt="beer" />
      <div class="details-info"></div>
    </div>
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
  </section>
</template>
<script>
import { ref, watch } from "@vue/runtime-core";
import { backdrop } from "../modules/backdrop.ts";
export default {
  name: "BeerDetails",
  props: {
    objitem: {},
  },
  setup(props) {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    function fetchBeerDetails() {
      loading.value = true;

      return fetch(`https://api.punkapi.com/v2/beers/${props.objitem.id}`, {
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
    watch(
      () => props.objitem,
      (first, second) => {
        if (Object.keys(props.objitem).length > 0) {
          fetchBeerDetails();
          backdrop(true);
        } else {
          backdrop(false);
        }
        first, second;
      }
    );

    return {
      data,
      loading,
      error,
    };
  },
};
</script>
<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .details {
    max-width: 650px;
    inset: auto auto;
    transform: translate(-50%, 0);
  }

  .details.open {
    inset: 50% 0 0 50%;
    transform: translate(-50%, -50%);
  }
}

.details {
  position: fixed;
  inset: auto 0 -100% 50%;
  transform: translate(-50%, 0);
  background-color: var(--beer);
  padding: 2rem;
  height: 100%;
  max-height: 80%;
  width: 100%;
  border-radius: 1rem;
  z-index: 1;
  transition: transform 0.2s ease-in-out;
}
.details.open {
  inset: 50% 0 0 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 20px -2px rgba(0, 0, 0, 0.3);
}
.close {
  font-weight: 700;
  text-align: right;
}
.details-img {
  height: 300px;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}
.title {
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  margin: 0;
}
.tagline {
  color: #daa700;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem;
}
.age {
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
}
.details-info {
  background-color: #fff;
  border-radius: 1rem;
  width: 100%;
  position: absolute;
  inset: auto 0 0 0;
  height: 45%;
  z-index: -1;
}
</style>
