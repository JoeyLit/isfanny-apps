import axios from "axios";

export default {
  state: {
    video_memes: [],
    video_switched_memes: [],
    video_api_errors: null,
    video_pageNumber: 1,
    video_switch_to_category: false,
  },
  getters: {
    allVideoMemes(state) {
      return state.video_memes;
    },

    video_pageNumber(state) {
      return state.video_pageNumber;
    },
    videoApiErrors(state) {
      return state.video_api_errors;
    },
    videoGetSwitchToCategory(state) {
      return state.video_switch_to_category;
    },
    videoAllSwitchedToCategoryMemes(state) {
      return state.video_switched_memes;
    },
  },
  actions: {
    // fetch all video memes Action
    async fetchAllVideoMemes({ commit }) {
      try {
        let page = 1;
        let limit = 10;
        const data = await axios.get(
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=video&page=${page}&limit=${limit}&sort=-createdAt`
        );
        console.log(data.data.data);

        commit("SET_ALL_VIDEO_MEMES", data.data.data);
      } catch (error) {
        commit("SET_VIDEO_API_ERROR", "Failed to load video memes");
      }
    },

    //fetch more video memes when scrolled down
    async fetchMoreVideoMemes({ commit }, meta) {
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
          `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=video&page=${page}&limit=10${sortPath}`
        );
        console.log(data.data.data);
        commit("SET_MORE_VIDEO_MEMES", data.data.data);
        commit("SET_VIDEO_PAGE_NUMBER", page);
      } catch (error) {
        commit("SET_VIDEO_API_ERROR", "Failed to load more video memes");
      }
    },
    clearVideosMemes({ commit }) {
      commit("CLEAR_VIDEOS_MEMES");
    },
    clearVideosPageNumber({ commit }) {
      commit("CLEAR_VIDEOS_PAGE_NUMBER");
    },
    videoSwitchToCategory({ commit }, payload) {
      console.log(payload);
      commit("VIDEO_SWITCH_TO_CATEGORY", payload);
    },
  },

  mutations: {
    // set all Video memes Mutation
    SET_ALL_VIDEO_MEMES(state, payload) {
      state.video_memes = payload;
      state.video_switched_memes = payload;
    },

    SET_MORE_VIDEO_MEMES(state, payload) {
      state.video_memes.push(...payload);
    },

    SET_VIDEO_PAGE_NUMBER(state, payload) {
      state.video_pageNumber = payload;
    },
    SET_VIDEO_API_ERROR(state, payload) {
      state.video_api_errors = payload;
    },
    CLEAR_VIDEOS_MEMES(state, payload) {
      payload = [];
      state.video_memes = payload;
    },
    CLEAR_VIDEOS_PAGE_NUMBER(state) {
      state.video_pageNumber = 0;
    },
    VIDEO_SWITCH_TO_CATEGORY(state, payload) {
      state.video_switch_to_category = payload;
    },
  },
};
