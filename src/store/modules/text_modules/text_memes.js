import axios from "axios";

export default {
  state: {
    text_memes: [],
    text_switched_memes: [],
    text_api_errors: null,
    text_pageNumber: 1,
    text_switch_to_category: false,
  },
  getters: {
    allTextMemes(state) {
      return state.text_memes;
    },

    text_pageNumber(state) {
      return state.text_pageNumber;
    },
    textApiErrors(state) {
      return state.text_api_errors;
    },
    textGetSwitchToCategory(state) {
      return state.text_switch_to_category;
    },
    textAllSwitchedToCategoryMemes(state) {
      return state.text_switched_memes;
    },
  },
  actions: {
    // fetch all text memes Action
    async fetchAllTextMemes({ commit }) {
      try {
        let page = 1;
        let limit = 12;
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=text&page=${page}&limit=${limit}&sort=-createdAt`
        );
        console.log(data.data.data);

        commit("SET_ALL_TEXT_MEMES", data.data.data);
      } catch (error) {
        commit("SET_TEXT_API_ERROR", "Failed to load text memes");
      }
    },

    //fetch more text memes when scrolled down
    async fetchMoreTextMemes({ commit }, meta) {
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
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=text&page=${page}&limit=12${sortPath}`
        );
        console.log(data.data.data);
        commit("SET_MORE_TEXT_MEMES", data.data.data);
        commit("SET_TEXT_PAGE_NUMBER", page);
      } catch (error) {
        commit("SET_TEXT_API_ERROR", "Failed to load more text memes");
      }
    },
    clearTextsMemes({ commit }) {
      commit("CLEAR_TEXTS_MEMES");
    },
    clearTextsPageNumber({ commit }) {
      commit("CLEAR_TEXTS_PAGE_NUMBER");
    },
    textSwitchToCategory({ commit }, payload) {
      console.log(payload);
      commit("TEXT_SWITCH_TO_CATEGORY", payload);
    },
  },

  mutations: {
    // set all Text memes Mutation
    SET_ALL_TEXT_MEMES(state, payload) {
      state.text_memes = payload;
      state.text_switched_memes = payload;
    },

    SET_MORE_TEXT_MEMES(state, payload) {
      state.text_memes.push(...payload);
    },

    SET_TEXT_PAGE_NUMBER(state, payload) {
      state.text_pageNumber = payload;
    },
    SET_TEXT_API_ERROR(state, payload) {
      state.text_api_errors = payload;
    },
    CLEAR_TEXTS_MEMES(state, payload) {
      payload = [];
      state.text_memes = payload;
    },
    CLEAR_TEXTS_PAGE_NUMBER(state) {
      state.text_pageNumber = 0;
    },
    TEXT_SWITCH_TO_CATEGORY(state, payload) {
      state.text_switch_to_category = payload;
    },
  },
};
