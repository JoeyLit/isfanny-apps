<template>
  <div class="" style="outline: 2px solid var(--color-light)">
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
      active-color="blue-9"
      no-caps
      dense
      class="color-deep"
    >
      <q-route-tab
        :to="{ name: 'Home' }"
        name="home"
        icon="home"
        label="Home"
      />
      <q-route-tab
        :to="{ name: 'Videos' }"
        name="videos"
        icon="movie"
        label="Videos"
      />
      <q-route-tab
        :to="{ name: 'Photos' }"
        name="photos"
        icon="camera"
        label="Photos"
      />
      <q-route-tab
        :to="{ name: 'Gifs' }"
        name="gifs"
        icon="image"
        label="GIFs"
      />
      <q-route-tab
        :to="{ name: 'Texts' }"
        name="texts"
        icon="print"
        label="Texts"
      />
    </q-tabs>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("mails"),
    };
  },
};
</script>
