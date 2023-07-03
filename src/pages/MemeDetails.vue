<template>
  <div class="meme-details__page">
    <div class="meme-details__container">
      <!-- <i
        v-if="$q.screen.lt.md"
        @click="closeMemeDetails"
        class="uil uil-times close-meme-details"
      ></i> -->
      <!-- Error alert -->
      <div
        class="animate__animated animate__slideInUp"
        v-if="apiErrors === 'Failed to load meme' && !isMemeAlreadyCached"
      >
        <ErrorAlert />
      </div>
      <!-- Error alert -->
      <div class="meme-details">
        <div v-if="isMemeAlreadyCached" class="meme-details__left">
          <!-- <div v-if="$q.screen.lt.md" class="meme-details__profile">
            <img src="../assets/isFanny_logo_svg-21.svg" alt="" />
            <div>
              <h6 class="q-ma-none">isFanny</h6>
              <p class="q-ma-none">Few days ago</p>
            </div>
          </div> -->

          <!-- <AboutTag
            :socialMeme_id="cachedMeme._id"
            :socialMeme_imageURL="cachedMeme.imageURL"
            :socialMeme_type="cachedMeme.type"
            :socialMeme_description="cachedMeme.description"
            :socialMeme_media_details="cachedMeme.media_details"
          /> -->

          <div class="meme-details__media">
            <div class="previous-meme-details-btn-box" @click="previousMeme">
              <i class="uil uil-angle-left-b previous-meme-details-btn"></i>
            </div>
            <div class="next-meme-details-btn-box" @click="nextMeme">
              <i class="uil uil-angle-right-b next-meme-details-btn"></i>
            </div>

            <div v-if="cachedMeme.type == 'video'" class="v-video__container">
              <video
                controls
                :src="cachedMeme.imageURL"
                autoplay
                loop
                poster="../assets/isfanny_text_black_bg-01.svg"
                :alt="cachedMeme.description"
                style="
                  object-fit: contain;
                  width: 100%;
                  height: 420px;
                  margin: 0 auto;
                  background-color: black;
                  border-radius: 0.5rem;
                "
              />
            </div>
            <!-- photo -->
            <div
              v-else-if="cachedMeme.type == 'photo'"
              class="v-image__container"
            >
              <VImg
                :src="cachedMeme.imageURL"
                :alt="cachedMeme.description"
                background="#DDD"
                transition-duration="100"
                style="object-fit: contain; width: 100%; height: 420px"
              />
            </div>
            <!-- gif -->
            <div v-else-if="cachedMeme.type == 'gif'" class="v__container">
              <VImg
                :src="cachedMeme.imageURL"
                :alt="cachedMeme.description"
                background="#DDD"
                transition-duration="100"
                style="object-fit: contain; width: 100%; height: 420px"
              />
            </div>
            <!-- text -->
            <div
              v-else-if="cachedMeme.type == 'text'"
              class="v-image__container media-text animate__animated animate__fadeIn"
            >
              <VImg
                :alt="cachedMeme.description"
                background="var(--color-light)"
                transition-duration="100"
                style="object-fit: cover; width: 100%; height: 420px"
              />
              <section class="text__meme">
                <p>
                  {{ cachedMeme.description }}
                </p>
              </section>
            </div>
          </div>

          <!-- description and tags details -->
          <div class="description-plus-tags">
            <div class="meme-details__description">
              <p
                v-if="cachedMeme.type === 'photo'"
                class="animate__animated animate__fadeIn q-ma-none"
              >
                {{ cachedMeme.description }}
              </p>
              <p
                v-else-if="cachedMeme.type === 'video'"
                class="animate__animated animate__fadeIn q-ma-none"
              >
                {{ cachedMeme.description }}
              </p>
              <p
                v-else-if="cachedMeme.type === 'gif'"
                class="animate__animated animate__fadeIn q-ma-none"
              >
                {{ cachedMeme.description }}
              </p>
              <p
                v-else-if="cachedMeme.type === 'text'"
                class="animate__animated animate__fadeIn q-ma-none"
              >
                {{ cachedMeme.description.substring(0, 40) }}...
              </p>

              <div class="meme-details__icons">
                <div>
                  <!-- share buttons -->
                  <div class="share-btn__container">
                    <div class="meme-details__share">
                      <a
                        class="share-btn"
                        :href="`https://web.facebook.com/share.php?u=${hostURL}/${cachedMeme._id}`"
                        target="_blank"
                      >
                        <i class="uil uil-facebook-f"></i>
                      </a>
                      <a
                        class="share-btn"
                        :href="`https://twitter.com/intent/tweet?text=${hostURL}/${cachedMeme._id}`"
                        target="_blank"
                      >
                        <i class="uil uil-twitter"></i>
                      </a>
                      <!-- <a
                        class="share-btn"
                        href="https://www.instagram.com/isfannymemes)"
                      >
                        <i class="uil uil-instagram"></i>
                      </a> -->
                      <a
                        class="share-btn"
                        :href="`https://api.whatsapp.com/send?phone=&text=${hostURL}/${cachedMeme._id}`"
                        data-action="share/whatsapp/share"
                        target="_blank"
                      >
                        <i class="uil uil-whatsapp"></i>
                      </a>
                      <a
                        class="share-btn"
                        :href="`https://xn--r1a.link/share/url?url=${hostURL}/${cachedMeme._id}`"
                        target="_blank"
                      >
                        <i class="uil uil-telegram"></i>
                      </a>
                      <a class="share-btn">
                        <i
                          @click="copyUrl(cachedMeme._id)"
                          class="uil uil-link"
                        ></i>
                      </a>
                    </div>
                    <CopyAlert
                      class="animate__animated animate__fadeInUp"
                      v-if="isCopyAlertShowing"
                    />
                  </div>
                  <!-- end of share -->
                </div>

                <!-- Copy Text Description btn -->
                <!-- <div
                  v-if="cachedMeme.type === 'text'"
                  class="share-btn__container"
                >
                  <div class="meme-details__share" @click="downloadMedia()">
                    <a class="share-btn">
                      <i class="uil uil-copy"></i>
                    </a>
                  </div>
                </div> -->

                <!-- download btn -->
                <div class="share-btn__container">
                  <div class="meme-details__share">
                    <a
                      v-if="cachedMeme.type === 'video'"
                      class="share-btn"
                      :href="`https://res.cloudinary.com/mememe/video/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${cachedMeme._id}/${cachedMeme.public_id}.${cachedMeme.media_details.format}`"
                      download
                    >
                      <i
                        @click="downloadMedia()"
                        class="uil uil-download-alt"
                      ></i>
                    </a>
                    <a
                      class="share-btn"
                      v-if="cachedMeme.type === 'photo'"
                      :href="`https://res.cloudinary.com/mememe/image/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${cachedMeme._id}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/fl_relative,w_0.2,c_scale/r_10/o_100/fl_layer_apply,g_north_west,x_10,y_10/${cachedMeme.public_id}.${cachedMeme.media_details.format}`"
                      download
                    >
                      <i
                        @click="downloadMedia()"
                        class="uil uil-download-alt"
                      ></i>
                    </a>
                    <a
                      class="share-btn"
                      v-if="cachedMeme.type === 'gif'"
                      :href="`https://res.cloudinary.com/mememe/image/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${cachedMeme._id}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/fl_relative,w_0.2,c_scale/r_10/o_100/fl_layer_apply,g_north_west,x_10,y_10/${cachedMeme.public_id}.${cachedMeme.media_details.format}`"
                      download
                    >
                      <i
                        @click="downloadMedia()"
                        class="uil uil-download-alt"
                      ></i>
                    </a>
                    <a class="share-btn" v-if="cachedMeme.type === 'text'">
                      <i
                        @click="copyText(cachedMeme.description)"
                        class="uil uil-copy"
                      ></i>
                    </a>
                  </div>
                </div>
                <!-- end of download -->
              </div>
              <DownloadAlert
                class="animate__animated animate__fadeInUp"
                v-if="isDownloadAlertShowing"
              />
              <CopyAlert
                class="animate__animated animate__fadeInUp"
                v-if="isCopyDescriptionAlertShowing"
              />
            </div>
            <!-- tags -->
            <div class="meme-details__tags">
              <h6 class="q-ma-none">Tags</h6>
              <div>
                <span
                  v-for="tag in catchedMemeTags"
                  :key="tag"
                  @click="searchByTag(tag)"
                  >{{ tag }}</span
                >
              </div>
            </div>
            <!-- disqus -->
            <!-- <section class="comments" aria-labelledby="comment">
              <div class="disqus__title">
                <span></span>
                <h4 id="comment">Comments</h4>
              </div>
              <Disqus
                shortname="isfannymemes"
                :identifier="`${hostURL}`"
                :url="`${hostURL}/${cachedMeme._id}`"
              />
            </section> -->
            <!-- end of disqus -->
          </div>
        </div>
        <!-- when meme URL is opened directly -->
        <div v-else-if="allRandomMemes.length === 0" class="meme-details__left">
          <!-- <div class="meme-details__profile" id="meme-details__profile">
            <img src="../assets/isFanny_logo_svg-21.svg" alt="" />
            <div>
              <h6>isFanny</h6>
              <p>Few days ago</p>
            </div>
          </div> -->

          <!-- <AboutTag
            :socialMeme_id="meme._id"
            :socialMeme_imageURL="meme.imageURL"
            :socialMeme_type="meme.type"
            :socialMeme_description="meme.description"
            :socialMeme_media_details="meme.media_details"
          /> -->

          <div class="meme-details__media">
            <div class="previous-meme-details-btn-box" @click="previousMeme">
              <i class="uil uil-angle-left-b previous-meme-details-btn"></i>
            </div>
            <div class="next-meme-details-btn-box" @click="nextMeme">
              <i class="uil uil-angle-right-b next-meme-details-btn"></i>
            </div>

            <div v-if="meme.type == 'video'" class="v-video__container">
              <video
                controls
                :src="meme.imageURL"
                autoplay
                loop
                poster="../assets/isfanny_video_poster_black_01.svg"
                :alt="meme.description"
                style="
                  object-fit: contain;
                  width: 100%;
                  height: 420px;
                  margin: 0 auto;
                  background-color: black;
                  border-radius: 0.5rem;
                "
              />
            </div>
            <!-- photo -->
            <div v-else-if="meme.type == 'photo'" class="v-image__container">
              <VImg
                :src="meme.imageURL"
                :alt="meme.description"
                background="#DDD"
                transition-duration="100"
                style="object-fit: contain; width: 100%; height: 420px"
              />
            </div>
            <!-- gif -->
            <div v-else-if="meme.type == 'gif'" class="v__container">
              <VImg
                :src="meme.imageURL"
                :alt="meme.description"
                background="#DDD"
                transition-duration="100"
                style="object-fit: cover; width: 100%; height: 420px"
              />
            </div>
            <!-- text -->

            <div
              v-else-if="meme.type == 'text'"
              class="v-image__container media-text"
            >
              <VImg
                :alt="meme.description"
                background="var(--color-light)"
                transition-duration="100"
                style="object-fit: cover; width: 100%; height: 420px"
              />
              <section class="text__meme">
                <p>
                  {{ meme.description }}
                </p>
              </section>
            </div>
          </div>

          <div class=".description-plus-tags">
            <div class="meme-details__description">
              <p v-if="meme.type === 'photo'">
                {{ meme.description }}
              </p>
              <p v-else-if="meme.type === 'video'">
                {{ meme.description }}
              </p>
              <p v-else-if="meme.type === 'gif'">
                {{ meme.description }}
              </p>

              <!-- <div class="meme-details__icons">
              <div>
                <i class="uil uil-heart"></i>
                <i class="uil uil-comment-alt-message"></i>
                <i class="uil uil-share"></i>
              </div>
              <a
                v-if="meme.type === 'video'"
                :href="`https://res.cloudinary.com/mememe/video/upload/fl_attachment:isFannymemes_${meme._id}/c_fill,h_${meme.media_details.height},w_${meme.media_details.width}/fl_splice,l_video:isfanny_video_end_watermark_cgh7c4/c_fill,h_${meme.media_details.height},w_${meme.media_details.width}/fl_layer_apply/${meme.public_id}`"
                download
              >
                <i class="uil uil-download-alt"></i>
                <p>Download</p>
              </a>
              <a
                v-if="meme.type === 'gif'"
                :href="`https://res.cloudinary.com/mememe/image/upload/fl_attachment:isFannymemes_${meme._id}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/c_scale,w_250/r_10/o_100/fl_layer_apply,g_south,y_10/${meme.public_id}`"
                download
              >
                <i class="uil uil-download-alt"></i>
                <p>Download</p>
              </a>
              <a
                v-if="meme.type === 'photo'"
                :href="`https://res.cloudinary.com/mememe/image/upload/fl_attachment:isFannymemes_${meme._id}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/c_scale,w_250/r_10/o_100/fl_layer_apply,g_south,y_10/${meme.public_id}`"
                download
              >
                <i class="uil uil-download-alt"></i>
                <p>Download</p>
              </a>
            </div> -->

              <div class="meme-details__icons">
                <div>
                  <!-- share buttons -->
                  <div class="share-btn__container">
                    <div class="meme-details__share">
                      <a
                        class="share-btn"
                        :href="`https://web.facebook.com/share.php?u=${hostURL}/${meme._id}`"
                        target="_blank"
                      >
                        <i class="uil uil-facebook-f"></i>
                      </a>
                      <a
                        class="share-btn"
                        :href="`https://twitter.com/intent/tweet?text=${hostURL}/${meme._id}`"
                        target="_blank"
                      >
                        <i class="uil uil-twitter"></i>
                      </a>
                      <!-- <a
                        class="share-btn"
                        href="https://www.instagram.com/isfannymemes"
                        target="_blank"
                      >
                        <i class="uil uil-instagram"></i>
                      </a> -->
                      <a
                        class="share-btn"
                        :href="`https://api.whatsapp.com/send?phone=&text=${hostURL}/${meme._id}`"
                        data-action="share/whatsapp/share"
                        target="_blank"
                      >
                        <i class="uil uil-whatsapp"></i>
                      </a>
                      <a
                        class="share-btn"
                        :href="`https://xn--r1a.link/share/url?url=${hostURL}/${meme._id}&text=${meme.description}`"
                        target="_blank"
                      >
                        <i class="uil uil-telegram"></i>
                      </a>
                      <a class="share-btn">
                        <i @click="copyUrl(meme._id)" class="uil uil-link"></i>
                      </a>
                    </div>
                    <CopyAlert
                      class="animate__animated animate__fadeInUp"
                      v-if="isCopyAlertShowing"
                    />
                  </div>
                  <!-- end of share -->
                </div>

                <!-- download btn -->
                <div class="share-btn__container">
                  <div class="meme-details__share" @click="downloadMedia()">
                    <a
                      v-if="meme.type === 'video'"
                      class="share-btn"
                      :href="`https://res.cloudinary.com/mememe/video/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${meme._id}/${meme.public_id}.${meme.media_details.format}`"
                      download
                    >
                      <i class="uil uil-download-alt"></i>
                    </a>
                    <a
                      class="share-btn"
                      v-if="meme.type === 'photo'"
                      :href="`https://res.cloudinary.com/mememe/image/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${meme._id}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/fl_relative,w_0.2,c_scale/r_10/o_100/fl_layer_apply,g_north_west,x_10,y_10/${meme.public_id}.${meme.media_details.format}`"
                      download
                    >
                      <i class="uil uil-download-alt"></i>
                    </a>
                    <a
                      class="share-btn"
                      v-if="meme.type === 'gif'"
                      :href="`https://res.cloudinary.com/mememe/image/upload/q_auto:eco/f_auto/fl_attachment:isFannymemes_${meme._id}/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/fl_relative,w_0.2,c_scale/r_10/o_100/fl_layer_apply,g_north_west,x_10,y_10/${meme.public_id}.${meme.media_details.format}`"
                      download
                    >
                      <i class="uil uil-download-alt"></i>
                    </a>
                  </div>
                </div>
                <!-- end of download -->
              </div>
              <DownloadAlert
                class="animate__animated animate__fadeInUp"
                v-if="isDownloadAlertShowing"
              />
            </div>

            <!-- Tags -->
            <div class="meme-details__tags">
              <!-- <h5>Tags</h5>
              <div>
                <span
                  v-for="tag in memeTags"
                  :key="tag"
                  @click="searchByTag(tag)"
                  >{{ tag }}</span
                >
              </div> -->

              <!-- disqus -->
              <!-- <section class="comments" aria-labelledby="comment">
                <div class="disqus__title">
                  <span></span>
                  <h4 id="comment">Comments and Reactions</h4>
                </div>
                <Disqus
                  shortname="isfannymemes"
                  :identifier="`${currentUrlPath}`"
                  :url="`${currentUrlPath}`"
                />
              </section> -->
              <!-- end of disqus -->

              <!-- button 85 -->
              <div style="display: flex; justify-content: center">
                <button @click="goHome" class="button-85" role="button">
                  More memes
                </button>
              </div>
              <!-- button 85 -->
            </div>
          </div>
        </div>

        <div class="meme-details__right" v-if="!$q.platform.is.cordova">
          <div v-if="isMemeAlreadyCached" class="new-memes__section">
            <div class="new-memes__section--title">
              <span></span>
              <h6 class="q-ma-none">New memes</h6>
            </div>
            <!-- show this when meme is cached -->
            <div class="new-memes__card">
              <div
                class="new-memes__item"
                v-for="meme in allRandomMemesMinusOne"
                :key="meme._id"
              >
                <div v-if="meme.type === 'photo'" @click="displayRightMemes">
                  <img
                    :src="meme.imageURL"
                    loading="lazy"
                    :alt="meme.description"
                    :data-memeId="meme._id"
                  />
                </div>
                <div v-else-if="meme.type === 'gif'" @click="displayRightMemes">
                  <img
                    :src="meme.imageURL"
                    loading="lazy"
                    :alt="meme.description"
                    :data-memeId="meme._id"
                  />
                </div>
                <div
                  v-else-if="meme.type === 'video'"
                  @click="displayRightMemes"
                >
                  <video
                    :src="meme.imageURL"
                    muted
                    autoplay
                    loop
                    preload="metadata"
                    :alt="meme.description"
                    :data-memeId="meme._id"
                  />
                </div>
                <div class="text-meme-item" v-else-if="meme.type === 'text'">
                  <img
                    @click="displayRightMemes"
                    src="../assets/isfanny-smile-logo.png"
                    :alt="meme.description"
                    :data-memeId="meme._id"
                  />
                </div>

                <p>{{ meme.description.substring(0, 50) }}...</p>
              </div>
            </div>

            <!-- show this when meme is not cached -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ErrorAlert from "../components/ErrorAlert.vue";
import CopyAlert from "../components/CopyAlert.vue";
import DownloadAlert from "../components/DownloadAlert.vue";
import { date } from "quasar";

import { VImg } from "vuetensils/src/components";
// import { Disqus } from "vue-disqus";

// import { VideoPlayer } from "@videojs-player/vue";
// import "video.js/dist/video-js.css";

// import AboutTag from "../components/metaTags/AboutTag.vue";

export default {
  name: "meme-details",

  components: {
    ErrorAlert,
    VImg,
    CopyAlert,
    DownloadAlert,

    // AboutTag,
  },
  props: ["memeId"],
  data() {
    return {
      // hostURL: "http://localhost:8080/memes",
      hostURL: "https://isfanny.com/memes",
      // hostURL: "https://isfanny.netlify.app/memes",
      isMemeAlreadyCached: false,
      cachedMeme: [],
      isCopyAlertShowing: false,
      isCopyDescriptionAlertShowing: false,
      isDownloadAlertShowing: false,
      date: date,
    };
  },
  computed: {
    ...mapGetters(["meme", "allRandomMemes", "pageNumber", "apiErrors"]),

    allRandomMemesMinusOne() {
      let memes2 = this.allRandomMemes.slice(0, this.allRandomMemes.length - 1);
      return memes2;
    },
    catchedMemeTags() {
      let tag = [];
      let tags = this.cachedMeme.tags;
      tag = tags.split(" ");
      return tag;
    },
    memeTags() {
      let tag = [];
      // tag = this.meme.tags;
      let tags = this.meme.tags;
      tag = tags.split(" ");
      return tag;
    },
    photoURL() {
      return `https://res.cloudinary.com/mememe/image/upload/fl_attachment:isFannymemes_/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/c_scale,w_250/r_10/o_100/fl_layer_apply,g_south,y_10/${this.public_id}`;
    },
    videoURL() {
      return `https://res.cloudinary.com/mememe/image/upload/fl_attachment:isFannymemes_/$award_!!/$color_!rgb:231f20!/$style_!Arial_30!/b_white,co_$color,l_text:$style:$(award)%20www.isfanny.com%20/c_scale,w_250/r_10/o_100/fl_layer_apply,g_south,y_10/${this.public_id}`;
    },
    currentUrlPath() {
      return window.location.href;
    },
    // identifier() {
    //   return this.$route.path;
    // },
  },
  methods: {
    ...mapActions(["fetchMoreRandomMemes", "fetchSearchValue"]),
    fetchSingleMeme() {
      // first approach
      const memes = this.allRandomMemes;
      // memes.filter((meme) => {
      //   if (meme._id === this.memeId) {
      //     this.isMemeAlreadyCached = true;
      //     this.cachedMeme = meme;
      //   }
      // });

      // Alternate Approach
      let currentMemeIndex = memes.findIndex(
        (meme) => meme._id === this.memeId
      );
      console.log(currentMemeIndex);
      let currentMeme = memes[currentMemeIndex];
      this.isMemeAlreadyCached = true;
      this.cachedMeme = currentMeme;
      // change url to reflect current meme
      this.$router.replace({
        params: { memeId: currentMeme._id },
      });
    },
    async loadMore() {
      // let page = this.pageNumber + 1;
      // let meta = {
      //   page,
      //   sort: "-createdAt",
      //   type: "video",
      // };

      await this.fetchMoreRandomMemes();
    },
    async nextMeme() {
      try {
        console.log("clicked next:");

        let memes = this.allRandomMemes;
        let memesCount = this.allRandomMemes.length;
        let currentMemeIndex = memes.findIndex(
          (meme) => meme._id === this.cachedMeme._id
        );

        // count number of memes cached. if less than currentMemeIndex, loadmore

        if (memesCount - 1 == currentMemeIndex) {
          await this.loadMore();
        }
        currentMemeIndex++;
        let nextMeme = memes[currentMemeIndex];
        this.isMemeAlreadyCached = true;
        this.cachedMeme = nextMeme;
        // change url to reflect next meme
        this.$router.replace({
          params: { memeId: nextMeme._id },
        });
      } catch (error) {
        console.log("error occured while fetching next meme");
      }
    },
    previousMeme() {
      let memes = this.allRandomMemes;
      let currentMemeIndex = memes.findIndex(
        (meme) => meme._id === this.cachedMeme._id
      );
      currentMemeIndex--;
      if (currentMemeIndex < 0) currentMemeIndex = 0;
      console.log(currentMemeIndex);
      let previousMeme = memes[currentMemeIndex];
      this.isMemeAlreadyCached = true;
      this.cachedMeme = previousMeme;
      // change url to reflect previous meme
      this.$router.replace({
        params: { memeId: previousMeme._id },
      });
    },
    displayRightMemes(e) {
      let memeId = e.target.getAttribute("data-memeId");

      let memes = this.allRandomMemesMinusOne;

      let currentMemeIndex = memes.findIndex((meme) => meme._id === memeId);
      if (currentMemeIndex === -1) {
        return;
      } else {
        let displayMeme = memes[currentMemeIndex];
        this.isMemeAlreadyCached = true;
        this.cachedMeme = displayMeme;
        document.documentElement.scrollTop = 0;
      }
      // change url to reflect right meme

      this.$router.replace({
        params: { memeId: memeId },
      });
      console.log(memeId);
    },

    closeMemeDetails() {
      console.log(this.isMemeAlreadyCached);
      this.$router.back();
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
    copyUrl(memeId) {
      console.log(memeId);
      this.isCopyAlertShowing = true;
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => {
        this.isCopyAlertShowing = false;
      }, 3000);
    },
    copyText(description) {
      this.isCopyDescriptionAlertShowing = true;
      navigator.clipboard.writeText(
        `${description} | visit www.isfanny.com for more`
      );
      setTimeout(() => {
        this.isCopyDescriptionAlertShowing = false;
      }, 3000);
    },
    downloadMedia() {
      this.isDownloadAlertShowing = true;

      setTimeout(() => {
        this.isDownloadAlertShowing = false;
      }, 3000);
    },
    searchByTag(tag) {
      if (this.searchData != "") {
        this.fetchSearchValue(tag);
        this.$router.push({ name: "Search" });
      }
    },
  },
  created() {
    this.$store.dispatch("fetchMeme", this.memeId);
  },
  mounted() {
    console.log(this.$route.name);
    // this.nextMeme();
    // console.log(this.currentMemeIndex);

    if (this.allRandomMemes.length === 0) {
      // const memeDetails = document.querySelector(
      //   ".meme-details__container .meme-details"
      // );
      // memeDetails.style.display = "flex";
      // memeDetails.style.justifyContent = "center";
    } else {
      this.fetchSingleMeme();
    }
  },
};
</script>

<style scoped>
.meme-details__page {
  /* background-color: var(--color-black); */
  /* background-color: var(--color-light); */
}

.meme-details__container {
  position: relative;
  /* padding: 0.5rem; */
  /* margin-top: 2.6rem; */
  align-items: center;
  padding-top: 0.3rem;
}

.meme-details__container .close-meme-details {
  position: absolute;
  top: 2rem;
  right: 3rem;
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--color-black);
  background-color: var(--color-light);
  border-radius: 5px;
  padding: 0 0.3rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  /* z-index: 1000; */
}

.meme-details__container .close-meme-details:hover {
  color: var(--color-primary);
}

.meme-details__container .meme-details {
  width: 100%;
  /* min-height: 80vh; */
  background-color: var(--color-white);

  /* apply pattern */
  /* background: var(--color-white) url("../assets/pattern1.png") fixed; */
  /* background: var(--color-white)
    url("https://res.cloudinary.com/mememe/image/upload/v1661349691/pattern1_yf5ncg.png")
    fixed; */

  border-radius: 0.3rem;

  display: grid;
  grid-template-columns: 65% auto;
}

.meme-details__profile img {
  border-radius: 50%;
  width: 100%;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
}

.meme-details .meme-details__left {
  /* padding: 1rem 2rem; */
  padding: 0 2rem;
}

.meme-details .meme-details__left .meme-details__profile {
  display: flex;
  gap: 0.5rem;
}

.meme-details .meme-details__left .meme-details__profile p {
  font-size: 0.7rem;
}

/* meme media */

.meme-details .meme-details__left .meme-details__media {
  margin-top: 1rem;
  position: relative;
  /* width: 100%; */
  background: var(--color-light);
  border-radius: 0.5rem;
}

.meme-details .meme-details__left .media-text {
  position: relative;
  width: 100%;
}

.meme-details .meme-details__left .text__meme {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  /* cursor: pointer; */
  overflow-y: auto;
  padding: 4rem 4rem;
  /* color: rgb(192, 192, 192); */
  color: var(--color-black);
  text-align: center;
  margin: 0 auto;

  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.9;
}

@media screen and (min-width: 1024px) {
  .meme-details .meme-details__left .text__meme {
    padding: 4rem 6rem;
  }
}

.v-image__container {
  max-width: 500;
  height: 500;
  background-color: var(--color-light);
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  border-radius: 8px;
}

.v-video__container {
  max-width: 500;
  height: 500;
  background-color: var(--color-light);

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
}

.meme-details .meme-details__left .meme-details__media img,
.meme-details .meme-details__left .meme-details__media video {
  /* border-radius: 0.5rem; */
  /* comment below out to reverse */
  /* width: 70%; */
  width: 60%;
  margin: 0 auto;
}

/* next and previous buttons */

.previous-meme-details-btn-box,
.next-meme-details-btn-box {
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.705);
  /* color: var(--color-light); */
  color: rgba(255, 255, 255, 0.603);
  /* background-color: rgba(255, 255, 255, 0.4);
  color: rgba(0, 0, 0, 0.8); */
  cursor: pointer;
  position: absolute;
  top: 45%;
  font-size: 1.6rem;
  z-index: 109;
  border: 0.5px solid rgb(68, 68, 68);
}

.previous-meme-details-btn-box {
  /* border-top-right-radius: 7px;
  border-bottom-right-radius: 7px; */
  border-radius: 50%;
  left: 0.5rem;
}

.next-meme-details-btn-box {
  /* border-top-left-radius: 7px;
  border-bottom-left-radius: 7px; */
  border-radius: 50%;
  right: 0.5rem;
}

.previous-meme-details-btn:hover,
.next-meme-details-btn:hover {
  color: var(--color-primary);
}

.description-plus-tags {
  background: var(--color-white);
  /* background-color: var(--color-hero-bg); */

  margin: 0.5rem 0;
  padding: 0.3rem 0;
  border-radius: 0.5rem;
}

.meme-details__left .meme-details__description {
  /* comment below out to reverse */
  width: 70%;
  margin: 0 auto;
  /* padding: 0.3rem; */
  /* background: var(--color-light); */
}

.meme-details__left .meme-details__description p {
  margin-top: 1.1rem;
}

.meme-details__description .meme-details__icons {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.5rem;
  padding-left: 0;
  font-size: 1.3rem;
}

.meme-details__description .meme-details__icons a {
  gap: 0.7rem;
  color: var(--color-dark);
  display: flex;
  align-items: baseline;
  background-color: var(--color-light);
}

.meme-details__description .meme-details__icons a p {
  font-size: 1rem;
}

.meme-details__description .meme-details__icons i {
  margin-left: 2rem;
  cursor: pointer;
  /* display: block; */
}

.meme-details__description .meme-details__icons i:hover,
.meme-details__description .meme-details__icons a:hover {
  color: var(--color-primary);
}

.meme-details__description .meme-details__icons i:nth-child(1) {
  margin-left: 0;
}

/* tags`` */
.meme-details__left .meme-details__tags {
  width: 70%;
  margin: 0 auto;
}

.meme-details__left .meme-details__tags > div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.meme-details__left .meme-details__tags span {
  background-color: var(--color-light);
  /* margin: 0.5rem; */
  padding: 0.1rem 0.5rem;
  box-shadow: 0 0 1px rgba(128, 128, 128, 0.904);
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 2px;
}

.meme-details__left .meme-details__tags span:hover {
  background-color: var(--color-primary);
  color: white;
}

/* share buttons */

.share-btn__container {
  position: relative;
  /* background-color: var(--color-dark); */
}

.meme-details__share {
  margin: 0;
  padding: 0;
  /* position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%; */
  text-align: center;

  display: flex;
}

.share-btn {
  display: inline-block;
  width: 35px;
  height: 35px;
  /* background: #f1f1f1; */
  /* background: var(--color-white); */
  background: transparent;
  margin: 5px;
  /* margin-right: 10px; */
  border-radius: 30%;
  /* box-shadow: var(--social-btn-box-shadow); */
  overflow: hidden;
  position: relative;
  transition: 0.3s linear;
  display: flex;
  justify-content: center;
}

.share-btn:nth-child(1) {
  margin-left: 0;
}

.share-btn i {
  line-height: 35px;
  font-size: 20px;
  transition: 0.3s linear;
}

.share-btn:nth-child(1) i {
  color: #3b5998;
}

.share-btn:nth-child(2) i {
  color: #1da1f2;
}

.share-btn:nth-child(3) i {
  color: #c32aa3;
}

.share-btn:nth-child(4) i {
  color: #db4437;
}
.share-btn:nth-child(5) i {
  color: #3b5998;
}
.share-btn:nth-child(6) i {
  color: #22746d;
}

.share-btn:hover {
  transform: scale(1.1);
}

.share-btn:hover i {
  transform: scale(1.2);
  color: #fff;
}

.share-btn:before {
  content: "";
  position: absolute;
  width: 120%;
  height: 120%;
  transform: rotate(45deg);
  left: -110%;
  top: 90%;
}

.share-btn:nth-child(1)::before {
  background: #3b589888;
}

.share-btn:nth-child(2)::before {
  background: #1da0f28c;
}

.share-btn:nth-child(3)::before {
  background: #c32aa288;
}

.share-btn:nth-child(4)::before {
  background: #db453780;
}
.share-btn:nth-child(5)::before {
  background: #3b5898c5;
}
.share-btn:nth-child(6)::before {
  background: #0b1d7ec5;
}

.share-btn:hover::before {
  animation: aaa 0.7s 1;
  top: -10%;
  left: -10%;
}

@keyframes aaa {
  0% {
    left: -110%;
    top: 90%;
  }
  50% {
    left: 10%;
    top: -30%;
  }
  100% {
    left: -10%;
    top: -10%;
  }
}

/* button */

.button-85 {
  margin-top: 1.5rem;
  padding: 0.6em 2em;
  border: none;
  outline: none;
  /* color: rgb(255, 255, 255); */
  color: var(--color-dark);
  /* background: #111; */
  background: var(--color-dark);
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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

/* Disqus */
.disqus__title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 1.5rem;
}

.disqus__title span {
  border-radius: 2px;
  width: 4px;
  height: 0.8rem;
  display: block;
  background-color: var(--color-primary);
}
/* End of Disqus */

/*--------- Right ----------*/

.meme-details__right {
}

.meme-details__right .new-memes__section {
  margin-right: 1rem;
  padding: 1rem;

  /* border: 0.8px solid rgba(0, 0, 0, 0.212);
  border: 1px solid rgba(255, 255, 255, 0.486); */
  border: var(--new-memes-border);
  border-radius: 0.5rem;
  /* margin-top: 2.5rem; */
  margin-top: 1rem;

  margin-bottom: 2.5rem;
  margin-right: 2.5rem;
  /* background-color: var(--new-memes-bg); */
  background-color: var(--color-white);
}

.meme-details__right .new-memes__section--title {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.meme-details__right .new-memes__section--title span {
  border-radius: 2px;
  width: 4px;
  height: 0.8rem;
  display: block;
  background-color: var(--color-primary);
}

.new-memes__section .new-memes__card {
  width: 100%;
  margin-top: 1rem;
  /* height: 25rem; */
  height: 21.5rem;
  overflow-y: scroll;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
}

.new-memes__card .new-memes__item {
  display: flex;
  align-items: center;
  /* gap: 1rem; */
  /* width: 100%; */
  /* padding: 0.6rem 0.6rem; */
  margin-bottom: 0.5rem;
  /* background-color: var(--color-hero-bg); */
  background-color: var(--color-light);
  border-radius: 0.4rem;
  margin: 0.5rem;

  box-shadow: 0 0 1px 1px rgba(78, 78, 78, 0.2);

  /* transition: all 0.2s ease; */
}

.new-memes__card .new-memes__item img:hover,
.new-memes__card .new-memes__item video:hover {
  /* background-color: var(--color-light);
  border-radius: 0.3rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.527); */
  transform: scale(1.1);
  cursor: pointer;
}

.new-memes__card .new-memes__item > div {
  /* padding: 0.5rem; */
  /* border-radius: 10px; */
  width: 100px;
  height: 70px;
  min-width: 100px;
  min-height: 70px;
  overflow: hidden;
  position: relative;
  margin: 0.7rem 0.7rem;
  border-radius: 5px;
}

.new-memes__card .new-memes__item img,
.new-memes__card .new-memes__item video {
  /* border-radius: 10px; */
  box-shadow: 0 0 9px black;
  cursor: pointer;
  -webkit-transition: transform 0.1s ease-in;
  -moz-transition: transform 0.1s ease-in;
  -o-transition: transform 0.1s ease-in;
  transition: transform 0.1s ease-in;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  border-radius: 5px;
}

.text-meme-item {
  width: 5rem;
  height: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  color: rgb(194, 228, 3);
}

.new-memes__card .new-memes__item p {
  font-size: 1rem;
}

/* -------media query------- */

/* -------- left --------*/
@media screen and (max-width: 850px) {
}

@media screen and (max-width: 769px) {
  .meme-details__container .meme-details {
    grid-template-columns: 1fr;
  }

  .meme-details__left .meme-details__description p {
    margin-top: 0.8rem;
    font-size: 1rem;
  }

  .meme-details__left .meme-details__tags > div {
    font-size: 0.9rem;
  }

  /* right */

  .meme-details__right .new-memes__section {
    margin-right: 0;
    padding: 1rem 2rem;
    margin: 0.5rem 0 0 0;
    border-radius: 2.5rem 2.5rem 0 0;
    /* box-shadow: -4px 0 8px black; */
    box-shadow: var(--new-memes-box-box-shadow);
    /* background-color: var(--color-light); */
  }

  .new-memes__card .new-memes__item > div {
    /* padding: 0.5rem; */
    /* border-radius: 10px; */
    width: 150px;
    height: 100px;
    min-width: 150px;
    min-height: 100px;

    margin: 0.25rem 1rem;
  }
}
/* small screens */

@media screen and (max-width: 400px) {
  .meme-details__right .new-memes__section {
    width: 100%;
    margin: 0 auto;
  }

  .new-memes__item p {
    display: none;
  }

  .new-memes__card .new-memes__item {
    display: flex;
    justify-content: center;
    box-shadow: 0 0 1px 1px rgba(78, 78, 78, 0.5);
  }

  .new-memes__card .new-memes__item > div {
    /* padding: 0.5rem; */
    /* border-radius: 10px; */
    width: 90%;
    height: 100px;
    min-width: 90%;
    min-height: 100px;

    margin: 0.25rem 1rem;
  }
}

@media screen and (max-width: 650px) {
  .meme-details__page {
    /* background-color: var(--color-black); */
    /* background-color: var(--color-light); */
  }

  .meme-details__container {
    padding: 0;
    position: relative;
    align-items: center;

    padding-top: 0.3rem;
  }

  .meme-details .meme-details__left {
    padding: 0.5rem 0.2rem;
  }

  .meme-details__profile img {
    width: 2rem;
    height: 2rem;
  }

  .meme-details .meme-details__left .meme-details__media {
    margin-top: 0.5rem;
  }

  .meme-details .meme-details__left .meme-details__media img,
  .meme-details .meme-details__left .meme-details__media video {
    /* change size of media */
    width: 100%;
  }

  /* .meme-details .meme-details__left .meme-details__media-text {
    position: relative;
    width: 100%;
    background-color: var(--color-white);
  } */

  .previous-meme-details-btn-box,
  .next-meme-details-btn-box {
    width: 2rem;
    height: 2rem;
    font-size: 1.4rem;
    z-index: 95;
  }

  .meme-details__left .meme-details__description {
    width: 90%;
    margin: 0 auto;
  }

  .meme-details__left .meme-details__tags {
    width: 90%;
    margin: 0 auto;
  }

  .meme-details__container .close-meme-details {
    top: 0.7rem;
    right: 0.7rem;
    font-size: 1.2rem;
  }
}
</style>
