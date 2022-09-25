import axios from "axios";

export default {
  state: {
    memes: [],
    meme: [],
    pageNumber: 1,
    total_memes: null,
  },
  getters: {
    allMemes(state) {
      return state.memes;
    },
    meme(state) {
      return state.meme;
    },
    hasMemes(state) {
      return state.memes && state.memes.length > 0;
    },
    pageNumber(state) {
      return state.pageNumber;
    },
    totalMemes(state) {
      return state.total_memes;
    },
  },
  actions: {
    // fetch all memes Action
    async fetchAllMemes({ commit }) {
      try {
        let page = 1;
        let limit = 12;
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&page=${page}&limit=${limit}&sort=-createdAt`
        );
        console.log(data.data.total);

        commit("SET_ALL_MEMES", data.data.data);
        commit("SET_TOTAL_MEMES", data.data.total);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load all memes");
      }
    },

    // fetch single meme Action
    async fetchMeme({ commit }, memeId) {
      try {
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes/${memeId}`
        );
        // console.log(data.data.data);
        commit("SET_MEME", data.data.data);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load meme");
      }
    },

    //fetch more memes when scrolled down
    async fetchMoreMemes({ commit }, meta) {
      try {
        let { page, sort } = meta;
        console.log(page);
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&page=${page}&limit=12&sort=${sort}`
        );
        console.log(data);
        commit("SET_MORE_MEMES", data.data.data);
        commit("SET_PAGE_NUMBER", page);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load more memes");
      }
    },
  },

  mutations: {
    // set meme Mutation
    SET_MEME(state, meme) {
      state.meme = meme;
    },

    // set all memes Mutation
    SET_ALL_MEMES(state, allMemes) {
      state.memes = allMemes;
    },

    SET_MORE_MEMES(state, payload) {
      state.memes.push(...payload);
    },

    SET_PAGE_NUMBER(state, payload) {
      state.pageNumber = payload;
    },
    SET_TOTAL_MEMES(state, payload) {
      state.total_memes = payload;
    },
  },
};
