// store.js (votre fichier de store Vuex)
import { createStore } from 'vuex';

export default createStore({
  state: {
    searchResults: [],
  },
  mutations: {
    // Les mutations sont utilisées pour mettre à jour l'état
    updateSearchResults(state, results) {
      state.searchResults = results;
    },
  },
  actions: {
    // Les actions sont utilisées pour effectuer des opérations asynchrones
    setSearchResults({ commit }, results) {
      commit('updateSearchResults', results);
    },
  },
  getters: {
    // Les getters permettent d'accéder aux données de l'état
    getSearchResults(state) {
      return state.searchResults;
    },
  },
});


