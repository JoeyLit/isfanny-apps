export default {
  state: {
    activeTab: "",
  },
  getters: {
    getActiveTab(state) {
      return state.activeTab;
    },
  },
  actions: {
    // fetch all memes activeTab Action
    fetchActiveTab({ commit }, payload) {
      const activeTab = payload;
      console.log(activeTab);

      commit("SET_ACTIVE_TAB", activeTab);
    },
  },

  mutations: {
    // set all memes tab Mutation
    SET_ACTIVE_TAB(state, payload) {
      state.activeTab = payload;
    },
  },
};
