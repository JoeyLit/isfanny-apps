<template>
  <div>
    <!-- Error alert -->
    <div>
      <Alert v-if="apiErrors === 'Failed to load video memes'" />
    </div>
    <!-- Error alert -->
    <div v-if="allVideoMemes.length > 0" class="middle__container">
      <div class="meme__cards">
        <div
          v-for="(meme, index) in allVideoMemes"
          :key="meme._id"
          class="meme__cards--item animate__animated animate__slideInUp"
        >
          <div class="meme__cards--item-media">
            <VIntersect :threshold="0.5" @enter="vEnter()" @exit="vExit()">
              <template #default="entry">
                <div
                  class="intersection-content"
                  :style="{
                    background: entry.isIntersecting ? 'black' : 'black',
                  }"
                >
                  <div v-if="vHasEntered">
                    <video
                      width="400"
                      height="400"
                      controls
                      :src="meme.imageURL"
                      autoplay
                      loop
                      :alt="meme.description"
                      poster="../../assets/isfanny_text_black_bg-01.svg"
                      class="videoSrc"
                    />
                  </div>
                  <div v-show="!vHasEntered">
                    <video
                      width="400"
                      height="400"
                      src="../../assets/isfanny-play.mp4"
                      :alt="meme.description"
                    />
                  </div>
                </div>
              </template>
            </VIntersect>
          </div>

          <div class="meme__cards--item-footer">
            <p>{{ meme.description }}</p>
            <div class="meme__cards--item-footer-icons">
              <div class="like__meme">
                <i class="uil uil-eye"></i>
                <p>999+</p>
              </div>

              <!-- <div class="share__meme">
                <i class="uil uil-share"></i>
                <p>Share</p>
              </div> -->
              <div class="download__meme">
                <a
                  @click="downloadMedia(index)"
                  :href="`https://res.cloudinary.com/mememe/video/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${meme._id}/${meme.public_id}.${meme.media_details.format}`"
                  download
                >
                  <i class="uil uil-download-alt"></i>
                  <p>Download</p>
                </a>
              </div>
            </div>
            <!-- <transition name="dropdown-fade"> -->
            <DownloadAlert
              class="animate__animated animate__fadeInUp"
              v-if="isDownloadAlertShowing && downloadMediaItemIndex == index"
            />
            <!-- </transition> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isFilteredMemes" class="middle__container">
      <div class="meme__cards">
        <div
          v-for="(meme, index) in videoFilteredMemes"
          :key="meme._id"
          class="meme__cards--item animate__animated animate__slideInUp"
        >
          <div class="meme__cards--item-media">
            <VIntersect :threshold="0" @enter="vEnter()" @exit="vExit()">
              <template #default="entry">
                <div
                  class="intersection-content"
                  :style="{
                    border: entry.isIntersecting
                      ? '2px solid rgba(128, 128, 128, 0.164)'
                      : 'none',
                    background: entry.isIntersecting ? 'black' : 'black',
                  }"
                >
                  <div v-if="vHasEntered">
                    <video
                      width="400"
                      height="400"
                      controls
                      :src="meme.imageURL"
                      autoplay
                      loop
                      :alt="meme.description"
                      poster="../../assets/isfanny_text_black_bg-01.svg"
                      class="videoSrc"
                    />
                  </div>
                  <div v-show="!vHasEntered">
                    <video
                      src=""
                      poster="../../assets/isfanny_text_black_bg-01.svg"
                      style="object-fit: contain; width: 100%; height: 472px"
                    />
                  </div>
                </div>
              </template>
            </VIntersect>
          </div>

          <div class="meme__cards--item-footer">
            <p>{{ meme.description }}</p>
            <div class="meme__cards--item-footer-icons">
              <div class="like__meme">
                <i class="uil uil-eye"></i>
                <p>999+</p>
              </div>

              <!-- <div class="share__meme">
                <i class="uil uil-share"></i>
                <p>Share</p>
              </div> -->
              <div class="download__meme">
                <a
                  @click="downloadMedia(index)"
                  :href="`https://res.cloudinary.com/mememe/video/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${meme._id}/${meme.public_id}.${meme.media_details.format}`"
                  download
                >
                  <i class="uil uil-download-alt"></i>
                  <p>Download</p>
                </a>
              </div>
            </div>
            <!-- <transition name="dropdown-fade"> -->
            <DownloadAlert
              class="animate__animated animate__fadeInUp"
              v-if="isDownloadAlertShowing && downloadMediaItemIndex == index"
            />
            <!-- </transition> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else>
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
    </div>

    <LoaderIsfanny v-if="isLoadingMeme" />
    <!-- Error alert -->
    <Alert v-if="apiErrors === 'Failed to load more video memes'" />
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
          v-if="!allVideoMemes.length == 0"
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
import { InstagramLoader } from "vue-content-loader";
import DownloadAlert from "../DownloadAlert.vue";

import LoaderIsfanny from "../LoaderIsfanny.vue";

import { VIntersect } from "vuetensils/src/components";
// import { VideoPlayer } from "@videojs-player/vue";
// import "video.js/dist/video-js.css";

import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
  },
  // props: ["memeCategory"],
  components: {
    LoaderIsfanny,
    InstagramLoader,
    VIntersect,
    DownloadAlert,
    // VideoPlayer,
  },
  data() {
    return {
      dollarQ: this.$q,
      isLoadingMeme: false,
      hasPhotoMemes: true,
      isFilteredMemes: false,
      activateFilter: null,
      filter: { category: "", page: "", sort: "" },
      isDownloadAlertShowing: false,
      downloadMediaItemIndex: null,
    };
  },
  computed: {
    ...mapGetters([
      "allVideoMemes",
      "video_pageNumber",
      "_category",
      "videoFilteredMemes",
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
  },
  methods: {
    ...mapActions([
      "fetchAllVideoMemes",
      "fetchMoreVideoMemes",
      "setVideoFilteredURL",
      "nextPage",
      "previousPage",
      "clearVideosMemes",
      "clearVideosPageNumber",
    ]),
    async loadMore() {
      // this.nextPage(this.paging + 1);
      let page = this.video_pageNumber + 1;
      let meta = {
        page,
        // sort: "-createdAt",
        filter: this.filter,
        // type: "video",
        category: this._category,
      };
      this.isLoadingMeme = true;
      this.dollarQ.loading.show({});
      await this.fetchMoreVideoMemes(meta);
      this.isLoadingMeme = false;
      this.dollarQ.loading.hide({});
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
    vEnter() {
      // const videoSrc = document.querySelector(".videoSrc");
      this.vHasEntered = true;

      console.log("video entered");

      // this.$gtag.event("next_video_page", {
      //   event_category: "videos",
      //   event_label: "next_video_page",
      //   // event_value: '1',
      // });
      // this.$gtag.pageview({
      //   page_path: "/videos",
      // });
    },
    vExit() {
      this.vHasEntered = false;
      console.log("video has left");
      const videoSrc = document.querySelector(".videoSrc");
      videoSrc.pause();
    },
    // downloadMedia(index) {
    //   this.isDownloadAlertShowing = true;
    //   this.downloadMediaItemIndex = index;

    //   setTimeout(() => {
    //     this.isDownloadAlertShowing = false;
    //   }, 3000);
    // },
    downloadMedia() {
      this.dollarQ.notify({
        type: "positive",
        message: "Meme downloading.",
        position: "top-right",
      });
    },
  },
  async created() {
    if (this.allVideoMemes.length === 0) {
      this.dollarQ.loading.show({});
      await this.fetchAllVideoMemes();
      this.dollarQ.loading.hide({});
    }
  },
  watch: {
    cat(newValue) {
      this.activateFilter = true;
      if (this.activateFilter === true) {
        this.clearVideosPageNumber();

        this.filter.category = newValue;
        this.setVideoFilteredURL(this.filter);
        this.isFilteredMemes = true;
        document.documentElement.scrollTop = 0;
      } else {
        this.activateFilter = false;
      }
    },
    paging(newValue) {
      this.activateFilter = true;
      if (this.activateFilter === true) {
        this.clearVideosPageNumber();

        this.filter.page = newValue;
        this.setVideoFilteredURL(this.filter);
        this.isFilteredMemes = true;
        document.documentElement.scrollTop = 0;
      } else {
        this.activateFilter = false;
      }
    },
    async sorting(newValue) {
      if (this.activateFilter === true) {
        console.log("active user activated");
        this.clearVideosPageNumber();

        this.filter.sort = newValue;
        this.setVideoFilteredURL(this.filter);
        this.isFilteredMemes = true;
        document.documentElement.scrollTop = 0;
      } else {
        console.log("active user NOT activated");

        this.filter.sort = newValue;
        this.clearVideosMemes();
        this.clearVideosPageNumber();
        this.setVideoFilteredURL(this.filter);
        this.isFilteredMemes = true;
        // document.documentElement.scrollTop = 0;
        this.dollarQ.loading.show({});
        await this.loadMore();
        this.dollarQ.loading.hide({});
      }
    },
  },
};
</script>

<style scoped>
.meme__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.3rem;
}

.meme__cards--item-media {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* padding-top: 90%; */
  background-color: var(--color-white);
  border-radius: 1rem 1rem 0 0;
}

.meme__cards--item-media video {
  /* position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem 1rem 0 0; */
}

.meme__cards--item-footer {
  padding: 0.7rem 1rem;
  background-color: var(--color-white);
  border-radius: 0 0 1rem 1rem;
}

.meme__cards--item-footer p {
  font-size: 0.9rem;
}

.meme__cards--item-footer-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.meme__cards--item-footer-icons div a,
.meme__cards--item-footer-icons div {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  color: var(--color-dark);
}

.meme__cards--item-footer-icons div p {
  font-size: 0.9rem;
}

/* end of test */

.middle__container .middle__meme--item {
  background-color: var(--color-white);
  padding: 0.7rem 0.2rem;

  margin-bottom: 1.5rem;
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
}

.middle__container .middle__meme--media video {
  border-radius: 1.5rem 1.5rem 0 0;
}

.intersection-content {
  border-radius: 1rem 1rem 0 0;
  border: 2px solid rgba(128, 128, 128, 0.164);
}

/* Photo meme description */

.meme-details__description {
  /* width: 70%; */
  margin: 0.5rem auto 0 auto;
  /* padding: 1rem; */
}

.meme-details__description p {
  /* margin-top: 1rem; */
  padding: 0 0.5rem;
}

.meme-details__description .meme-details__icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-size: 1.3rem;
}

.meme-details__description .meme-details__icons i {
  margin-left: 2rem;
}

.meme-details__description .meme-details__icons i:hover {
  cursor: pointer;
}

.meme-details__description .meme-details__icons i:hover {
  color: var(--color-primary);
}

.meme-details__description .meme-details__icons i:nth-child(1) {
  margin-left: 0;
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

@media screen and (max-width: 850px) {
}

@media screen and (max-width: 850px) {
}

@media screen and (max-width: 769px) {
  .middle__container .middle__meme--item {
    border-radius: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
}

@media screen and (max-width: 650px) {
  .middle__container .middle__meme--item {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .middle__container .middle__meme--item {
    border-radius: 1.2rem;
  }

  .middle__container .middle__meme--media video {
    border-radius: 1.2rem;
  }

  /* show breadcrumbs on mobile devices */
  .breadcrumbs {
    display: flex;
    justify-content: center;
  }
}
</style>
