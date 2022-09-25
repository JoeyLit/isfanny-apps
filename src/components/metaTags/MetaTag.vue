<template>
  <div>
    <Head>
      <!-- Primary Meta Tags -->
      <!-- <title>isFanny - The world of Memes</title> -->

      <meta name="fragment" content="!" />

      <meta
        name="description"
        content="isFanny is a meme hosting platform where you will find the funniest memes, videos, images, GIFs, and text served up in an endless fashion"
      />
      <meta
        name="keywords"
        content="funny memes, funny pictures, funny videos, funny text, funny jokes, funny gifs, funny photos, funny images, hilarious memes, memes website"
      />

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://isfanny.com/memes" />
      <meta property="og:title" content="isFanny - The World of Memes" />
      <meta
        property="og:description"
        content="isFanny is a meme hosting platform where you will find the funniest memes, videos, images, GIFs, and text served up in an endless fashion"
      />
      <!-- <meta
        property="og:image"
        content="https://res.cloudinary.com/mememe/image/upload/v1661188160/isFanny_logo_seo_muw8sm.jpg"
      /> -->

      <!-- Twitter -->
      <!-- <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://isfanny.com/" />
      <meta property="twitter:title" content="isFanny - The World of Memes" />
      <meta
        property="twitter:description"
        content="isFanny is a meme hosting platform where you will find the funniest memes, videos, images, GIFs, and text served up in an endless fashion"
      />
      <meta
        property="twitter:image"
        content="https://res.cloudinary.com/mememe/image/upload/v1661188160/isFanny_logo_seo_muw8sm.jpg"
      /> -->
    </Head>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useHead } from "@vueuse/head";

export default {
  setup() {
    const siteData = reactive({
      title: `isFanny - The world of Memes`,
      description: `isFanny is a meme hosting platform where you will find the funniest memes, videos, images, GIFs, and text served up in an endless fashion`,
    });

    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    });
  },
};
</script>
