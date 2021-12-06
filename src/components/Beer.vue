<template>
  <div class="relative">
    <div @click="initDetails()" class="beer">
      <h4 class="name">{{ item.name }}</h4>
      <img :src="item.image_url" alt="beer" />
      <p class="lead">Brewed: {{ item.first_brewed }}</p>
    </div>
    <button class="addBtn flex-center" @click="addBeer()">Add</button>
  </div>
</template>
<script>
//import { } from "@vue/runtime-core";
export default {
  props: {
    item: {},
  },
  emits: ["init:details"],
  methods: {
    initDetails() {
      this.$emit("init:details", { open: true, id: this.item.id });
    },
    addBeer() {
      this.$emit("addBeer:details", this.item);
    },
  },
};
</script>
<style lang="scss" scoped>
.name {
  color: #fff;
  text-shadow: 0px 1px 1px rgba(37, 37, 37, 0.4);
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 700;
}

.beer {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  width: 100%;
  height: 100%;
  background-color: var(--beer);
  flex-basis: clamp(200px, 6vw, 400px);
  cursor: pointer;
  transition: transform 0.1s ease-in-out, background-color 0.1s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.beer:hover {
  transform: scale(1.04);
  background-color: rgb(219, 150, 0);
  box-shadow: 1px 1px 20px -2px rgba(0, 0, 0, 0.3);
}

img {
  max-width: 100%;
  height: clamp(10em, 20vw, 15em);
  align-self: center;
  padding: 1rem;
}

.addBtn {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  padding: 1rem;
  font-size: 1rem;
  background-color: #121212;
  color: #fff;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  z-index: 1;
  cursor: pointer;
}

.addBtn:hover {
  background-color: rgb(255, 255, 255);
  color: #121212;
  box-shadow: 1px 1px 20px -2px rgba(0, 0, 0, 0.3);
}
</style>
