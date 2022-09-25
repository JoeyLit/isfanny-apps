<template>
  <div class="hero__container">
    <img
      width="100"
      height="108"
      class="logo"
      src="../assets/isfanny-smile-logo.png"
      alt=""
    />
    <h2>The World of Memes</h2>
    <p>Spread a smile to everyone</p>
    <!-- hero search -->
    <!-- <div class="hero__search">
      <input
        v-model.trim="searchData"
        @keyup.enter="handleFetchSearchValue"
        class="hero__search--input"
        type="text"
        placeholder="Search all memes"
      />
      <router-link
        :to="{
          name: 'Search',
        }"
      >
        <i
          @click="handleFetchSearchValue"
          class="uil uil-search nav__search--icon"
        ></i>
      </router-link>
    </div> -->
    <!-- glowing search -->

    <section class="dark-search-bar">
      <form id="dark-search-bar-form" @submit.prevent="">
        <input
          v-model.trim="searchData"
          @keyup.enter="handleFetchSearchValue"
          type="search"
          placeholder="Search all memes"
          id="dark-search-bar-input"
        />
        <router-link
          :to="{
            name: 'Search',
          }"
        >
          <i
            @click="handleFetchSearchValue"
            class="uil uil-search dark-search--icon"
            s
          ></i>
        </router-link>
      </form>
    </section>
    <!-- End of glowing search -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchData: "",
    };
  },
  computed: {
    ...mapGetters(["searchValue"]),
  },

  methods: {
    ...mapActions(["fetchSearchValue"]),

    handleFetchSearchValue() {
      if (this.searchData != "") {
        this.fetchSearchValue(this.searchData);
        this.$router.push({ name: "Search" });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.hero__container {
  background-color: var(--color-white);
  /* background-color: #f6db48; */
  /* background: white url("../assets/pattern1.png") repeat left top; */

  background-color: var(--color-hero-bg);

  display: flex;
  flex-direction: column;
  align-items: center;

  /* margin-top: 3.6rem; */
  /* padding: 4rem 0; */

  margin-top: 3.6rem;
  margin-bottom: 0.1rem;
  padding: 2.4rem 0;
  text-align: center;
  box-shadow: 0 1px 3px rgba(128, 128, 128, 0.178);
}

.hero__container .logo {
  width: 7rem;
  /* height: auto;
  max-width: 100%; */
}

/* hero title */

.hero__container h2 {
  font-weight: 400;
  font-size: 2rem;
}

/*======== search =========*/

.hero__container .hero__search {
  /* background-color: var(--color-light); */
  /* background-color: rgb(247, 247, 247); */
  background-color: var(--color-white);
  border-radius: 2rem;
  padding: 0.3rem 1.5rem;
  margin: 1.4rem 0 0.8rem 0;
  display: flex;
  align-items: center;

  /* border: 1px solid var(--color-gray); */
  /* box-shadow: 0 0 7px rgba(194, 192, 192, 0.603); */
  box-shadow: 0 1px 7px rgba(143, 143, 143, 0.603);

  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
}

.hero__container .hero__search i {
  font-size: 1.5rem;
  cursor: pointer;
}

.hero__container .hero__search i:hover {
  color: var(--color-primary);
}

.hero__container .hero__search--input {
  /* background-color: var(--color-light); */
  /* background-color: rgb(247, 247, 247); */
  background-color: var(--color-white);
  min-width: 45vw;
  height: 2rem;
  font-size: 1rem;
  padding: 0 1rem;
  color: gray;
  font-size: 1rem;
}

.hero__container .hero__search--input::placeholder {
  color: var(--color-gray);
  font-size: 0.8rem;
}

.hero__container .hero__search--icon-sm {
  /* display: none; */
}

/* media queries */

@media screen and (max-width: 769px) {
  .hero__container {
    /* margin-top: 0.5rem; */

    margin-top: 3rem;
  }

  .memes__container {
    margin-top: 0.5rem;
  }
}

@media screen and (max-width: 480px) {
  .hero__container {
    /* margin-top: 0.3rem; */

    margin-top: 2.95rem;
  }

  /* .hero__container .logo {
    width: 5rem;
  } */

  .hero__container h2 {
    font-weight: 400;
    font-size: 1.2rem;
  }

  .hero__container p {
    font-size: 0.9rem;
  }

  /* search bar media query */

  .hero__container .hero__search {
    background-color: var(--color-white);
    border-radius: 2rem;
    padding: 0.2rem 1.2rem;
    margin: 1.4rem 0 0.8rem 0;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 7px rgba(194, 192, 192, 0.603);
  }

  .hero__container .hero__search--input {
    background-color: var(--color-white);
    max-width: 60vw;
    height: 2rem;
    font-size: 1rem;
    padding: 0 1rem;
  }

  .hero__container .hero__search i {
    font-size: 1.2rem;
  }
}

/* Test search form */

.dark-search-bar {
  /* background:  #141414; */
  /* background:  rgb(0, 1, 19); */
  /* height: 100%; */
  /* position: absolute; */
  text-align: center;
}

.dark-search-bar form {
  background-color: var(--color-white);

  display: inline-block;
  font-size: 0px;
  margin: 15px auto 0;

  position: relative;
  z-index: 1;
  border-radius: 2rem;
}

.dark-search-bar input {
  background-color: var(--color-white);
  border-radius: 2rem 0 0 2rem;

  display: block;
  float: left;
  font-size: 13px;
  font-weight: 400;
  height: 40px;
  margin: 0;
  padding: 0 1.5rem;
  color: gray;

  box-shadow: 0 1px 7px rgba(143, 143, 143, 0.603);
  min-width: 55vw;
}

.dark-search-bar input {
  line-height: 40px;
}

.dark-search-bar input::-webkit-input-placeholder {
  color: #888;
}

.dark-search-bar input:-moz-placeholder {
  color: #888;
}

.dark-search-bar input:focus {
  animation: glow 800ms ease-out infinite alternate;

  background-color: var(--color-light);

  color: #888;

  outline: none;
}

.dark-search-bar input:focus::-webkit-input-placeholder {
  color: var(--color-dark);
}

.dark-search-bar input:focus:-moz-placeholder {
  color: var(--color-dark);
}

.dark-search-bar .dark-search--icon {
  padding: 0;
  /* position: absolute; */
  position: relative;
  /* left: 0.5rem; */
  /* font-size: 1.5rem; */
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  color: var(--color-dark);

  height: 40px;
  font-size: 1.1rem;
  border-radius: 0 2rem 2rem 0;

  margin: 0;
  padding: 0.5rem 10px;
  box-shadow: 0 1px 7px rgba(143, 143, 143, 0.603);
}

.dark-search-bar .dark-search--icon:hover {
  color: var(--color-primary);
}

@keyframes glow {
  0% {
    /* border-color: rgb(70, 51, 153); */
    box-shadow: 0 0 5px rgba(0, 38, 255, 0.2),
      inset 0 0 1px rgba(4, 0, 255, 0.1);
  }
  100% {
    border-color: var(--color-primary);
    box-shadow: 0 0 10px rgba(0, 26, 255, 0.6),
      inset 0 0 4px rgba(47, 0, 255, 0.219);
  }
  /* 0% {
    border-color: rgb(70, 51, 153);
    box-shadow: 0 0 5px rgba(0, 38, 255, 0.2),
      inset 0 0 5px rgba(4, 0, 255, 0.1), 0 2px 0 #000;
  }
  100% {
    border-color: rgb(21, 0, 211);
    box-shadow: 0 0 20px rgba(0, 26, 255, 0.6),
      inset 0 0 10px rgba(47, 0, 255, 0.4), 0 2px 0 #000;
  } */
}

/* end of search bar */
</style>
