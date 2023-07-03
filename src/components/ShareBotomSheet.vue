<template>
  <div class="q-pa-md q-gutter-sm">
    <p>{{ description }}</p>
    <q-btn no-caps push color="primary" label="Share" @click="show()" />
  </div>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  props: ["description"],
  data() {
    return {
      desc: this.description,
    };
  },
  methods: {
    hey() {
      console.log("hey there");
    },
  },
  setup() {
    const $q = useQuasar();

    function show(grid) {
      $q.bottomSheet({
        message: "Share this meme",
        grid,
        actions: [
          {
            label: `Drive`,
            img: "https://cdn.quasar.dev/img/logo_drive_128px.png",
            id: "drive",
            href: "https://google.com",
          },
          {
            label: "Keep",
            img: "https://cdn.quasar.dev/img/logo_keep_128px.png",
            id: "keep",
          },
          {
            label: "Google Hangouts",
            img: "https://cdn.quasar.dev/img/logo_hangouts_128px.png",
            id: "calendar",
          },
          {
            label: "Calendar",
            img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
            id: "calendar",
          },
        ],
      })
        .onOk((action) => {
          console.log("Action chosen:", action.href);
        })
        .onCancel(() => {
          // console.log('Dismissed')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    return { show };
  },
};
</script>
