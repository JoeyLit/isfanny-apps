export default {
  state: {
    sort: "",
  },
  getters: {
    getSort(state) {
      return state.sort;
    },
  },
  actions: {
    // fetch all memes sort Action
    fetchSort({ commit }, payload) {
      const sort = payload;
      console.log(sort);

      commit("SET_SORT", sort);
    },
  },

  mutations: {
    // set all memes sort Mutation
    SET_SORT(state, payload) {
      state.sort = payload;
    },
  },
};
