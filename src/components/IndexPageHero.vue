<template>
  <div class="q-pa-md hero__container">
    <img
      class="q-ma-none logo"
      src="~assets/isfanny-smile-logo.png"
      alt="isfanny logo"
    />
    <div>
      <!-- <h4 class="q-ma-none"><span class="text-weight-bolder">is</span>Fanny</h4> -->
      <h5 class="q-ma-none">
        <span class="">The World of Memes</span>
      </h5>
      <p>Spread a Smile to Everyone</p>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchData: "",
    };
  },
  computed: {
    // ...mapGetters(["searchValue"]),
  },

  methods: {
    // ...mapActions(["fetchSearchValue"]),
    // handleFetchSearchValue() {
    //   if (this.searchData != "") {
    //     this.fetchSearchValue(this.searchData);
    //     this.$router.push({ name: "Search" });
    //   }
    // },
  },
  mounted() {},
};
</script>

<style scoped>
.hero__container {
  background-color: var(--color-white);
  /* background-color: #f6db48; */
  /* background: white url("../assets/pattern1.png") repeat left top; */

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0.4rem 0;

  text-align: center;
  /* box-shadow: 0 1px 3px rgba(128, 128, 128, 0.178); */
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

/* media queries */

@media screen and (max-width: 769px) {
  .hero__container {
    /* margin-top: 0.5rem; */

    /* margin-top: 3rem; */
  }

  .memes__container {
    margin-top: 0.5rem;
  }
}
</style>
