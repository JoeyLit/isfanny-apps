export default {
  state: {
    pages: 1,
  },
  getters: {
    pages(state) {
      return state.pages;
    },
  },
  actions: {
    nextPage({ commit }, payload) {
      let page = payload;
      console.log(page);

      commit("NEXT_PAGE", page);
    },
    previousPage({ commit }, payload) {
      let page = payload;
      console.log(page);

      commit("PREVIOUS_PAGE", page);
    },
    clearPage({ commit }) {
      commit("CLEAR_PAGE");
    },
  },
  mutations: {
    NEXT_PAGE(state, payload) {
      state.pages = payload;
    },
    PREVIOUS_PAGE(state, payload) {
      state.pages = payload;
    },
    CLEAR_PAGE(state, payload) {
      payload = 1;
      state.pages = payload;
    },
  },
};
