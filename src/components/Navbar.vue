<template>
  <div>
    <div
      class="nav__backdrop"
      v-if="this.isNavFilterOpen || this.isNavSortOpen"
      @click="backdropHandler"
    ></div>
    <div
      class="search__backdrop"
      @click="searchBackdropHandler"
      v-if="isSmallNavSearchOpen"
    ></div>
    <div class="nav__container">
      <i
        class="uil uil-bars nav__container--menu"
        @click="$emit('open-menu-bar')"
      ></i>
      <!-- nav logo -->
      <router-link :to="{ name: 'Home' }" class="nav__logo">
        <img
          v-if="darkTheme"
          class="logo"
          src="../assets/isFanny_nav_logo_dark_.png"
          alt=""
        />
        <img
          v-else
          class="logo"
          src="../assets/isFanny_nav_logo_white_.png"
          alt=""
        />
      </router-link>

      <!-- nav search -->
      <div class="nav__search" @click="searchFocus">
        <input
          v-model.trim="searchData"
          @keyup.enter="handleFetchSearchValue"
          class="nav__search--input"
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
      </div>

      <!-- nav right -->
      <div class="nav__right">
        <!-- search icon for tablets and small devices -->
        <transition name="slide-fade">
          <div class="nav__search-sm" v-show="isSmallNavSearchOpen">
            <input
              v-model.trim="searchData"
              @keyup.enter="handleFetchSearchValue"
              class="nav__search--input"
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
                class="uil uil-search nav__search--icon-sm-variant"
              ></i>
            </router-link>
          </div>
        </transition>
        <i
          class="uil uil-search nav__search--icon-sm"
          @click="toggleSmallNavSearch"
          v-if="!isSmallNavSearchOpen"
        ></i>
        <div class="nav__filter">
          <div class="filter-toggler" @click="filterToggler">
            <p>Filter</p>
            <i class="uil uil-filter filter-icon"></i>
          </div>
          <transition name="dropdown-fade">
            <div v-if="isNavFilterOpen" class="nav__filter--dropdown">
              <router-link :to="{ name: 'Home' }">
                <div class="nav__filter--dropdown-item">
                  <div>
                    <i class="uil uil-apps"></i>
                    <p>All</p>
                  </div>
                </div>
              </router-link>
              <router-link :to="{ name: 'Videos' }">
                <div class="nav__filter--dropdown-item">
                  <div>
                    <i class="uil uil-film"></i>
                    <p>Video</p>
                  </div>
                </div>
              </router-link>
              <router-link :to="{ name: 'Photos' }">
                <div class="nav__filter--dropdown-item">
                  <div>
                    <i class="uil uil-image"></i>
                    <p>Photo</p>
                  </div>
                </div>
              </router-link>
              <router-link :to="{ name: 'Gifs' }">
                <div class="nav__filter--dropdown-item">
                  <div>
                    <i class="uil uil-image"></i>
                    <p>Gif</p>
                  </div>
                </div>
              </router-link>
              <router-link :to="{ name: 'Texts' }">
                <div class="nav__filter--dropdown-item">
                  <div>
                    <i class="uil uil-file-alt"></i>
                    <p>Text</p>
                  </div>
                </div>
              </router-link>
            </div>
          </transition>
        </div>

        <!-- nav sort -->
        <div class="nav__sort">
          <div class="sort-toggler" @click="sortToggler">
            <p>Sort by</p>
            <i class="uil uil-sort"></i>
          </div>
          <transition name="dropdown-fade">
            <div class="nav__sort--dropdown" v-show="isNavSortOpen">
              <div
                @click="getSortData"
                data-sort="-createdAt"
                class="nav__sort--dropdown-item"
              >
                Newest
              </div>
              <div
                @click="getSortData"
                data-sort="createdAt"
                class="nav__sort--dropdown-item"
              >
                Oldest
              </div>
            </div>
          </transition>
        </div>
        <!-- theme -->
        <div class="nav__theme" @click="themeToggler">
          <i class="uil uil-sun sun-icon active"></i>
          <i class="uil uil-moon moon-icon"></i>
        </div>
        <!-- Authentication -->
        <!-- <div class="nav__auth">
          <p class="login">Login</p>
          <p class="logout">Sign up</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isNavFilterOpen: false,
      isNavSortOpen: false,
      isNavSearchBarShowing: false,
      isSmallNavSearchOpen: false,
      sortValue: "",
      isSearchFocus: false,
      searchData: "",
    };
  },
  computed: {
    ...mapGetters(["getSort", "searchValue", "getThemeColor"]),
    sortComputed() {
      return this.getSort;
    },
    darkTheme() {
      return this.getThemeColor;
    },
  },
  watch: {
    sortComputed(newValue) {
      this.sortValue = newValue;
    },
  },
  methods: {
    ...mapActions(["fetchSort", "fetchSearchValue", "fetchThemeColor"]),
    getSortData(e) {
      const event = e.currentTarget;
      const sortData = event.getAttribute("data-sort");
      this.fetchSort(sortData);
      const sortDropdownItem = document.querySelectorAll(
        ".nav__sort--dropdown-item"
      );
      sortDropdownItem.forEach((item) => {
        item.style.backgroundColor = "var(--color-white)";
        item.style.color = "var(--color-dark)";
      });
      console.log(this.sortValue);
      if (this.getSort === sortData) {
        event.style.backgroundColor = "var(--color-primary)";
        event.style.color = "white";
      }
    },
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
    filterToggler() {
      this.isNavSortOpen = false;
      this.isNavFilterOpen = !this.isNavFilterOpen;
    },
    sortToggler() {
      this.isNavFilterOpen = false;
      this.isNavSortOpen = !this.isNavSortOpen;
    },
    backdropHandler() {
      this.isNavSortOpen = false;
      this.isNavFilterOpen = false;
    },
    searchBackdropHandler() {
      this.isSmallNavSearchOpen = false;
    },
    scrollRevealNavSearch() {
      const scrollAPI = document.documentElement;
      window.onscroll = function () {
        if (scrollAPI.scrollTop >= "230") {
          document.querySelector(".nav__search").style.display = "flex";
        } else if (scrollAPI.scrollTop <= "229") {
          document.querySelector(".nav__search").style.display = "none";
        }
      };
    },
    toggleSmallNavSearch() {
      document.querySelector(".nav__logo").style.display = "none";

      this.isSmallNavSearchOpen = !this.isSmallNavSearchOpen;
      document.querySelector(".nav__logo").style.display = "block";
    },
    searchFocus(e) {
      this.isSearchFocus = !this.isSearchFocus;
      const event = e.currentTarget;
      if (this.isSearchFocus) {
        event.style.border = "0.5px solid blue";
      } else {
        event.style.border = "0";
      }
    },
    handleFetchSearchValue() {
      if (this.searchData != "") {
        this.fetchSearchValue(this.searchData);
        this.$router.push({ name: "Search" });
      }
    },
  },
  mounted() {
    // this.scrollRevealNavSearch();
  },
};
</script>

<style scoped>
.nav__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100%;
  height: 100vh;
  z-index: 98;
}

.nav__container {
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.6rem;
  width: 100%;
  /* box-shadow: 0 1px 3px rgba(128, 128, 128, 0.438); */

  /* transition: all 0.3s ease-in; */

  position: fixed;
  top: 0;
  z-index: 99;
}

.nav__container .nav__container--menu {
  display: none;
  margin-left: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}

.nav__container .nav__logo {
  margin-left: 0.5rem;
}

.nav__container .logo {
  width: 6.2rem;
  position: relative;
}

/*======== search =========*/

.nav__container .nav__search {
  background-color: var(--color-light);
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  /* display: none; */
  /* transition: all 0.2s ease; */
  border: 0.5px solid rgba(128, 128, 128, 0.164);
}

.nav__container .nav__search--input {
  background-color: var(--color-light);
  min-width: 40vw;
  color: gray;
  font-size: 0.9rem;
}

.nav__container .nav__search--input::placeholder {
  color: var(--color-gray);
  font-size: 0.8rem;
}

.nav__container .nav__search-sm {
  display: none;
}

.nav__container .nav__search--icon-sm {
  display: none;
}

/*======== Nav Right Section =========*/
.nav__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/*======== Nav Filter =========*/

.nav__container .nav__filter {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  margin-left: 1rem;
}

.nav__container .nav__filter .filter-toggler {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
}

.nav__container .nav__filter .filter-toggler p {
  font-size: 0.9rem;
  cursor: pointer;
}

.nav__container .nav__filter .nav__filter--dropdown {
  position: absolute;
  background-color: var(--color-white);
  top: 3rem;
  left: -2.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--memeitem-box-shadow);
  display: block;
}

.nav__container .nav__filter .nav__filter--dropdown::before {
  position: absolute;
  display: block;
  content: "";
  top: -0.5rem;
  left: 45%;
  transform: rotate(45deg);
  width: 1rem;
  height: 1rem;
  background-color: var(--color-white);
}

.nav__container .nav__filter .nav__filter--dropdown a {
  color: var(--color-black);
}

.nav__container
  .nav__filter
  .nav__filter--dropdown
  .nav__filter--dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.3rem 1.4rem 0.3rem 1.4rem;
  cursor: pointer;
  margin: 0;
}

.nav__container
  .nav__filter
  .nav__filter--dropdown
  .nav__filter--dropdown-item:nth-child(1) {
  margin-top: 0.7rem;
}

.nav__container
  .nav__filter
  .nav__filter--dropdown
  .nav__filter--dropdown-item:nth-child(4) {
  margin-bottom: 0.4rem;
}

.nav__container
  .nav__filter
  .nav__filter--dropdown
  .nav__filter--dropdown-item:hover {
  background-color: var(--color-light);
  color: var(--color-primary);
}

.nav__container
  .nav__filter
  .nav__filter--dropdown
  .nav__filter--dropdown-item
  > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
}

.nav__container
  .nav__filter
  .nav__filter--dropdown
  .nav__filter--dropdown-item
  > div
  p {
  font-size: 0.9rem;
}

/* dropdown transition */
.dropdown-fade-enter-active {
  transition: all 0.1s ease-out;
}

.dropdown-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* end of dropdown transition */

/*======== Nav sort =========*/

.nav__container .nav__sort {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
}

.nav__container .nav__sort .sort-toggler {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
}

.nav__container .nav__sort .sort-toggler p {
  font-size: 0.9rem;
}

.nav__container .nav__sort p {
  font-size: 0.9rem;
}

/* sort dropdown */

.nav__container .nav__sort .nav__sort--dropdown {
  position: absolute;
  background-color: var(--color-white);
  top: 3rem;
  left: -1.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--memeitem-box-shadow);
  /* display: none; */
}

.nav__container .nav__sort .nav__sort--dropdown::before {
  position: absolute;
  display: block;
  content: "";
  top: -0.5rem;
  left: 45%;
  transform: rotate(45deg);
  width: 1rem;
  height: 1rem;
  background-color: var(--color-white);
}

.nav__container .nav__sort .nav__sort--dropdown .nav__sort--dropdown-item {
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 1.4rem 0.3rem 1.4rem;
  margin: 0;
}

.nav__container
  .nav__sort
  .nav__sort--dropdown
  .nav__sort--dropdown-item:nth-child(1) {
  margin-top: 0.6rem;
}

.nav__container
  .nav__sort
  .nav__sort--dropdown
  .nav__sort--dropdown-item:nth-child(2) {
  margin-bottom: 0.4rem;
}

.nav__container
  .nav__sort
  .nav__sort--dropdown
  .nav__sort--dropdown-item:hover {
  background-color: var(--color-light);
  color: var(--color-primary);
}

/*======== Nav theme =========*/

.nav__container .nav__theme {
  cursor: pointer;
  background-color: var(--color-light);
  border-radius: 0.2rem;
  /* new style */
  border: 0.5px solid rgba(128, 128, 128, 0.164);
  border-radius: 1.5rem;
  padding: 0.1rem 0.3rem;
  margin-right: 0.5rem;
}

.nav__container .nav__theme i {
  border-radius: 5px;
  padding: 0 0.25rem;
  font-size: 1.1rem;
  display: inline-block;
}

.nav__container .nav__theme i:hover {
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

.nav__container .nav__theme i.active {
  /* background-color: var(--color-primary); */
  /* color: var(--color-light); */
  color: var(--color-primary);
}

/*======== Nav auth =========*/

.nav__container .nav__auth {
  display: flex;
  align-items: center;
  /* margin-left: 1rem; */
  margin-right: 0.5rem;
  gap: 1rem;

  /* font-weight: 500; */
}

.nav__container .nav__auth p {
  font-size: 0.8rem;
  cursor: pointer;
}

.nav__container .nav__auth .logout {
  border: 1px solid var(--color-primary);
  padding: 0.1rem 0.2rem;
  border-radius: 3px;
  border-style: inset;
}

/* media query */

@media screen and (max-width: 850px) {
  .nav__container .nav__search--input {
    min-width: 30vw;
  }
}

@media screen and (max-width: 769px) {
  .nav__container .nav__search--input {
    min-width: 20vw;
  }
}

@media screen and (max-width: 650px) {
  .nav__container .nav__search--input {
    /* min-width: 10vw; */
  }

  .nav__container .nav__search {
    display: none !important;
  }

  .nav__container .nav__search-sm {
    background-color: var(--color-light);
    border-radius: 1rem;
    padding: 0.2rem 1rem;
    margin: 0.3rem 0.5rem 0.3rem 0;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
  }

  /* slide fade transition for nav search*/
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

  /* End of slide fade transition for nav search*/

  .nav__container .nav__container--menu {
    display: inline-block;
  }

  .nav__container .nav__search--icon-sm {
    display: inline-block;
    cursor: pointer;
  }

  .nav__container .nav__search--icon-sm-variant {
    cursor: pointer;
  }

  .nav__container .nav__filter {
    display: none;
  }

  .nav__container .nav__auth {
    display: none;
  }
  .nav__container .nav__theme {
    display: none;
  }

  .nav__container .nav__sort {
    /* margin-right: 1rem; */
    display: none;
  }

  .nav__search--icon-sm {
    margin-right: 1rem;
    font-size: 1.1rem;
  }

  .search__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    width: 100%;
    height: 100vh;
    z-index: 5;
  }
}

@media screen and (max-width: 480px) {
  .nav__container .nav__search--input {
    max-width: 10rem;
  }
}
</style>
