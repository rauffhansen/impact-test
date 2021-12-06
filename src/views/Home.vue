<template>
  <section class="b-container">
    <h1 class="title px-2 m-0">
      Beerlection
      <span class="collection" v-if="beerlection.length > 0">
        Collection ({{ beerlection.length }})
      </span>
    </h1>

    <BeerList @addBeer:BeerList="addToBeerlection" />
  </section>
</template>

<script>
import BeerList from "../components/BeerList.vue";
export default {
  name: "home",
  components: {
    BeerList,
  },
  data() {
    return {
      beerlection: [],
    };
  },
  methods: {
    addToBeerlection(val) {
      if (this.beerlection.filter((x) => x.id === val.id).length > 0) {
        console.log("Already in collection");
      } else {
        this.beerlection.push(val);
        localStorage.setItem("beerlection", JSON.stringify(this.beerlection));
      }
    },
  },
  mounted() {
    if (localStorage.getItem("beerlection") !== null)
      this.beerlection = JSON.parse(localStorage.getItem("beerlection"));
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  font-size: clamp(2rem, 4vw, 4rem);
}
.collection {
  font-size: 2rem;
}
</style>
