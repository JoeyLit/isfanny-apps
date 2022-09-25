export default {
  state: {
    _category: "",
  },
  getters: {
    _category(state) {
      return state._category;
    },
  },
  actions: {
    // fetch all memes category Action
    fetchCategory({ commit }, payload) {
      const category = payload;
      console.log(category);

      commit("SET_CATEGORY", category);
    },
  },

  mutations: {
    // set all memes category Mutation
    SET_CATEGORY(state, payload) {
      state._category = payload;
    },
  },
};
