<template>
  <div>
    <!-- Error alert -->
    <div>
      <ErrorAlert v-if="apiErrors === 'Failed to load text memes'" />
    </div>
    <!-- Error alert -->

    <div v-if="allTextMemes.length > 0" class="middle__container">
      <div
        class="middle__meme--item animate__animated animate__slideInUp"
        v-for="(meme, index) in allTextMemes"
        :key="meme._id"
      >
        <div class="publisher__profile" id="publisher__profile">
          <div class="left">
            <img src="../../assets/isFanny_logo_svg-22.svg" alt="" />
            <p class="text-weight-bold">isFanny</p>
            <p>
              {{ this.date.getDateDiff(new Date(), meme.createdAt, "days") }}
              days ago
            </p>
          </div>
          <div class="right">
            <p class="text-weight-bold">category:</p>
            <p>{{ meme.category }}</p>
          </div>
        </div>
        <div class="middle__meme--media"></div>
        <div class="meme__cards--item-footer">
          <p>{{ meme.description }}</p>

          <div class="meme__cards--item-footer-icons">
            <div class="like__meme">
              <i class="uil uil-eye"></i>
              <p>999+</p>
            </div>

            <div class="share__meme" @click="copyText(meme.description, index)">
              <i class="uil uil-copy"></i>
              <p>Copy</p>
            </div>
          </div>
        </div>
        <!-- <transition name="dropdown-fade"> -->
        <CopyAlert
          class="animate__animated animate__fadeInUp"
          v-if="isCopyAlertShowing && copiedTextItemIndex == index"
        />
        <!-- </transition> -->
      </div>
    </div>
    <div v-else-if="isFilteredMemes" class="middle__container">
      <div
        class="middle__meme--item animate__animated animate__slideInUp"
        v-for="(meme, index) in textFilteredMemes"
        :key="meme._id"
      >
        <div class="publisher__profile" id="publisher__profile">
          <div class="left">
            <img src="../../assets/isFanny_logo_svg-22.svg" alt="" />
            <p class="text-weight-bold">isFanny</p>
            <p>
              {{ this.date.getDateDiff(new Date(), meme.createdAt, "days") }}
              days ago
            </p>
          </div>
          <div class="right">
            <p class="text-weight-bold">category:</p>
            <p>{{ meme.category }}</p>
          </div>
        </div>
        <div class="middle__meme--media"></div>
        <div class="meme__cards--item-footer">
          <p>{{ meme.description }}</p>

          <div class="meme__cards--item-footer-icons">
            <div class="like__meme">
              <i class="uil uil-eye"></i>
              <p>999+</p>
            </div>

            <div class="share__meme" @click="copyText(meme.description, index)">
              <i class="uil uil-copy"></i>
              <p>Copy</p>
            </div>
          </div>
        </div>
        <!-- <transition name="dropdown-fade"> -->
        <CopyAlert
          class="animate__animated animate__fadeInUp"
          v-if="isCopyAlertShowing && copiedTextItemIndex == index"
        />
        <!-- </transition> -->
      </div>
    </div>
    <Loader v-else />
    <!-- <div v-else>
      <div class="middle__container">
        <div class="middle__meme--item">
          <InstagramLoader />
        </div>
        <div class="middle__meme--item">
          <InstagramLoader />
        </div>
        <div class="middle__meme--item">
          <InstagramLoader />
        </div>
        <div class="middle__meme--item">
          <InstagramLoader />
        </div>
        <div class="middle__meme--item">
          <InstagramLoader />
        </div>
        <div class="middle__meme--item">
          <InstagramLoader />
        </div>
      </div>
    </div> -->

    <LoaderIsfanny v-if="isLoadingMeme" />
    <!-- Error alert -->
    <ErrorAlert v-if="apiErrors === 'Failed to load more text memes'" />
    <!-- <Alert /> -->

    <div v-if="!isLoadingMeme">
      <div v-if="isFilteredMemes" class="load-more-btn-container">
        <!-- previous button 85 -->
        <div
          v-if="this.filter.page > 1"
          @click="loadPrevious"
          style="display: flex; justify-content: center"
        >
          <button class="button-85" role="button">
            <i class="uil uil-angle-left-b"></i>
            Previous
          </button>
        </div>
        <!-- end of previous button 85 -->
        <!-- Next button 85 -->
        <div @click="loadNext" style="display: flex; justify-content: center">
          <button class="button-85" role="button">
            Next
            <i class="uil uil-angle-right-b"></i>
          </button>
        </div>
        <!-- end of Next button 85 -->
      </div>

      <!-- button 85 -->
      <div v-else style="display: flex; justify-content: center">
        <button
          v-if="!allTextMemes.length == 0"
          @click="loadMore"
          class="button-85"
          role="button"
        >
          More memes
        </button>
      </div>
      <!-- button 85 -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import { InstagramLoader } from "vue-content-loader";
import ErrorAlert from "../ErrorAlert.vue";
import CopyAlert from "../CopyAlert.vue";

import LoaderIsfanny from "../LoaderIsfanny.vue";
import { date } from "quasar";

// import { VImg } from "vuetensils/src/components";

export default {
  // props: ["memeCategory"],
  components: { LoaderIsfanny, ErrorAlert, CopyAlert },
  metaInfo() {
    return {
      title: "Funny Texts - isFanny",
    };
  },
  data() {
    return {
      isLoadingMeme: false,
      isFilteredMemes: false,
      activateFilter: null,
      filter: { category: "", page: "", sort: "" },
      isCopyAlertShowing: false,
      copiedTextItemIndex: null,
      date: date,
    };
  },
  computed: {
    ...mapGetters([
      "allTextMemes",
      "text_pageNumber",
      "textMemesPagination",
      "_category",
      "textFilteredMemes",
      "pages",
      "getSort",
      "getSwitchToCategory",
      "allSwitchedToCategoryMemes",
      "apiErrors",
    ]),
    cat() {
      return this._category;
    },
    paging() {
      return this.pages;
    },
    sorting() {
      return this.getSort;
    },
    // apiErrors() {
    //   return this.apiErrors;
    // },
  },
  methods: {
    ...mapActions([
      "fetchAllTextMemes",
      "fetchMoreTextMemes",
      "setTextFilteredURL",
      "nextPage",
      "previousPage",
      "clearTextsMemes",
      "clearTextsPageNumber",
    ]),
    async loadMore() {
      // this.nextPage(this.paging + 1);
      let page = this.text_pageNumber + 1;
      let meta = {
        page,
        // sort: "-createdAt",
        filter: this.filter,
        // type: "text",
        category: this._category,
      };
      this.isLoadingMeme = true;
      await this.fetchMoreTextMemes(meta);
      this.isLoadingMeme = false;
      // track events for google analytics
      this.$gtag.event("load_more_text", {
        event_category: "Texts",
        event_label: "next_button_clicked",
        event_value: 1,
      });
    },
    loadNext() {
      this.nextPage(this.paging + 1);
    },
    loadPrevious() {
      if (this.paging === 1) {
        return;
      } else {
        this.previousPage(this.paging - 1);
      }
    },
    copyText(description, index) {
      this.isCopyAlertShowing = true;
      this.copiedTextItemIndex = index;
      navigator.clipboard.writeText(
        `${description}. visit www.isfanny.com for more memes`
      );
      setTimeout(() => {
        this.isCopyAlertShowing = false;
      }, 3000);

      // track events for google analytics
      this.$gtag.event("copy_text", {
        event_category: "Texts",
        event_label: "copied_text_to_clipboard",
        event_value: 1,
      });
    },
  },
  async created() {
    if (this.allTextMemes.length === 0) {
      await this.fetchAllTextMemes();
    }
  },
  mounted() {
    console.log(this._category);
    console.log(this.pages);
  },
  watch: {
    cat(newValue) {
      this.activateFilter = true;
      if (this.activateFilter === true) {
        this.clearTextsPageNumber();

        this.filter.category = newValue;
        this.setTextFilteredURL(this.filter);
        this.isFilteredMemes = true;
        document.documentElement.scrollTop = 0;
      } else {
        this.activateFilter = false;
      }
    },
    paging(newValue) {
      this.activateFilter = true;
      if (this.activateFilter === true) {
        this.clearTextsPageNumber();

        this.filter.page = newValue;
        this.setTextFilteredURL(this.filter);
        this.isFilteredMemes = true;
        document.documentElement.scrollTop = 0;
      } else {
        this.activateFilter = false;
      }
    },
    async sorting(newValue) {
      if (this.activateFilter === true) {
        console.log("active user activated");
        this.clearTextsPageNumber();

        this.filter.sort = newValue;
        this.setTextFilteredURL(this.filter);
        this.isFilteredMemes = true;
        document.documentElement.scrollTop = 0;
      } else {
        console.log("active user NOT activated");

        this.filter.sort = newValue;
        this.clearTextsMemes();
        this.clearTextsPageNumber();
        this.setTextFilteredURL(this.filter);
        this.isFilteredMemes = true;
        // document.documentElement.scrollTop = 0;
        await this.loadMore();
      }
    },
  },
};
</script>

<style scoped>
.middle__container .middle__meme--item {
  background-color: var(--color-white);
  padding: 0.7rem 0.2rem;
  border-radius: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid rgba(128, 128, 128, 0.164);
  /* box-shadow: 0 2px 5px rgba(34, 21, 21, 0.486); */
}

.middle__container .publisher__profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0 0.7rem;
}

.middle__container .publisher__profile .left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.middle__container .publisher__profile .right {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.publisher__profile img {
  border-radius: 50%;
  width: 100%;
  width: 1.5rem;
  height: 1.5rem;
  object-fit: cover;
}

.middle__container .publisher__profile p {
  font-size: 0.7rem;
  /* color: var(--color-dark); */
}

.middle__container .middle__meme--media {
  width: 100%;
  margin-top: 0.6rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
}

.middle__container .middle__meme--media img {
  border-radius: 1.5rem 1.5rem 0 0;
}

/* text meme description */

.meme-details__description {
  /* width: 70%; */
  margin: 0.5rem auto 0 auto;
  /* padding: 1rem; */
}

.meme-details__description p {
  /* margin-top: 1rem; */
  padding: 0 0.5rem;
}

.middle__meme--item .meme__cards--item-footer {
  padding: 0.7rem 1rem;
  /* background-color: var(--color-dark); */
  background-color: var(--color-white);
  /* background: linear-gradient(transparent, rgba(114, 114, 114, 0.225)); */
  border-radius: 0 0 1rem 1rem;
}

.middle__meme--item .meme__cards--item-footer p {
  font-size: 0.9rem;
  color: var(--color-black);
}

.middle__meme--item .meme__cards--item-footer-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.middle__meme--item .meme__cards--item-footer-icons div a,
.middle__meme--item .meme__cards--item-footer-icons div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-dark);
}

.middle__meme--item .meme__cards--item-footer-icons div p {
  font-size: 0.9rem;
}

.middle__meme--item .meme__cards--item-footer-icons .share__meme {
  cursor: pointer;
}
.middle__meme--item .meme__cards--item-footer-icons .share__meme p:hover,
.middle__meme--item .meme__cards--item-footer-icons .share__meme i:hover {
  color: var(--color-primary);
}

.load-more-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.load-more-btn i {
  display: inline-block;
}

.load-more-btn {
  margin: 0 0 3rem 0;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 1rem 0.5rem;
  /* box-shadow: 0 2px 3px black; */
  border-radius: 1rem;
  width: 10rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}

.load-more-btn button {
  background-color: transparent;
  color: var(--color-light);
  font-size: 1.1rem;
}

/* button */

.button-85 {
  margin: 1.5rem;
  padding: 0.6em 2em;
  border: none;
  outline: none;
  /* color: rgb(255, 255, 255); */
  color: var(--color-dark);
  /* background: #111; */
  background: var(--color-white);
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: 1px 2px 2px black;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: #222; */
  background: var(--color-light);

  left: 0;
  top: 0;
  border-radius: 10px;
}

/* end of button */

/* dropdown transition */
.dropdown-fade-enter-active {
  transition: all 0.1s ease-out;
}

.dropdown-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* end of dropdown transition */

@media screen and (max-width: 850px) {
}

@media screen and (max-width: 769px) {
  .middle__container .middle__meme--item {
    /* border-radius: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem; */
  }
}

@media screen and (max-width: 650px) {
  .middle__container .middle__meme--item {
    /* padding: 0.5rem; */
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .middle__container .middle__meme--item {
    /* border-radius: 1.2rem; */
  }

  .middle__container .middle__meme--media img {
    /* border-radius: 1.2rem; */
  }

  /* show breadcrumbs on mobile devices */
  .breadcrumbs {
    display: flex;
    justify-content: center;
  }
}
</style>
