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
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu"
          ><i style="font-size: 1.2rem" class="uil uil-bars"></i
        ></q-btn>

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

        <q-btn
          v-if="$q.screen.gt.sm"
          color="primary"
          icon="eva-plus-square-outline"
          label="Post Meme"
          :to="{ name: 'AddPost' }"
        />
        <q-btn
          style="font-size: 0.6rem"
          v-if="$q.screen.lt.md"
          color="primary"
          icon="eva-plus-square-outline"
          :to="{ name: 'AddPost' }"
        />

        <q-space />

        <div
          style="background: var(--color-light); color: var(--color-black)"
          v-if="$q.screen.gt.xs"
          class="YL__toolbar-input-container row no-wrap"
        >
          <q-input
            v-model.trim="searchData"
            @keyup.enter="handleFetchSearchValue"
            dense
            clearable
            clear-icon="close"
            placeholder="Search"
            standout="bg-grey-9 text-white"
            class="col"
            style="border: 1px solid rgba(255, 255, 255, 0.1)"
          >
            <template v-slot:append>
              <q-icon
                @click="handleFetchSearchValue"
                :to="{
                  name: 'Search',
                }"
                style="color: var(--color-dark)"
                ><i style="font-size: 1.2rem" class="uil uil-search"></i
              ></q-icon>
            </template>
          </q-input>
        </div>

        <div
          v-if="isSmallNavSearchOpen"
          class="YL__toolbar-input-container row no-wrap"
          style="border: 1px solid rgba(255, 255, 255, 0.1)"
        >
          <q-input
            v-model.trim="searchData"
            @keyup.enter="handleFetchSearchValue"
            dense
            clearable
            clear-icon="close"
            outlined
            v-model="search"
            standout="bg-grey-9 text-white"
            placeholder="Search"
            class="col text-secondary"
          >
            <template v-slot:append>
              <q-icon
                @click="handleFetchSearchValue"
                :to="{
                  name: 'Search',
                }"
                style="color: var(--color-dark); cursor: pointer"
                ><i style="font-size: 1.2rem" class="uil uil-search"></i
              ></q-icon>
            </template>
          </q-input>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            @click="toggleSmallNavSearch"
            v-if="$q.screen.lt.sm && !isSmallNavSearchOpen"
            round
            dense
            flat
            style="color: var(--color-dark)"
          >
            <i style="font-size: 1.2rem" class="uil uil-search"></i>
          </q-btn>
          <!-- <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn> -->

          <!-- theme -->
          <div class="nav__theme" @click="themeToggler">
            <i class="uil uil-sun sun-icon"></i>
            <i class="uil uil-moon moon-icon active"></i>
          </div>
          <i
            @click="closeMemeDetails"
            v-if="$route.name === 'meme-details'"
            class="uil uil-arrow-left close-meme-details"
          ></i>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
      overlay
      :width="240"
      class="color-deep"
    >
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

          <q-item
            v-for="link in links3"
            :key="link.text"
            :to="link.to"
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
          <q-item @click="handleLogout" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="eva-log-out-outline" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item>
            <q-item-section>
              <q-item-label @click="handleLogout">Logout</q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />

      <!-- <transition
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideInLeft"
        appear
        :duration="300"
      >
        <router-view />
      </transition> -->
    </q-page-container>

    <q-footer>
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
// import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyLayout",
  components: { FooterTab },
  data() {
    return {
      isSmallNavSearchOpen: false,
      searchData: "",
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      // fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        { icon: "eva-home-outline", text: "Home", to: { name: "Home" } },
      ],

      links2: [
        { icon: "eva-video-outline", text: "Videos", to: { name: "Videos" } },
        { icon: "eva-camera-outline", text: "Photos", to: { name: "Photos" } },
        { icon: "eva-image-outline", text: "GIFs", to: { name: "Gifs" } },
        {
          icon: "eva-message-square-outline",
          text: "Texts",
          to: { name: "Texts" },
        },
      ],
      links3: [
        {
          icon: "eva-question-mark-circle-outline",
          text: "About",
          to: { name: "About" },
        },
        { icon: "eva-log-in-outline", text: "Login", to: { name: "Login" } },
        {
          icon: "eva-upload-outline",
          text: "Sign up",
          to: { name: "Register" },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getThemeColor", "searchValue"]),

    darkTheme() {
      return this.getThemeColor;
    },
  },
  methods: {
    ...mapActions(["fetchThemeColor", "fetchSearchValue"]),
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
    closeMemeDetails() {
      this.$router.back();
    },
    handleFetchSearchValue() {
      if (this.searchData != "") {
        this.fetchSearchValue(this.searchData);
        this.$router.push({ name: "Search" });
      }
    },
    handleLogout() {
      localStorage.removeItem("token");
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

.close-meme-details {
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--color-black);
  background-color: var(--color-light);
  border-radius: 5px;
  border: 0.5px solid rgba(128, 128, 128, 0.164);

  padding: 0 0.4rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  /* z-index: 1000; */
}

.close-meme-details:hover {
  background-color: var(--color-primary);
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
