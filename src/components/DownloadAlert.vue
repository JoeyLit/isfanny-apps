<template>
  <div class="alert error">
    <input type="checkbox" id="alert1" />
    <label class="close" title="close" for="alert1">
      <!-- <i class="uil uil-times"></i> -->
    </label>
    <p class="inner">Downloading!</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  font-size: 0.7rem;
}
.alert .inner {
  padding: 6px;
  margin: 6px;
  border-radius: 3px;
  /* border: 1px solid rgb(180, 180, 180); */
  background-color: rgb(212, 212, 212);
  border-radius: 8px;
  text-align: center;
}

.alert .close {
  float: right;
  margin: 3px 12px 0px 0px;
  cursor: pointer;
}

.alert .inner,
.alert .close {
  color: rgb(88, 88, 88);
}

.alert input {
  display: none;
}

.alert input:checked ~ * {
  animation-name: dismiss, hide;
  animation-duration: 300ms;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: 0s, 100ms;
}

.alert.error .inner {
  /* border: 1px solid var(--color-primary); */
  /* background-color: rgb(242, 222, 222); */
  /* background-color: var(--color-light); */
  background: linear-gradient(
    to right,
    transparent,
    var(--color-light),
    transparent
  );
}

.alert.error .inner,
.alert.error .close {
  /* color: rgb(185, 74, 72); */
  color: var(--color-primary);
}

@keyframes dismiss {
  0% {
    opacity: 1;
  }
  90%,
  100% {
    opacity: 0;
    font-size: 0.1px;
    transform: scale(0);
  }
}

@keyframes hide {
  100% {
    height: 0px;
    width: 0px;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    border: 0px;
  }
}
</style>
