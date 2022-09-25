<template>
  <div style="margin: 0">
    <PhotosCategoryTab
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
      <PhotosLeftSide class="hideSides" />
      <PhotosMiddle />
      <PhotosRightSide class="hideSides" />
    </div>
  </div>
</template>

<script>
import PhotosCategoryTab from "../components/Photos Page/PhotosCategoryTab.vue";

import PhotosLeftSide from "../components/Photos Page/PhotosLeftSide.vue";
import PhotosMiddle from "../components/Photos Page/PhotosMiddle.vue";
import PhotosRightSide from "../components/Photos Page/PhotosRightSide.vue";
export default {
  components: {
    PhotosLeftSide,
    PhotosMiddle,
    PhotosRightSide,
    PhotosCategoryTab,
  },
  data() {
    return {
      memeCategory: "",
    };
  },
  methods: {
    setCategory(category) {
      this.memeCategory = category;
      // console.log(category);
    },
  },
};
</script>

<style>
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

  /* .hidePhotosLeftSide {
    display: none;
  } */
}
</style>
