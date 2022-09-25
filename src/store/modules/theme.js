export default {
  state: {
    theme_color: false,
  },
  getters: {
    getThemeColor(state) {
      return state.theme_color;
    },
  },
  actions: {
    // fetch all memes theme Action
    fetchThemeColor({ commit }, payload) {
      const theme = payload;
      console.log(theme);

      commit("SET_THEME", theme);
    },
  },

  mutations: {
    // set all memes theme Mutation
    SET_THEME(state, payload) {
      state.theme_color = payload;
    },
  },
};
