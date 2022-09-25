<template>
  <div class="meme__cards--item">
    <div v-if="type == 'photo'" class="meme__cards--item-media">
      <router-link
        :to="{
          name: 'meme-details-alt',
          params: { memeId: memeId },
        }"
      >
        <!-- <img :src="photoURL" alt="" /> -->
        <VIntersect :threshold="0.1" @enter="iEnter()" @exit="iExit()">
          <template #default="entry">
            <div
              class="intersection-content"
              :style="{
                background: entry.isIntersecting
                  ? 'var(--color-white)'
                  : 'var(--color-dark)',
              }"
            >
              <div v-if="iHasEntered">
                <!-- <img class="imageSrc" :src="photoURL" alt="" /> -->
                <img
                  class="imageSrc"
                  :src="imageURL"
                  alt=""
                  style="object-fit: cover; width: 100%; height: 300px"
                />
              </div>
              <div v-else-if="!iHasEntered">
                <img
                  src="../assets/isfanny-smile-logo.png"
                  style="object-fit: cover; width: 100%; height: 300px"
                />
              </div>
            </div>
          </template>
        </VIntersect>
      </router-link>
    </div>
    <div v-else-if="type === 'gif'" class="meme__cards--item-media">
      <router-link
        :to="{
          name: 'meme-details-alt',
          params: { memeId: memeId },
        }"
      >
        <!-- <img :src="photoURL" alt="" /> -->
        <VIntersect :threshold="0.1" @enter="iEnter()" @exit="iExit()">
          <template #default="entry">
            <div
              class="intersection-content"
              :style="{
                background: entry.isIntersecting
                  ? 'var(--color-white)'
                  : 'black',
              }"
            >
              <div v-if="iHasEntered">
                <!-- <img class="imageSrc" :src="photoURL" alt="" /> -->
                <img
                  class="imageSrc"
                  :src="imageURL"
                  alt=""
                  style="object-fit: cover; width: 100%; height: 300px"
                />
              </div>
              <div v-else-if="!iHasEntered">
                <img
                  src="../assets/isfanny-smile-logo.png"
                  style="object-fit: cover; width: 100%; height: 300px"
                />
              </div>
            </div>
          </template>
        </VIntersect>
      </router-link>
    </div>
    <div v-else-if="type == 'video'" class="meme__cards--item-media">
      <router-link
        :to="{
          name: 'meme-details-alt',
          params: { memeId: memeId },
        }"
      >
        <!-- <video
          autoplay
          muted
          loop
          preload="metadata"
          :src="`https://res.cloudinary.com/mememe/video/upload/b_blurred:400:15,c_pad,h_480,w_480/$mainvideowidth_400/$overlaywidth_$mainvideowidth_div_4/c_scale,w_$mainvideowidth/l_video:isfanny_green_bg_a30niz/c_scale,e_loop:2,fl_relative,w_1.0,w_$overlaywidth/co_rgb:4ed957,e_make_transparent:8/fl_layer_apply,g_south_east,x_2,y_2/${public_id}`"
          :alt="description"
      /> -->
        <VIntersect :threshold="0.1" @enter="vEnter()" @exit="vExit()">
          <template #default="entry">
            <div
              class="intersection-content"
              :style="{
                background: entry.isIntersecting
                  ? 'var(--color-white)'
                  : 'black',
              }"
            >
              <div v-if="vHasEntered">
                <video
                  :src="imageURL"
                  class="videoSrc"
                  autoplay
                  muted
                  loop
                  preload="metadata"
                  :alt="description"
                  style="object-fit: cover; width: 100%; height: 300px"
                />
                <!-- :src="`https://res.cloudinary.com/mememe/video/upload/b_blurred:400:15,c_pad,h_480,w_480/$mainvideowidth_400/$overlaywidth_$mainvideowidth_div_4/c_scale,w_$mainvideowidth/l_video:isfanny_green_bg_a30niz/c_scale,e_loop:2,fl_relative,w_1.0,w_$overlaywidth/co_rgb:4ed957,e_make_transparent:8/fl_layer_apply,g_south_east,x_2,y_2/${public_id}`" -->
              </div>
              <div v-else-if="!vHasEntered">
                <img
                  src="../assets/isfanny-smile-logo.png"
                  class="videoSrc"
                  style="object-fit: cover; width: 100%; height: 300px"
                />
              </div>
            </div>
          </template>
        </VIntersect>
      </router-link>
    </div>
    <div v-else-if="type == 'text'" class="meme__cards--item-media">
      <router-link
        :to="{
          name: 'meme-details-alt',
          params: { memeId: memeId },
        }"
      >
        <div class="text-image__container">
          <img
            src="../assets/isFanny_text_backgrounda.png"
            style="object-fit: cover; width: 100%; height: 300px"
          />
          <section class="text__meme">
            <p>{{ description }}</p>
          </section>
        </div></router-link
      >
    </div>
    <div v-if="type === 'text'" class="meme__cards--item-footer">
      <p>{{ description.substring(0, 40) }}...</p>
      <div class="meme__cards--item-footer-icons">
        <div class="like__meme">
          <i class="uil uil-eye"></i>
          <p>999+</p>
        </div>

        <!-- Share button -->
        <!-- <div class="share__meme">
          <i class="uil uil-share"></i>
          <p>Share</p>
        </div> -->
      </div>
    </div>
    <div v-else class="meme__cards--item-footer">
      <p>{{ description.substring(0, 40) }}...</p>
      <div class="meme__cards--item-footer-icons">
        <div class="like__meme">
          <i class="uil uil-eye"></i>
          <p>1k</p>
        </div>

        <!-- share button -->
        <!-- <div class="share__meme">
          <i class="uil uil-share"></i>
          <p>Share</p>
        </div> -->

        <!-- download button -->
        <div class="download__meme">
          <a
            v-if="type === 'video'"
            :href="`https://res.cloudinary.com/mememe/video/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${memeId}/${public_id}.${media_details.format}`"
            @click="downloadMedia(index)"
            download
          >
            <i class="uil uil-download-alt"></i>
            <p>Download</p>
          </a>
          <a
            v-if="type === 'gif'"
            @click="downloadMedia(index)"
            :href="photoURL"
            download
          >
            <i class="uil uil-download-alt"></i>
            <p>Download</p>
          </a>
          <a
            v-if="type === 'photo'"
            @click="downloadMedia(index)"
            :href="photoURL"
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
</template>

<script>
import { VIntersect } from "vuetensils/src/components";
import DownloadAlert from "../components/DownloadAlert.vue";

// import { VideoPlayer } from "@videojs-player/vue";
// import "video.js/dist/video-js.css";

export default {
  props: [
    "memeId",
    "index",
    "imageURL",
    "type",
    "description",
    "public_id",
    "media_details",
  ],
  components: { VIntersect, DownloadAlert },
  data() {
    return {
      iHasEntered: false,
      vHasEntered: false,
      isDownloadAlertShowing: false,
      downloadMediaItemIndex: null,
    };
  },
  computed: {
    photoURL() {
      return `https://res.cloudinary.com/mememe/image/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${this.memeId}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/fl_relative,w_0.2,c_scale/r_10/o_100/fl_layer_apply,g_north_west,x_10,y_10/${this.public_id}.${this.media_details.format}`;
    },
    videoURL() {
      return `https://res.cloudinary.com/mememe/video/upload/fl_attachment:isFannymemes_${this.memeId}/$mainvideowidth_400/$overlaywidth_$mainvideowidth_div_6/c_scale,e_grayscale,w_$mainvideowidth/l_video:isfanny_video_end_watermark_cgh7c4/c_scale,w_$overlaywidth/fl_layer_apply,g_south_east,x_10,y_10/${this.public_id}.${this.media_details.format}`;
    },
  },
  methods: {
    vEnter() {
      console.log("video entered");

      this.vHasEntered = true;
    },
    vExit() {
      this.vHasEntered = false;
      console.log("video has left");
    },
    iEnter() {
      console.log("image entered");
      this.iHasEntered = true;
    },
    iExit() {
      this.iHasEntered = false;
      console.log("image has left");
    },
    downloadMedia(index) {
      this.isDownloadAlertShowing = true;
      this.downloadMediaItemIndex = index;

      setTimeout(() => {
        this.isDownloadAlertShowing = false;
      }, 3000);
    },
  },
};
</script>

<style>
.memes__container div .meme__cards--item {
  /* original */
  /* box-shadow: 0 2px 5px rgba(160, 160, 160, 0.253); */

  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.05); */

  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
  border: 2px solid rgba(0, 0, 255, 0);
  /* box-shadow: 0 2px 5px rgba(34, 21, 21, 0.486); */
  box-shadow: var(--memeitem-box-shadow);
  border-radius: 1rem;
  background-color: var(--color-white);
}

.memes__container div .meme__cards--item:hover {
  border: 2px solid var(--color-primary);
  box-shadow: 0 2px 9px rgba(34, 21, 21, 0.6);
  transition: border 0.2s ease;
}

.memes__container .meme__cards--item-media {
  position: relative;
  width: 100%;
  overflow: hidden;
  /* padding-top: 90%; */
  background-color: var(--color-white);
  border-radius: 1rem 1rem 0 0;
}

/* .memes__container .meme__cards--item-media:hover::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background: linear-gradient(
    rgba(0, 0, 0, 0.5),
    transparent,
    transparent,
    rgba(0, 0, 0, 0.5)
  );
  width: 100%;
  height: 100%;
  
} */

/* text meme */

.memes__container .text-image__container {
  position: relative;
  /* margin: 10px; */
  /* overflow: hidden; */
}

.memes__container .text-image__container span {
  /* position: absolute;
  top: 0;
  left: 0;
  padding: 50px 50px 150px 50px;
  overflow: scroll;
  height: 100%;
  width: 100%;
  text-align: center; */
}

.memes__container .text__meme {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  overflow-y: auto;
  padding: 3rem 2rem;
  color: black;
  text-align: center;
  margin: 0 auto;
}

.memes__container .text__meme p {
  margin: 0 0.8rem;
}

.memes__container .meme__cards--item-media img,
.memes__container .meme__cards--item-media video {
  /* position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem 1rem 0 0; */
}

.memes__container .meme__cards .meme__cards--item-footer {
  padding: 0.7rem 1rem;
  background-color: var(--color-white);
  border-radius: 0 0 1rem 1rem;
}

.memes__container .meme__cards .meme__cards--item-footer p {
  font-size: 0.9rem;
}

.memes__container .meme__cards .meme__cards--item-footer-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.memes__container .meme__cards .meme__cards--item-footer-icons div a,
.memes__container .meme__cards .meme__cards--item-footer-icons div {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  color: var(--color-dark);
}

.memes__container .meme__cards .meme__cards--item-footer-icons div p {
  font-size: 0.9rem;
}

/* slide fade transition for meme item */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media screen and (max-width: 480px) {
  .memes__container .text-image__container img {
    border-radius: 0 0 1rem 1rem;
  }
}

/* End of slide fade transition for nav search*/
</style>
