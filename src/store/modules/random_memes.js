import axios from "axios";
const API_BASE_URL = "https://meme-api-v1.herokuapp.com/api/v1/memes";
// const API_BASE_URL = "http://localhost:5000/api/v1/memes";

export default {
  state: {
    random_memes: [],
    random_meme: [],
  },
  getters: {
    allRandomMemes(state) {
      return state.random_memes;
    },
    random_meme(state) {
      return state.random_meme;
    },
  },
  actions: {
    // fetch all memes Action
    async fetchAllRandomMemes({ commit }) {
      try {
        const data = await axios.get(`${API_BASE_URL}/random`);
        console.log(data);

        commit("SET_ALL_RANDOM_MEMES", data.data.data);
        // commit("SET_TOTAL_MEMES", data.data.total);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load all random memes");
      }
    },

    // fetch single meme Action
    async fetchRandomMeme({ commit }, memeId) {
      try {
        const data = await axios.get(`${API_BASE_URL}/${memeId}`);
        // console.log(data.data.data);
        commit("SET_RANDOM_MEME", data.data.data);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load meme");
      }
    },

    //fetch more memes when scrolled down
    async fetchMoreRandomMemes({ commit }) {
      try {
        const data = await axios.get(`${API_BASE_URL}/random`);
        console.log(data);
        commit("SET_MORE_RANDOM_MEMES", data.data.data);
      } catch (error) {
        commit("SET_API_ERROR", "Failed to load more random memes");
      }
    },
  },

  mutations: {
    // set meme Mutation
    SET_RANDOM_MEME(state, meme) {
      state.random_meme = meme;
    },

    // set all memes Mutation
    SET_ALL_RANDOM_MEMES(state, allMemes) {
      state.random_memes = allMemes;
    },

    SET_MORE_RANDOM_MEMES(state, payload) {
      state.random_memes.push(...payload);
    },
  },
};
