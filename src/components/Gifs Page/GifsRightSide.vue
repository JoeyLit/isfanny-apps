<template>
  <div class="right-side__container">
    <div class="page-title">
      <p class="text-weight-bold">Categories</p>
    </div>
    <div class="right-side__category">
      <div
        data-category="all"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-grids"></i>
        <p>All</p>
      </div>
      <div
        data-category="education"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-book-open"></i>
        <p>Education</p>
      </div>
      <div
        data-category="music"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-music"></i>
        <p>Music & Dance</p>
      </div>
      <div
        data-category="movies"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-film"></i>
        <p>Movies & TV</p>
      </div>
      <div
        data-category="love"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-heart"></i>
        <p>Love & Romance</p>
      </div>
      <div
        data-category="sports"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-basketball"></i>
        <p>Sports</p>
      </div>
      <div
        data-category="comedy"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-laughing"></i>
        <p>Comedy</p>
      </div>
      <div
        data-category="technology"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-robot"></i>
        <p>Science & Technology</p>
      </div>
      <div
        data-category="animals"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-cloud-sun"></i>
        <p>Animals & Nature</p>
      </div>
      <div
        data-category="politics"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-balance-scale"></i>
        <p>Politics</p>
      </div>
      <div
        data-category="celebrities"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-user-check"></i>
        <p>Celebrities</p>
      </div>
      <div
        data-category="religion"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-yin-yang"></i>
        <p>Culture & Religion</p>
      </div>
      <div
        data-category="fails"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-times-circle"></i>
        <p>Fails</p>
      </div>
      <div
        data-category="kids"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-baby-carriage"></i>
        <p>Kids & Teens</p>
      </div>
      <div
        data-category="adult"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-18-plus"></i>
        <p>Adult</p>
      </div>
      <div
        data-category="social"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-comments"></i>
        <p>Social</p>
      </div>
      <div
        data-category="food"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-pizza-slice"></i>
        <p>Food</p>
      </div>
      <div
        data-category="other"
        @click="findMemeCategory"
        class="right-side__category-item"
      >
        <i class="uil uil-folder-question"></i>
        <p>Others</p>
      </div>
    </div>
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
      // "fetchAllPhotoMemes",
      // "fetchMorePhotoMemes",
      "fetchCategory",
      "clearGifsMemes",
      "clearPage",
      "gifSwitchToCategory",
    ]),

    findMemeCategory(e) {
      const event = e.currentTarget;
      const element = document.querySelectorAll(".right-side__category-item");
      console.log(event.classList);
      for (let i = 0; i < element.length; i++) {
        element[i].style.backgroundColor = "var(--color-white)";
        element[i].style.color = "var(--color-dark)";
        element[i].classList.remove("active");
        element[0].style.borderRadius = "1.5rem 1.5rem 0 0";
        element[17].style.borderRadius = "0 0 1.5rem 1.5rem";
      }
      event.style.backgroundColor = "var(--color-light)";
      event.style.color = "var(--color-primary)";
      event.classList.add("active");

      const dataCategory = event.getAttribute("data-category");
      console.log(dataCategory);

      this.clearGifsMemes();
      this.gifSwitchToCategory(true);
      this.clearPage();
      this.fetchCategory(dataCategory);
    },
    mounted() {},
  },
};
</script>

<style scoped>
.right-side__container {
  position: sticky;
  top: 4rem;
}

.right-side__container .page-title {
  text-align: center;
  /* width: 70%; */
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border-radius: 1.5rem;
  background-color: var(--color-white);
  border: 2px solid rgba(128, 128, 128, 0.164);
}

.right-side__category {
  /* margin: 1rem 0; */

  border-radius: 1.5rem;
  margin-top: 1rem;
  background-color: var(--color-white);
  border: 2px solid rgba(128, 128, 128, 0.164);
  height: 70vh;
  overflow-y: scroll;
}

.right-side__category::-webkit-scrollbar-thumb {
  background: linear-gradient(transparent, blue, transparent);
  /* border: 2px solid #f1f1f180; */
  border: none;
}

.right-side__category::-webkit-scrollbar {
  width: 2px;
  background-color: transparent;
}

.right-side__category-item {
  display: flex;
  gap: 1.5rem;
  /* padding: 0.5rem 1.5rem; */
  padding: 0.4rem 1rem;
}

.right-side__category-item.active {
  position: relative;
}

.right-side__category-item.active::after {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  background-color: var(--color-primary);
}

/* .right-side__category-item.active {
  background-color: red !important;
} */

.right-side__category-item:nth-child(1) {
  padding-top: 1rem;
  /* background-color: red; */
}

.right-side__category-item:nth-child(18) {
  padding-bottom: 1rem;
  /* background-color: red; */
}

.right-side__category-item:hover {
  background-color: var(--color-light);
  cursor: pointer;
}

.left-side__category-item:nth-child(5):hover {
  border-radius: 0 0 1.5rem 1.5rem;
}

@media screen and (max-width: 850px) {
  .right-side__category-item {
    gap: 1rem;
  }
}

@media screen and (max-width: 769px) {
  .right-side__container .page-title {
    border-radius: 1rem;
  }
}

@media screen and (max-width: 650px) {
  .right-side__container {
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }

  .right-side__container {
    position: relative;
    min-width: 250px;
    max-width: 95%;
    top: 0.6rem;
  }

  .right-side__container .page-title {
    width: 100%;
  }

  .right-side__category {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
}
</style>
