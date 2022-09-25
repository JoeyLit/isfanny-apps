import axios from "axios";

export default {
  state: {
    filteredMemes: [],
  },
  getters: {
    filteredMemes(state) {
      return state.filteredMemes;
    },
  },
  actions: {
    async setFilteredURL({ commit }, filter) {
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
      let dataurl = `https://meme-api-v1.herokuapp.com/api/v1/memes?status=approved&type=photo${categoryPath}${pagePath}&limit=12&${sortPath}`;
      console.log(dataurl);
      const data = await axios.get(dataurl);
      console.log(data.data.data);
      commit("SET_FILTER", data.data.data);
    },
  },
  mutations: {
    SET_FILTER(state, payload) {
      state.filteredMemes = payload;
      // state.filteredMemes.push(...payload);
    },
  },
};
