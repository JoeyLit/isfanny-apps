import axios from "axios";

export default {
  state: {
    photo_memes: [],
    switched_memes: [],
    total_memes: null,
    photo_memes_pagination: null,
    api_errors: null,

    photo_pageNumber: 1,
    switch_to_category: false,
  },
  getters: {
    allPhotoMemes(state) {
      return state.photo_memes;
    },
    photo_pageNumber(state) {
      return state.photo_pageNumber;
    },
    photoMemesPagination(state) {
      return state.photo_memes_pagination;
    },
    apiErrors(state) {
      return state.api_errors;
    },
    getSwitchToCategory(state) {
      return state.switch_to_category;
    },
    allSwitchedToCategoryMemes(state) {
      return state.switched_memes;
    },
  },
  actions: {
    // fetch all memes Action
    async fetchAllPhotoMemes({ commit }) {
      try {
        let page = 1;
        let limit = 12;
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=photo&page=${page}&limit=${limit}&sort=-createdAt`
        );

        commit("SET_ALL_PHOTO_MEMES", data.data.data);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load photo memes");
      }
    },

    //fetch more Photo memes when scrolled down
    async fetchMorePhotoMemes({ commit }, meta) {
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
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=photo&page=${page}&limit=12${sortPath}`
        );
        console.log(data.data.data);
        commit("SET_MORE_PHOTO_MEMES", data.data.data);
        commit("SET_PHOTO_PAGE_NUMBER", page);
        commit("SET_ALL_PHOTO_MEMES_PAGINATION", data.data.pagination.next);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load more photo memes");
      }
    },
    clearPhotosMemes({ commit }) {
      commit("CLEAR_PHOTOS_MEMES");
    },
    clearPhotosPageNumber({ commit }) {
      commit("CLEAR_PHOTOS_PAGE_NUMBER");
    },
    photoSwitchToCategory({ commit }, payload) {
      console.log(payload);
      commit("SWITCH_TO_CATEGORY", payload);
    },
  },

  mutations: {
    // set all memes Mutation
    SET_ALL_PHOTO_MEMES(state, allPhotoMemes) {
      state.photo_memes = allPhotoMemes;
      state.switched_memes = allPhotoMemes;
    },

    SET_MORE_PHOTO_MEMES(state, payload) {
      state.switched_memes.push(...payload);
    },

    SET_PHOTO_PAGE_NUMBER(state, payload) {
      state.photo_pageNumber = payload;
    },
    SET_ALL_PHOTO_MEMES_PAGINATION(state, payload) {
      state.photo_memes_pagination = payload;
    },
    SET_API_ERROR(state, payload) {
      state.api_errors = payload;
    },
    CLEAR_PHOTOS_MEMES(state, payload) {
      payload = [];
      state.photo_memes = payload;
    },
    CLEAR_PHOTOS_PAGE_NUMBER(state) {
      state.photo_pageNumber = 0;
    },
    SWITCH_TO_CATEGORY(state, payload) {
      state.switch_to_category = payload;
    },
  },
};
