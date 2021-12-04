<template>
  <aside>
    <nav id="nav" :class="{ active: active }">
      <router-link to="/">Home</router-link>
      <router-link to="/beerlection">Beerlection</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Nav",
  props: { active: Boolean },
};
</script>
<style lang="scss" scoped>
nav {
  position: fixed;
  inset: 0 auto 0 -100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--beer);
  padding: 2rem 2rem;
  margin-top: 6rem;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

nav.active {
  inset: 0 auto 0 0;
  transition: left 0.3s ease-in-out;
}

a {
  text-decoration: none;
  font-size: 3rem;
  color: #333;
}
</style>
