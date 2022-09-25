<template>
  <q-page class="">
    <IndexPageHero />
    <!-- <IndexPageTab /> -->
    <IndexPageMemes />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import IndexPageHero from "../components/IndexPageHero.vue";
// import IndexPageTab from "../components/IndexPageTab.vue";
import IndexPageMemes from "../components/IndexPageMemes.vue";

export default defineComponent({
  name: "IndexHero",
  components: { IndexPageHero, IndexPageMemes },
});
</script>
