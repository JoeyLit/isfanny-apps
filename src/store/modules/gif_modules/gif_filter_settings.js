import axios from "axios";

export default {
  state: {
    gif_filteredMemes: [],
  },
  getters: {
    gifFilteredMemes(state) {
      return state.gif_filteredMemes;
    },
  },
  actions: {
    async setGifFilteredURL({ commit }, filter) {
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
      let dataurl = `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=gif${categoryPath}${pagePath}&limit=10&${sortPath}`;
      console.log(dataurl);
      const data = await axios.get(dataurl);
      console.log(data.data.data);
      commit("SET_GIF_FILTER", data.data.data);
    },
  },
  mutations: {
    SET_GIF_FILTER(state, payload) {
      state.gif_filteredMemes = payload;
      // state.gif_filteredMemes.push(...payload);
    },
  },
};
