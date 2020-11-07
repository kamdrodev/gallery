import axios from 'axios';

const state = {
  photos: {},
  photo: {},
  keyword: "",
};

const getters = {
  photos: (photos) => state.photos,
  photo: (photo) => state.photo,
  keyword: (keyword) => state.keyword,
};

const mutations = {
  setPhotos: (state, photos) => {
    state.photos = photos;
  },
  setPhoto: (state, photo) => {
    state.photo = photo;
  },
  setKeyword: (state, keyword) => {
    state.keyword = keyword;
  },
};

const actions = {
  async getPhotos({dispatch, commit}, {keyword}) {
    try {
      const getPhotosRequest = await axios.get('http://localhost:5000/photos', {
        params: {
          keyword: keyword,
        },
      });

      commit('setPhotos', getPhotosRequest.data.photos);

      console.log(getPhotosRequest.data);

      return {
        message: getPhotosRequest.data.message,
      };
    } catch (e) {
      console.log(e.response.data.message)
      throw new Error(e.response.data.message);
    }
  },
  async getPhoto({dispatch, commit}, {id}) {
    try {
      const getPhotoRequest = await axios.get(`http://localhost:5000/photos/${id}`, {});
      console.log(`vuex`, getPhotoRequest.data.photos);
      commit('setPhoto', getPhotoRequest.data.photos);

      return {
        message: getPhotoRequest.data.message,
      };
    } catch (e) {
      console.log(e.response.data.message)
      throw new Error(e.response.data.message);
    }
  },
  async navigateKeyword({dispatch, commit}, {keyword}) {
    try {
      commit('setKeyword', keyword);

      return {
        "message": "Keyword"
      };
    } catch (e) {
      console.log(e.response.data.message)
      throw new Error(e.response.data.message);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};