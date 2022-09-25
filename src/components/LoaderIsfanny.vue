<template>
  <!--Inifinite Scroll loader -->
  <div class="loader">
    <!-- <img class="circle" src="../assets/isfanny-smile-logo.png" alt="" srcset="">
  <img class="circle" src="../assets/isfanny-smile-logo.png" alt="" srcset="">
  <img class="circle" src="../assets/isfanny-smile-logo.png" alt="" srcset=""> -->
    <div class="circle">
      <img class="circle" src="../assets/isfanny-smile-logo.png" alt="" />
    </div>
    <div class="circle">
      <img class="circle" src="../assets/isfanny-smile-logo.png" alt="" />
    </div>
    <div class="circle">
      <img class="circle" src="../assets/isfanny-smile-logo.png" alt="" />
    </div>
  </div>
  <!-- <div class="circle"></div>
    <div class="circle"></div> -->
</template>

<style scoped>
img {
  /* width: 20px; */
}
.loader {
  /* opacity: 0; */
  display: flex;

  /* bottom: 50px; */
  transition: opacity 0.3s ease-in;
  -webkit-transition: opacity 0.3s ease-in;
  -moz-transition: opacity 0.3s ease-in;
  -o-transition: opacity 0.3s ease-in;
  justify-content: center;
  /* margin: 70px 0; */
  margin: 1.5rem 0;
}

/* .loader.show {
  opacity: 1;
} */

.circle {
  /* background-color: var(--color-primary); */
  width: 30px;
  /* height: 20px; */
  border-radius: 50%;
  margin: 5px;
  animation: bounce 0.5s ease-in infinite;
  -webkit-animation: bounce 0.5s ease-in infinite;
  -moz-animation: bounce 0.5s ease-in infinite;
  -o-animation: bounce 0.5s ease-in infinite;
}

.circle:nth-of-type(2) {
  animation-delay: 0.1s;
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -o-animation-delay: 0.1s;
}

.circle:nth-of-type(3) {
  animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -o-transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    -o-transform: translateY(-10px);
  }
}

/* loader section --*/
</style>
