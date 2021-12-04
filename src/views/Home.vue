<template>
  <section class="b-container">
    <h1 class="title px-2">Beerlection</h1>
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
  font-size: clamp(2rem, 4vw, 4rem);
}
</style>
