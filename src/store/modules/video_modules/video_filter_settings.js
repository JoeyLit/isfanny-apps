import axios from "axios";

export default {
  state: {
    video_filteredMemes: [],
  },
  getters: {
    videoFilteredMemes(state) {
      return state.video_filteredMemes;
    },
  },
  actions: {
    async setVideoFilteredURL({ commit }, filter) {
      //set category into URL
      const { category, page, sort } = filter;
      let categoryPath = "";
      if (category === "all") {
        categoryPath = "";
      } else if (category === "") {
        categoryPath = "";
      } else {
        categoryPath = `&category=${category}`;
        console.log(category);
      }
      //set page into URL
      let pagePath = 1;
      if (page === "") {
        pagePath = `&page=1`;
      } else {
        pagePath = `&page=${page}`;
      }
      console.log(page);

      //set filter into URL
      let sortPath = "";
      if (sort === "" || sort === undefined) {
        sortPath = `sort=-createdAt`;
      } else {
        sortPath = `sort=${sort}`;
        console.log(sortPath);
      }
      let dataurl = `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=video${categoryPath}${pagePath}&limit=10&${sortPath}`;
      console.log(dataurl);
      const data = await axios.get(dataurl);
      console.log(data.data.data);
      commit("SET_VIDEO_FILTER", data.data.data);
    },
  },
  mutations: {
    SET_VIDEO_FILTER(state, payload) {
      state.video_filteredMemes = payload;
      // state.video_filteredMemes.push(...payload);
    },
  },
};
