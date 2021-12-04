<template>
  <header>
    <button class="burger" :class="{ active: active }" @click="toggleMenu()">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <h1 class="title">Beer me</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  emits: ["update:menu"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggleMenu() {
      this.active = !this.active;
      this.$emit("update:menu", this.active);
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes topbar {
  0% {
    margin-bottom: 5px;
  }
  75% {
    margin-bottom: -3px;
  }
  100% {
    transform: rotate(45deg);
    margin-bottom: 0px;
  }
}
@keyframes middlebar {
  0% {
    margin-bottom: 5px;
    height: 2px;
  }
  25% {
    margin-bottom: 0px;
    height: 0;
  }
  100% {
    margin-bottom: 0px;
    height: 0;
  }
}
@keyframes bottombar {
  0% {
  }
  75% {
  }
  100% {
    transform: rotate(-45deg);
  }
}
header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  flex: 1;
}

.burger {
  outline: none;
  background-color: #fff;
  border: none;
  padding: 0;
  margin: 0;
  width: 2rem;
  height: 1.1rem;
  text-align: right;

  span {
    display: block;
    height: 2px;
    border-radius: 50px;
    width: 1.3rem;
    background-color: #b6b6b6;
    text-align: right;
    float: right;
  }

  span:nth-child(1) {
    margin-bottom: 5px;
  }
  span:nth-child(2) {
    margin-bottom: 5px;
    width: 2rem;
  }
  span:nth-child(3) {
  }
}

.burger.active {
  span:nth-child(1) {
    margin-bottom: 5px;
    animation: topbar 0.2s ease-in-out forwards;
  }
  span:nth-child(2) {
    margin-bottom: 5px;
    animation: middlebar 0.2s ease-in-out forwards;
    width: 2rem;
  }
  span:nth-child(3) {
    animation: bottombar 0.2s ease-in-out forwards;
  }
}

.title {
  padding-left: 2rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  color: #cecece;
  margin: 0;
}

img {
  width: 50px;
  flex-basis: 5px;
}
</style>
