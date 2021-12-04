<template>
  <footer>
    <p class="m-0">@That other beer company</p>
  </footer>
</template>

<script>
//import Filters from "./Filters.vue";
//import BeerList from "./BeerList.vue";
export default {
  name: "Footer",
  components: {},
};
</script>
<style lang="scss" scoped>
footer {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  justify-content: flex-start;
  padding: 1rem 1rem;
  border-top: 1px solid #ececec;
}
</style>
