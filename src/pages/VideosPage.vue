<template>
  <div style="margin: 0">
    <VideosCategoryTab
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
      <VideosLeftSide class="hideSides" />
      <VideosMiddle />
      <VideosRightSide class="hideSides" />
    </div>
  </div>
</template>

//
<script>
import VideosCategoryTab from "../components/Videos Page/VideosCategoryTab.vue";

import VideosLeftSide from "../components/Videos Page/VideosLeftSide.vue";
import VideosMiddle from "../components/Videos Page/VideosMiddle.vue";
import VideosRightSide from "../components/Videos Page/VideosRightSide.vue";
export default {
  components: {
    VideosLeftSide,
    VideosMiddle,
    VideosRightSide,
    VideosCategoryTab,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.photos__page {
  padding: 1rem 0;
  width: 86%;
  margin: 1rem auto 0 auto;
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

/* @media screen and (max-width: 480px) {
  .photos__page {
    grid-template-columns: auto;
    width: 92%;
    gap: 1.2rem;
  }
} */

@media screen and (max-width: 480px) {
  .photos__page {
    grid-template-columns: auto;
    width: 96%;
    gap: 0.5rem;
  }

  .hideVideosLeftSide {
    display: none;
  }
}
</style>
