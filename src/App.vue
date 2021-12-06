<template>
  <Header @update:menu="updateMenu" />
  <router-view />
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "app",
  components: {
    Header,
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
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  min-height: 57em;
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
.m-0 {
  margin: 0;
}
.p-2 {
  padding: 1rem;
}
.px-2 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.relative {
  position: relative;
}
</style>
