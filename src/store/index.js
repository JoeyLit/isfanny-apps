import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'
import memes from "./modules/memes";
import random_memes from "./modules/random_memes";
import pages from "./modules/pages";
import sort from "./modules/sort";
import search from "./modules/search";
import theme from "./modules/theme";
import category from "./modules/category";
import menu_tab from "./modules/menu_tab";
import photo_memes from "./modules/photo_modules/photo_memes";
import photo_filter_settings from "./modules/photo_modules/photo_filter_settings";
import video_memes from "./modules/video_modules/video_memes";
import video_filter_settings from "./modules/video_modules/video_filter_settings";
import gif_memes from "./modules/gif_modules/gif_memes";
import gif_filter_settings from "./modules/gif_modules/gif_filter_settings";
import text_memes from "./modules/text_modules/text_memes";
import text_filter_settings from "./modules/text_modules/text_filter_settings";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      memes,
      random_memes,
      pages,
      sort,
      search,
      theme,
      category,
      menu_tab,
      photo_memes,
      photo_filter_settings,
      video_memes,
      video_filter_settings,
      gif_memes,
      gif_filter_settings,
      text_memes,
      text_filter_settings,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
