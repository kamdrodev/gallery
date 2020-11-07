
import axios from 'axios';

const state = {
  photos: {},
};
const getters = {
  photos: (photos) => state.photos,
};
const mutations = {
  setPhotos: (state, photos) => {
    state.photos = photos;
  },
};
const actions = {
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};