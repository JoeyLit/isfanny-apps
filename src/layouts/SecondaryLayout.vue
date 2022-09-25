<template>
  <q-layout view="hHh lpR fFf" class="color-light">
    <div
      class="search__backdrop"
      @click="searchBackdropHandler"
      v-if="isSmallNavSearchOpen"
    ></div>
    <q-header
      height-hint="58"
      class="color-deep"
      style="outline: 2px solid var(--color-light)"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn
          v-if="!isSmallNavSearchOpen"
          flat
          no-caps
          no-wrap
          class="q-ml-xs"
        >
          <img
            src="~assets/isfanny-smile-logo.png"
            style="width: 30px; height: 29px"
            alt="isfanny logo"
          />
          <span class="q-ml-xs text-h6 isfanny-logo-text">is</span
          ><span class="text-h6 text-weight-bold isfanny-logo-text">Fanny</span>
        </q-btn>

        <q-space />

        <div
          v-if="$q.screen.gt.xs"
          class="YL__toolbar-input-container row no-wrap"
        >
          <q-input
            dense
            clearable
            clear-icon="close"
            standout="bg-grey-9 text-white"
            v-model="search"
            placeholder="Search"
            class="col"
            style="background: var(--color-light)"
          >
            <template v-slot:append>
              <q-icon name="search" style="color: var(--color-black)" />
            </template>
          </q-input>
        </div>

        <div
          v-if="isSmallNavSearchOpen"
          class="YL__toolbar-input-container row no-wrap"
        >
          <q-input
            dense
            clearable
            clear-icon="close"
            outlined
            rounded
            v-model="search"
            placeholder="Search"
            class="col"
          >
            <template v-slot:append>
              <q-icon name="search" style="color: var(--color-dark)" />
            </template>
          </q-input>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat icon="filter" v-if="$q.screen.gt.sm">
            <q-tooltip>Filter</q-tooltip>
          </q-btn>

          <q-btn round dense flat icon="sort" v-if="$q.screen.gt.sm">
            <q-tooltip>Sort by</q-tooltip>
          </q-btn>
          <q-btn
            @click="toggleSmallNavSearch"
            v-if="$q.screen.lt.sm && !isSmallNavSearchOpen"
            round
            dense
            flat
            icon="search"
          >
            <q-tooltip>Search</q-tooltip>
          </q-btn>
          <!-- <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn> -->

          <!-- theme -->
          <div class="nav__theme" @click="themeToggler">
            <i class="uil uil-sun sun-icon active"></i>
            <i class="uil uil-moon moon-icon"></i>
            <q-tooltip>Theme</q-tooltip>
          </div>
          <!-- <q-btn
            v-if="$q.screen.lt.sm"
            @click="toggleRightDrawer"
            round
            dense
            flat
            icon="menu"
          >
      
          </q-btn> -->
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="240" class="color-deep">
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- <q-item v-if="$q.screen.lt.md">
            <q-btn flat no-caps no-wrap class="">
              <img
                src="~assets/isfanny-smile-logo.png"
                style="width: 40px; height: 40px"
                alt="isfanny logo"
              />
              <q-item-section class="text-weight-bold">
                <q-item-label>isFanny</q-item-label>
              </q-item-section>
            </q-btn>
          </q-item> -->
          <q-btn
            :to="{
              name: 'Home',
            }"
            flat
            no-caps
            no-wrap
            class=""
            v-if="$q.screen.lt.md"
          >
            <img
              src="~assets/isfanny-smile-logo.png"
              style="width: 30px; height: 30px"
              alt="isfanny logo"
            />

            <q-toolbar-title shrink class="text-weight-bold">
              isFanny
            </q-toolbar-title>
          </q-btn>

          <q-separator v-if="$q.screen.lt.md" class="q-my-md" />

          <q-item
            v-for="link in links1"
            :to="link.to"
            :key="link.text"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Category
          </q-item-label>

          <q-item
            v-for="link in links2"
            :to="link.to"
            :key="link.text"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- right drawer -->
    <!-- <q-drawer
      v-model="rightDrawerOpen"
      elevated
      overlay
      side="right"
      :width="240"
      class="color-deep"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="q-mt-md text-weight-bold text-uppercase">
            Filter
          </q-item-label>
          <q-separator class="q-my-xs" />

          <q-item
            data-category="all"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-grids"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>All</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="education"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-book-open"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Education</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="music"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-music"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Music</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="movies"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-film"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Movies & TV</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="love"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-heart"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Love & Romance</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="sports"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-basketball"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Sports & Games</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="comedy"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-laughing"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Comedy</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="technology"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-robot"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Science & Technology</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="animals"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-cloud-sun"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Animals & Nature</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="politics"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-balance-scale"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Politics</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="celebrities"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-user-check"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Celebrities</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="religion"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-yin-yang"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Culture & Religion</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="fails"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-times-circle"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Fails</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="kids"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-baby-carriage"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Kids & Teens</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="adult"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-18-plus"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Adult</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="social"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-comments"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Social</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="food"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-pizza-slice"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Food</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            data-category="other"
            @click="findMemeCategory"
            dense
            v-ripple
            clickable
            class="right-side__category-item"
          >
            <q-item-section avatar>
              <i class="uil uil-folder-question"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Others</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <FooterTab v-if="$q.screen.lt.sm" />
      <!-- <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar> -->
    </q-footer>
  </q-layout>
</template>

<script>
import FooterTab from "../components/FooterTab.vue";
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyLayout",
  components: { FooterTab },
  data() {
    return {
      isSmallNavSearchOpen: false,
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    function toggleRightDrawer() {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    }

    return {
      fabYoutube,
      leftDrawerOpen,
      rightDrawerOpen,
      search,
      toggleRightDrawer,
      toggleLeftDrawer,
      links1: [{ icon: "home", text: "Home", to: { name: "Home" } }],

      links2: [
        { icon: fabYoutube, text: "Videos", to: { name: "Videos" } },
        { icon: "image", text: "Photos", to: { name: "Photos" } },
        { icon: "photo", text: "GIFs", to: { name: "Gifs" } },
        { icon: "print", text: "Texts", to: { name: "Texts" } },
      ],
      links3: [{ icon: "help", text: "About" }],
    };
  },
  computed: {
    ...mapGetters(["getThemeColor", "getSwitchToCategory"]),

    darkTheme() {
      return this.getThemeColor;
    },
  },
  methods: {
    ...mapActions([
      "fetchThemeColor",
      "fetchAllPhotoMemes",
      "fetchMorePhotoMemes",
      "fetchCategory",
      "clearPhotosMemes",
      "clearPage",
      "photoSwitchToCategory",
    ]),
    themeToggler() {
      document.body.classList.toggle("dark__theme--variable");
      document.querySelector(".moon-icon").classList.toggle("active");
      document.querySelector(".sun-icon").classList.toggle("active");
      if (this.getThemeColor === false) {
        this.fetchThemeColor(true);
      } else if (this.getThemeColor === true) {
        this.fetchThemeColor(false);
      }
    },
    toggleSmallNavSearch() {
      this.isSmallNavSearchOpen = !this.isSmallNavSearchOpen;
    },
    searchBackdropHandler() {
      this.isSmallNavSearchOpen = false;
    },
    findMemeCategory(e) {
      const event = e.currentTarget;
      const element = document.querySelectorAll(".right-side__category-item");
      console.log(event.classList);
      for (let i = 0; i < element.length; i++) {
        element[i].style.backgroundColor = "var(--color-white)";
        element[i].style.color = "var(--color-dark)";
        element[i].classList.remove("active");
      }
      event.style.backgroundColor = "var(--color-light)";
      event.style.color = "var(--color-primary)";
      event.classList.add("active");

      const dataCategory = event.getAttribute("data-category");
      console.log(dataCategory);

      this.clearPhotosMemes();
      this.photoSwitchToCategory(true);
      this.clearPage();
      this.fetchCategory(dataCategory);
    },
  },
};
</script>

<style scoped>
.search__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.219);
  width: 100%;
  height: 100vh;
  z-index: 5;
}

.YL__toolbar-input-container {
  min-width: 100px;
  width: 55%;
}

.YL__toolbar-input-btn {
  border-radius: 0;
  border-style: solid;
  border-width: 1px 1px 1px 0;
  border-color: rgba(0, 0, 0, 0.24);
  max-width: 60px;
  width: 100%;
}

/*======== Nav theme =========*/

.nav__theme {
  cursor: pointer;
  background-color: var(--color-light);
  border-radius: 0.2rem;
  /* new style */
  border: 0.5px solid rgba(128, 128, 128, 0.164);
  border-radius: 1.5rem;
  padding: 0.1rem 0.3rem;
  margin-right: 0.5rem;
}

.nav__theme i {
  border-radius: 5px;
  padding: 0 0.25rem;
  font-size: 1.1rem;
  display: inline-block;
}

.nav__theme i:hover {
  animation: theme-rotate 3s infinite ease-in-out;
}

@keyframes theme-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.nav__theme i.active {
  /* background-color: var(--color-primary); */
  /* color: var(--color-light); */
  color: var(--color-primary);
}

@media screen and (max-width: 280px) {
  .isfanny-logo-text {
    display: none;
  }
}
</style>
