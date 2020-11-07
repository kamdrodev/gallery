import Vue from 'vue';
import Vuex from 'vuex';

import photos from './modules/photos.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    photos,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
});

export default store;