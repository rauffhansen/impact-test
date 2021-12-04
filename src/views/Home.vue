<template>
  <section class="b-container">
    <h1 class="display-4 fw-bold title px-2">Beerlection</h1>
    <BeerList />
  </section>
</template>

<script>
//import Filters from "./Filters.vue";
import BeerList from "../components/BeerList.vue";
export default {
  name: "home",
  components: {
    BeerList,
  },
};
</script>
<style lang="scss" scoped>
.title {
  padding: 0rem 2rem;
}
</style>
