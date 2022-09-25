import axios from "axios";

export default {
  state: {
    gif_memes: [],
    gif_switched_memes: [],
    gif_api_errors: null,
    gif_pageNumber: 1,
    gif_switch_to_category: false,
  },
  getters: {
    allGifMemes(state) {
      return state.gif_memes;
    },

    gif_pageNumber(state) {
      return state.gif_pageNumber;
    },
    gifApiErrors(state) {
      return state.gif_api_errors;
    },
    gifGetSwitchToCategory(state) {
      return state.gif_switch_to_category;
    },
    gifAllSwitchedToCategoryMemes(state) {
      return state.gif_switched_memes;
    },
  },
  actions: {
    // fetch all gif memes Action
    async fetchAllGifMemes({ commit }) {
      try {
        let page = 1;
        let limit = 10;
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=gif&page=${page}&limit=${limit}&sort=-createdAt`
        );
        console.log(data.data.data);

        commit("SET_ALL_GIF_MEMES", data.data.data);
      } catch (error) {
        commit("SET_GIF_API_ERROR", "Failed to load gif memes");
      }
    },

    //fetch more gif memes when scrolled down
    async fetchMoreGifMemes({ commit }, meta) {
      try {
        let { page, category, filter } = meta;
        console.log(category);
        // console.log(filter.sort);
        console.log(page);
        let sortPath = "";
        if (filter.sort == "" || filter.sort == undefined) {
          sortPath = `&sort=-createdAt`;
        } else {
          sortPath = `&sort=${filter.sort}`;
        }
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=gif&page=${page}&limit=10${sortPath}`
        );
        console.log(data.data.data);
        commit("SET_MORE_GIF_MEMES", data.data.data);
        commit("SET_GIF_PAGE_NUMBER", page);
      } catch (error) {
        commit("SET_GIF_API_ERROR", "Failed to load more gif memes");
      }
    },
    clearGifsMemes({ commit }) {
      commit("CLEAR_GIFS_MEMES");
    },
    clearGifsPageNumber({ commit }) {
      commit("CLEAR_GIFS_PAGE_NUMBER");
    },
    gifSwitchToCategory({ commit }, payload) {
      console.log(payload);
      commit("GIF_SWITCH_TO_CATEGORY", payload);
    },
  },

  mutations: {
    // set all Gif memes Mutation
    SET_ALL_GIF_MEMES(state, payload) {
      state.gif_memes = payload;
      state.gif_switched_memes = payload;
    },

    SET_MORE_GIF_MEMES(state, payload) {
      state.gif_memes.push(...payload);
    },

    SET_GIF_PAGE_NUMBER(state, payload) {
      state.gif_pageNumber = payload;
    },
    SET_GIF_API_ERROR(state, payload) {
      state.gif_api_errors = payload;
    },
    CLEAR_GIFS_MEMES(state, payload) {
      payload = [];
      state.gif_memes = payload;
    },
    CLEAR_GIFS_PAGE_NUMBER(state) {
      state.gif_pageNumber = 0;
    },
    GIF_SWITCH_TO_CATEGORY(state, payload) {
      state.gif_switch_to_category = payload;
    },
  },
};
