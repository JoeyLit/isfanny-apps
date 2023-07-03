<template>
  <div style="margin: 0">
    <GifsCategoryTab
      v-if="$q.screen.lt.sm"
      style="
        position: fixed;
        top: 3rem;
        background-color: var(--color-white);
        z-index: 4;
        outline: 2px solid var(--color-light);
      "
    />
    <div class="photos__page">
      <GifsLeftSide class="hideSides" />

      <GifsMiddle />
      <GifsRightSide class="hideSides" />
    </div>
  </div>
</template>

//
<script>
import GifsCategoryTab from "../components/Gifs Page/GifsCategoryTab.vue";

import GifsLeftSide from "../components/Gifs Page/GifsLeftSide.vue";
import GifsMiddle from "../components/Gifs Page/GifsMiddle.vue";
import GifsRightSide from "../components/Gifs Page/GifsRightSide.vue";
export default {
  components: { GifsLeftSide, GifsMiddle, GifsRightSide, GifsCategoryTab },
  data() {
    return {};
  },
};
</script>

<style>
.photos__page {
  padding: 1rem 0;
  width: 86%;
  margin: 0.5rem auto 0 auto;
  /* display: flex; */
  display: grid;
  grid-template-columns: 20% auto 25%;
  gap: 2rem;
  align-items: flex-start;
  position: relative;
}

@media screen and (max-width: 769px) {
  .photos__page {
    gap: 1.6rem;
  }
}

@media screen and (max-width: 650px) {
  .photos__page {
    grid-template-columns: 1fr;
    gap: 1.4rem;
    width: 90%;
    margin-top: 2rem;
  }

  .hideSides {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .photos__page {
    grid-template-columns: auto;
    width: 96%;
    gap: 0.5rem;
  }

  /* .hideGifsLeftSide {
    display: none;
  } */
}
</style>
