<script>
export default {};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <RouterLink to="/" class="navbar-brand" href="#">首頁</RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <RouterLink to="/week1" class="nav-item nav-link active" href="#"
          >Week1</RouterLink
        >
        <RouterLink to="/week2" class="nav-item nav-link active" href="#"
          >Week2</RouterLink
        >
        <RouterLink to="/week3" class="nav-item nav-link active" href="#"
          >Week3</RouterLink
        ><RouterLink to="/week4" class="nav-item nav-link active" href="#"
          >Week4</RouterLink
        ><RouterLink to="/week5" class="nav-item nav-link active" href="#"
          >Week5</RouterLink
        ><RouterLink to="/week6" class="nav-item nav-link active" href="#"
          >Week6</RouterLink
        ><RouterLink to="/week7" class="nav-item nav-link active" href="#"
          >Week7</RouterLink
        ><RouterLink to="/week8" class="nav-item nav-link active" href="#"
          >Week8</RouterLink
        >
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;200;300;400;500;600;700;800&display=swap");
.vuelogo {
  width: 80px;
}
body {
  font-family: "Noto Sans TC", sans-serif;
}
</style>
