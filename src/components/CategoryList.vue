<template>
  <q-list padding>
    <q-item-label header class="q-mt-md text-weight-bold text-uppercase">
      Category
    </q-item-label>
    <q-separator class="q-my-xs" />
    <q-item
      dense
      v-ripple
      clickable
      data-category="all"
      @click="findMemeCategory"
      class="right-side__category-item"
    >
      <q-item-section avatar>
        <i class="uil uil-grids"></i>
      </q-item-section>
      <q-item-section>
        <q-item-label>All</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSwitchToCategory"]),
  },
  methods: {
    ...mapActions([
      "fetchAllPhotoMemes",
      "fetchMorePhotoMemes",
      "fetchCategory",
      "clearPhotosMemes",
      "clearPage",
      "photoSwitchToCategory",
    ]),

    findMemeCategory(e) {
      const event = e.currentTarget;
      const element = document.querySelectorAll(".right-side__category-item");
      console.log(event.classList);
      for (let i = 0; i < element.length; i++) {
        element[i].style.backgroundColor = "var(--color-white)";
        element[i].style.color = "var(--color-dark)";
        element[i].classList.remove("active");
        element[0].style.borderRadius = "1.5rem 1.5rem 0 0";
        element[17].style.borderRadius = "0 0 1.5rem 1.5rem";
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
    mounted() {},
  },
};
</script>
