<template>
  <div class="" style="outline: 3px solid var(--color-light)">
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
        icon="eva-home-outline"
        label="Home"
      />
      <q-route-tab
        :to="{ name: 'Videos' }"
        name="videos"
        icon="eva-video-outline"
        label="Videos"
      />
      <q-route-tab
        :to="{ name: 'Photos' }"
        name="photos"
        icon="eva-camera-outline"
        label="Photos"
      />
      <q-route-tab
        :to="{ name: 'Gifs' }"
        name="gifs"
        icon="eva-image-outline"
        label="GIFs"
      />
      <q-route-tab
        :to="{ name: 'Texts' }"
        name="texts"
        icon="eva-message-square-outline"
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
