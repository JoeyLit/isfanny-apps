<template>
  <div class="memes__container">
    <!-- Error alert -->
    <div>
      <Alert v-if="apiErrors === 'Failed to load all memes'" />
      <!-- <p class="alert-mini" v-if="apiErrors === 'Failed to load all memes'">
        😭{{ apiErrors }}
      </p> -->
    </div>
    <!-- Error alert -->

    <div v-if="allRandomMemes.length > 0" class="meme__cards">
      <MemeItem
        v-for="(meme, index) in allRandomMemes"
        :index="index"
        :key="meme._id"
        :imageURL="meme.imageURL"
        :type="meme.type"
        :description="meme.description"
        :memeId="meme._id"
        :public_id="meme.public_id"
        :media_details="meme.media_details"
        class="meme__cards--item"
      />
    </div>
    <!-- show placeholder if memes aer unavailable -->
    <div v-else>
      <p style="text-align: center; margin: 1rem; color: var(--color-dark)">
        Be prepared to laugh whiles you wait... It will be worth it!
      </p>
      <div class="meme__cards">
        <div class="meme__cards--item">
          <InstagramLoader />
        </div>
        <div class="meme__cards--item">
          <InstagramLoader />
        </div>
        <div class="meme__cards--item">
          <InstagramLoader />
        </div>
        <div class="meme__cards--item">
          <InstagramLoader />
        </div>
        <div class="meme__cards--item">
          <InstagramLoader />
        </div>
        <div class="meme__cards--item">
          <InstagramLoader />
        </div>
      </div>
    </div>

    <Loader v-if="isLoadingMeme" />

    <!-- Error alert -->
    <Alert
      style="margin-top: 1.5rem"
      v-if="apiErrors === 'Failed to load more memes'"
    />
    <!-- <Alert /> -->

    <!-- button 85 -->
    <div v-if="!isLoadingMeme" style="display: flex; justify-content: center">
      <button @click="loadMore" class="button-85" role="button">
        Load more
      </button>
    </div>
    <!-- <p class="alert-mini" v-if="apiErrors === 'Failed to load more memes'">
      😭{{ apiErrors }}
    </p> -->

    <!-- button 85 -->
  </div>
</template>

<script>
import MemeItem from "../components/MemeItem.vue";
import { mapGetters, mapActions } from "vuex";
import { InstagramLoader } from "vue-content-loader";
import Loader from "./Loader.vue";
import Alert from "./Alert.vue";

export default {
  components: { MemeItem, InstagramLoader, Loader, Alert },
  data() {
    return {
      isLoadingMeme: false,
    };
  },
  computed: {
    ...mapGetters(["allRandomMemes", "apiErrors"]),
  },
  methods: {
    ...mapActions(["fetchAllRandomMemes", "fetchMoreRandomMemes"]),

    async loadMore() {
      this.isLoadingMeme = true;
      await this.fetchMoreRandomMemes();
      this.isLoadingMeme = false;
    },
  },
  mounted() {
    if (this.allRandomMemes.length === 0) {
      this.fetchAllRandomMemes();
    }
  },
};
</script>

<style>
/* .alert-mini {
  background-color: var(--bg-alert);
  color: var(--color-alert);
  text-align: center;
  font-size: 0.9rem;
  border-radius: 8px;
  margin-bottom: 0.3rem;
  padding: 0.2rem 0;
} */

.memes__container {
  width: 86%;
  margin: 3rem auto 0 auto;
}

.memes__container .meme__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.3rem;
}

/* button */

.button-85 {
  margin: 2rem;
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

/* media queries */

@media screen and (max-width: 850px) {
  /* .memes__container {
    width: 88%;
  } */
}

@media screen and (max-width: 769px) {
  .memes__container {
    width: 86%;
  }

  .memes__container .meme__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media screen and (max-width: 650px) {
  .memes__container {
    width: 88%;
  }
}

@media screen and (max-width: 480px) {
  .memes__container {
    width: 90%;

    margin: 2rem auto 0 auto;
  }

  .memes__container .meme__cards {
    grid-template-columns: 1fr;
  }
}
</style>
