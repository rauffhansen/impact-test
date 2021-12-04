<template>
  <Header @update:menu="updateMenu" />
  <!-- <Nav :active="toggleMenu" /> -->
  <router-view />
</template>

<script>
import Header from "./components/Header.vue";
// import Nav from "./components/Nav.vue";
export default {
  name: "app",
  components: {
    Header,
    // Nav,
  },
  data() {
    return {
      toggleMenu: false,
    };
  },
  methods: {
    updateMenu(val) {
      this.toggleMenu = val;
    },
  },
};
</script>

<style lang="scss">
:root {
  --beer: #fec601;
  --beer-dark: #dc8400;
}
*,
::after,
::before {
  box-sizing: border-box;
}
#app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}

.lead {
  color: #fff;
  text-align: center;
  margin-top: 0.5rem;
}

.b-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
}

.b-container {
  max-width: 90em;
  margin: 0 auto;
}

.b-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
  pointer-events: none;
  backdrop-filter: blur(2px);
}
</style>
