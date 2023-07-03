<template>
  <div style="margin: 0">
    <TextsCategoryTab
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
      <TextsLeftSide class="hideSides" />
      <!-- <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="300"
      > -->
      <TextsMiddle />
      <!-- </transition> -->
      <TextsRightSide class="hideSides" />
    </div>
  </div>
</template>

//
<script>
import TextsCategoryTab from "../components/Texts Page/TextsCategoryTab.vue";

import TextsLeftSide from "../components/Texts Page/TextsLeftSide.vue";
import TextsMiddle from "../components/Texts Page/TextsMiddle.vue";
import TextsRightSide from "../components/Texts Page/TextsRightSide.vue";
export default {
  components: { TextsLeftSide, TextsMiddle, TextsRightSide, TextsCategoryTab },
  data() {
    return {};
  },
  methods: {
    track() {
      this.$gtag.pageview({
        page_path: "/texts",
      });
    },
  },
  mounted() {},
};
</script>

<style>
.photos__page {
  padding: 1rem 0;
  width: 90%;
  margin: 0.5rem auto 0 auto;
  /* display: flex; */
  display: grid;
  grid-template-columns: 20% auto 25%;
  gap: 1.5rem;
  align-items: flex-start;
  position: relative;
}

@media screen and (max-width: 769px) {
  .photos__page {
    gap: 1.4rem;
  }
}

@media screen and (max-width: 650px) {
  .photos__page {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 94%;
    margin-top: 2rem;
  }
  .hideSides {
    display: none;
  }
}

/* @media screen and (max-width: 480px) {
  .photos__page {
    grid-template-columns: auto;
    width: 96%;
    gap: 0.5rem;
  }

  .hideSides {
    display: none;
  }
} */
</style>
