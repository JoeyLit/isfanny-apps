<template>
  <div>
    <router-view />
    <ScrollToTop @click="scrollToTopHandler" />
  </div>
</template>

<script>
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { ScrollToTop },

  methods: {
    scrollToTop() {
      window.onscroll = function () {
        const isAtBottom = document.documentElement.scrollTop;

        if (isAtBottom < 2000) {
          document.querySelector(".scroll-to-top-Btn").style.opacity = "0";
        } else {
          document.querySelector(".scroll-to-top-Btn").style.opacity = "1";
        }
      };
    },
    scrollToTopHandler() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    this.scrollToTop();
  },
  async created() {
    try {
      const res = await axios.get(
        "https://meme-api-v1.herokuapp.com/api/v1/auth/me",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
});
</script>

<style>
.dark__theme--variable {
  --color-white: hsl(252, 30%, 100%);
  /* --color-light: hsl(252, 30%, 95%); */
  --color-light: #ecf0f3;
  --color-gray: hsl(252, 15%, 65%);
  /* --color-primary: hsl(252, 75%, 60%); */
  --color-primary: hsl(252, 75%, 60%);
  --color-secondary: hsl(252, 100%, 90%);
  --color-dark: hsl(252, 30%, 17%);
  --color-black: hsl(252, 30%, 10%);

  --font-size-small-title: 0.9rem;

  --color-search-bg: rgba(255, 255, 255, 0.5);
  --color-hero-bg: rgba(255, 255, 255, 0.8);

  --social-btn-box-shadow: 2px 2px 3px gray;

  --new-memes-border: 1px solid rgba(0, 0, 0, 0.226);
  --new-memes-bg: rgba(255, 255, 255, 0.4);
  --new-memes-box-box-shadow: -4px 0 8px rgba(34, 21, 21, 0.486);

  --memeitem-box-shadow: 0 2px 5px rgba(34, 21, 21, 0.486);

  --category-box-shadow: 0 1px 3px rgba(128, 128, 128, 0.438);

  --bg-alert: rgb(242, 222, 222);
  --color-alert: rgb(185, 74, 72);

  --neuro-dark: 16px 16px 32px #151313, -16px -16px 32px #252323;
}

/* mozilla theme */
:root {
  /* --color-white: #2b2a33;
  --color-light: #1c1b22; */
  --color-white: #1b1919;
  --color-light: #000000;
  --color-gray: hsl(252, 15%, 65%);
  --color-primary: hsl(252, 69%, 50%);
  --color-secondary: hsl(252, 100%, 90%);

  --color-dark: hsl(252, 30%, 75%);
  --color-black: hsl(252, 30%, 80%);

  --color-search-bg: rgba(0, 0, 0, 0.5);
  --color-hero-bg: #2b2a33c0;
  /* --color-hero-bg: rgba(0, 0, 0, 0.5); */

  --social-btn-box-shadow: 2px 2px 3px black;

  --new-memes-border: 1px solid rgba(255, 255, 255, 0.486);
  --new-memes-bg: #2b2a337e;
  --new-memes-box-box-shadow: -4px 0 8px black;

  --memeitem-box-shadow: 0 2px 5px rgb(0, 0, 0);

  --category-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.438);

  --bg-alert: rgb(34, 0, 0);
  --color-alert: rgb(255, 181, 181);
}

.color-light {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.color-deep {
  background-color: var(--color-white);
  color: var(--color-black);
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

img,
video {
  display: block;
  width: 100%;
}

::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: transparent;
}

/* Regular scroll bar */
::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border: 1px solid #f1f1f1;
}

/* End of scroll Bar style */
</style>
