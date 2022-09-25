<template>
  <div style="width: 100vw">
    <q-tabs
      indicator-color="blue-9"
      dense
      no-caps
      inline-label
      class="q-ma-none"
      style=""
    >
      <q-tab>
        <div
          data-category="all"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-grids"></i>
          <p>All</p>
        </div>
      </q-tab>
      <q-tab>
        <div
          data-category="education"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-book-open"></i>
          <p>Education</p>
        </div>
      </q-tab>

      <q-tab
        ><div
          data-category="music"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-music"></i>
          <p>Music & Dance</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="movies"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-film"></i>
          <p>Movies & TV</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="love"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-heart"></i>
          <p>Love & Romance</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="sports"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-basketball"></i>
          <p>Sports</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="comedy"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-laughing"></i>
          <p>Comedy</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="technology"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-robot"></i>
          <p>Science & Technology</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="animals"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-cloud-sun"></i>
          <p>Animals & Nature</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="politics"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-balance-scale"></i>
          <p>Politics</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="celebrities"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-user-check"></i>
          <p>Celebrities</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="religion"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-yin-yang"></i>
          <p>Culture & Religion</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="fails"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-times-circle"></i>
          <p>Fails</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="kids"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-baby-carriage"></i>
          <p>Kids & Teens</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="adult"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-18-plus"></i>
          <p>Adult</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="social"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-comments"></i>
          <p>Social</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="food"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-pizza-slice"></i>
          <p>Food</p>
        </div></q-tab
      >
      <q-tab
        ><div
          data-category="other"
          @click="findMemeCategory"
          class="right-side__category-item"
        >
          <i class="uil uil-folder-question"></i>
          <p>Others</p>
        </div></q-tab
      >
    </q-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSwitchToCategory"]),
  },
  methods: {
    ...mapActions([
      "fetchCategory",
      "clearVideosMemes",
      "clearPage",
      "videoSwitchToCategory",
    ]),

    findMemeCategory(e) {
      const event = e.currentTarget;
      const element = document.querySelectorAll(".right-side__category-item");

      const dataCategory = event.getAttribute("data-category");
      console.log(dataCategory);

      this.clearVideosMemes();
      this.videoSwitchToCategory(true);
      this.clearPage();
      this.fetchCategory(dataCategory);
    },
    mounted() {},
  },
};
</script>

<style scoped>
.right-side__category-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.2rem 0;
  margin: 0;
}
</style>
