import axios from "axios";

export default {
  state: {
    search_memes: [],
    search_meme: [],
    search_pageNumber: 1,
    search_value: "",
  },
  getters: {
    allSearchMemes(state) {
      return state.search_memes;
    },
    searchMeme(state) {
      return state.meme;
    },

    search_pageNumber(state) {
      return state.search_pageNumber;
    },
    searchValue(state) {
      return state.search_value;
    },
  },
  actions: {
    // fetch all Search memes Action
    async fetchAllSearchMemes({ commit }, payload) {
      let searchValue = payload;
      console.log(searchValue);
      let page = 1;
      let limit = 12;
      console.log(searchValue);
      const url = `https://meme-api-v1.herokuapp.com/api/v1/memes/search?search=${searchValue}&status=approved&page=${page}&limit=${limit}&sort=-createdAt`;
      const data = await axios.get(url);
      console.log(url);

      commit("SET_ALL_SEARCH_MEMES", data.data.data);
    },

    //fetch more memes when scrolled down
    async fetchMoreSearchMemes({ commit }, meta) {
      let { page, searchValue } = meta;
      let limit = 12;
      console.log(page);
      console.log(searchValue);
      const url = `https://meme-api-v1.herokuapp.com/api/v1/memes/search?search=${searchValue}&status=approved&page=${page}&limit=${limit}&sort=-createdAt`;
      const data = await axios.get(url);
      console.log(url);
      console.log(data);
      commit("SET_MORE_SEARCH_MEMES", data.data.data);
      commit("SET_PAGE_SEARCH_NUMBER", page);
    },

    // fetch single search meme Action
    async fetchSearchMeme({ commit }, memeId) {
      const data = await axios.get(
        `https://meme-api-v1.herokuapp.com/api/v1/memes/${memeId}`
      );
      // console.log(data.data.data);
      commit("SET_SEARCH_MEME", data.data.data);
    },

    //fetch search input value
    fetchSearchValue({ commit }, payload) {
      console.log(payload);
      commit("SET_SEARCH_VALUE", payload);
    },
    clearSearchValue({ commit }) {
      commit("SET_CLEAR_SEARCH_VALUE");
    },
  },

  mutations: {
    // set all memes Mutation
    SET_ALL_SEARCH_MEMES(state, payload) {
      state.search_memes = payload;
    },

    // set meme Mutation
    SET_SEARCH_MEME(state, payload) {
      state.search_meme = payload;
    },

    SET_MORE_SEARCH_MEMES(state, payload) {
      state.search_memes.push(...payload);
    },

    SET_PAGE_SEARCH_NUMBER(state, payload) {
      state.search_pageNumber = payload;
    },
    SET_SEARCH_VALUE(state, payload) {
      state.search_value = payload;
    },
    SET_CLEAR_SEARCH_VALUE(state) {
      state.search_value = "";
    },
  },
};
