<template>
  <div class="q-my-sm">
    <div class="">
      <q-tabs
        style="border-radius: 0 0 2rem 2rem"
        v-model="tab"
        dense
        no-caps
        inline-label
        class="bg-white text-grey-9"
      >
        <q-route-tab to="/" name="all" label="All" />
        <q-route-tab to="/videos" name="movies" label="Movies" />
        <q-tab name="Photos" label="Photos" />
        <q-tab name="GIFs" label="GIFs" />
        <q-tab name="Texts" label="Texts" />
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("all"),
    };
  },
};
</script>
