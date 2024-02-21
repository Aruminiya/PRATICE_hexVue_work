<script>
export default {
  props: { isLoading: { type: Boolean, default: true } },
};
</script>

<template>
  <div
    v-if="isLoading"
    class="loaderContainer d-flex justify-content-center align-items-center"
  >
    <div class="loaderBG"></div>
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.loaderContainer {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.loaderBG {
  z-index: 9;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.loader {
  position: relative;
  z-index: 10;
  width: 48px;
  height: 48px;
  border: 5px solid #505050;
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
