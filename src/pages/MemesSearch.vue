<template>
  <div>
    <div class="memes__container">
      <div v-if="allSearchMemes.length !== 0">
        <div class="search__results">
          <p>Search results for "{{ searchValue }}"</p>
        </div>
        <div class="meme__cards">
          <SearchMemeItem
            v-for="(meme, index) in allSearchMemes"
            :index="index"
            :key="meme._id"
            :imageURL="meme.imageURL"
            :type="meme.type"
            :description="meme.description"
            :memeId="meme._id"
            :public_id="meme.public_id"
            :media_details="meme.media_details"
            :createdAt="meme.createdAt"
            class="meme__cards--item"
          />
        </div>
        <LoaderIsfanny v-if="isLoadingMeme" />
        <!-- button 85 -->
        <div
          v-if="!isLoadingMeme"
          style="display: flex; justify-content: center"
        >
          <button
            @click="handleFetchMoreSearch"
            class="button-85"
            role="button"
          >
            Load more
          </button>
        </div>
        <!-- End of button 85 -->
      </div>
      <!-- show placeholder if memes are unavailable -->
      <div v-else>
        <div v-if="!isSearching">
          <div
            v-if="allSearchMemes.length === 0"
            class="no-search__results full-bleed"
          >
            <img class="isfanny-sad" src="../assets/isfanny-sad.png" alt="" />
            <h2>Hmmm...</h2>
            <p>
              We couldn't find any matches for
              <span>"{{ searchValue }}" 😕</span>
            </p>
            <p>
              Double check your search for any typos or spelling errors or try a
              different search term.
            </p>
          </div>
        </div>
        <!-- show all memes instead -->
        <!-- <div class="show-all-memes-instead">
          <p class="show-all-memes-instead__para">
            You may also browse our recent memes
          </p>
          <div class="meme__cards">
            <MemeItem
              v-for="(meme, index) in allMemes"
              :index="index"
              :key="meme._id"
              :imageURL="meme.imageURL"
              :type="meme.type"
              :description="meme.description"
              :memeId="meme._id"
              :public_id="meme.public_id"
              :media_details="meme.media_details"
              :createdAt="meme.createdAt"
              class="meme__cards--item"
            />
          </div>
        </div> -->

        <LoaderIsfanny v-if="isLoadingMeme" />
        <!-- button 85 -->
        <div
          v-if="!isLoadingMeme && allSearchMemes.length !== 0"
          style="display: flex; justify-content: center"
        >
          <button @click="loadMore" class="button-85" role="button">
            Load more
          </button>
        </div>
        <button v-else @click="goHome" class="button-85" role="button">
          Go Home
        </button>
        <!-- End of button 85 -->
      </div>
    </div>
  </div>
</template>

<script>
import SearchMemeItem from "../components/SearchMemeItem.vue";
// import MemeItem from "../components/MemeItem.vue";
import { mapGetters, mapActions } from "vuex";
// import { InstagramLoader } from "vue-content-loader";
import LoaderIsfanny from "../components/LoaderIsfanny.vue";
export default {
  components: { SearchMemeItem, LoaderIsfanny },
  data() {
    return {
      isLoadingMeme: false,
      isSearching: true,
      //   searchValueData: ''
    };
  },
  computed: {
    ...mapGetters([
      "allMemes",
      "hasMemes",
      "pageNumber",
      "searchValue",
      "allSearchMemes",
      "search_pageNumber",
    ]),
    watchSearchValue() {
      return this.searchValue;
    },
  },
  methods: {
    ...mapActions([
      "fetchAllMemes",
      "fetchMoreMemes",
      "fetchAllSearchMemes",
      "fetchMoreSearchMemes",
    ]),

    async loadMore() {
      let page = this.pageNumber + 1;
      let meta = {
        page,
        sort: "-createdAt",
        type: "video",
      };
      this.isLoadingMeme = true;
      await this.fetchMoreMemes(meta);
      this.isLoadingMeme = false;
    },
    async handleFetch() {
      console.log(this.searchValue);
      this.isSearching = true;
      await this.fetchAllSearchMemes(this.searchValue);
      this.isSearching = false;
    },
    async handleFetchMoreSearch() {
      let page = this.search_pageNumber + 1;
      let searchValue = this.searchValue;
      let meta = {
        page,
        sort: "-createdAt",
        type: "video",
        searchValue,
      };
      console.log(searchValue);
      this.isSearching = true;
      await this.fetchMoreSearchMemes(meta);
      this.isSearching = false;
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
  watch: {
    async watchSearchValue(newValue) {
      await this.fetchAllSearchMemes(newValue);
    },
  },
  async created() {},
  mounted() {
    console.log(this.searchValue);
    this.handleFetch();
    // if (this.allSearchMemes.length === 0) {
    //   this.fetchAllSearchMemes(this.searchValue);
    // }
    if (this.allSearchMemes.length === 0) {
      this.fetchAllMemes();
    }
  },
};
</script>

<style>
.memes__container {
  width: 90%;
  margin: 3rem auto 0 auto;
}

.memes__container .meme__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 1.3rem;
}

.search__results {
  text-align: center;
  margin: 2rem 0 1.5rem 0;
  color: var(--color-dark);
}

.search__results p {
  margin-top: 2rem;
}

.no-search__results {
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100vw; */
  margin: 0 0 1.5rem 0;
  padding: 2rem;
  color: var(--color-dark);
  background-color: var(--color-search-bg);
}

/* .full-bleed {
  box-shadow: 0 0 0 100vmax var(--color-search-bg);
  clip-path: inset(0, -100vmax);
} */

.no-search__results span {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.show-all-memes-instead {
  /* position: relative;
  top: 17rem; */
}

.show-all-memes-instead__para {
  text-align: center;
  margin-bottom: 1.5rem;
}

.loadmore-btn {
  text-align: center;
  margin: 2rem 0 3rem 0;
  cursor: pointer;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 3px black;
  border-radius: 0.5rem;
}

.isfanny-sad {
  margin-top: 0.5rem;
  width: 5rem;
}

/* media queries */

@media screen and (max-width: 850px) {
  /* .memes__container {
    width: 88%;
  } */
}

@media screen and (max-width: 769px) {
  .memes__container {
    width: 90%;
  }

  .memes__container .meme__cards {
    grid-template-columns: repeat(3, 1fr);

    gap: 1rem;
  }
}

@media screen and (max-width: 650px) {
  .memes__container {
    width: 92%;
  }

  .memes__container .meme__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .memes__container {
    width: 90%;

    margin: 2rem auto 0 auto;
  }

  .memes__container .meme__cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .search__results {
    text-align: center;
    margin: 2rem 0 1.5rem 0;
    color: var(--color-dark);
  }

  .no-search__results {
    margin: 0rem 0 1.5rem 0;
    color: var(--color-dark);
  }

  .no-search__results span {
    font-size: 1.3rem;
  }

  .isfanny-sad {
    margin-top: 1rem;
    width: 4rem;
  }

  @media screen and (max-width: 300px) {
    .memes__container {
      width: 100%;

      margin: 2rem auto 0 auto;
    }

    .memes__container .meme__cards {
      /* grid-template-columns: 1fr; */
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
}

/* button 85 */

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

/* end of button 85 */
</style>
