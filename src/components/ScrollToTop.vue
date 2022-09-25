<template>
  <div class="scroll-to-top-Btn">
    <i class="uil uil-arrow-up"></i>
  </div>
</template>

<style scoped>
.scroll-to-top-Btn {
  position: fixed;
  top: 85%;
  right: 3%;
  opacity: 0;
  /* transition: opacity 0.5s ease-in; */
  z-index: 99;
  color: var(--color-light);
  cursor: pointer;

  animation: bounce 1.5s ease-in infinite;
  -webkit-animation: bounce 1.5s ease-in infinite;
  -moz-animation: bounce 1.5s ease-in infinite;
  -o-animation: bounce 1.5s ease-in infinite;

  background-color: var(--color-primary);
  padding: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.801);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

@media screen and (max-width: 769px) {
  .scroll-to-top-Btn {
    right: 2%;
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .scroll-to-top-Btn {
    right: 1%;
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
  }
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
</style>
