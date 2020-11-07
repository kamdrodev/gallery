<template>
  <div class="container is-mobile">
    <div class="columns is-centered mt-6">
      <div class="column is-half ">
        <Search></Search>
      </div>
    </div>
    <div class="columns is-desktop flex-wrap mt-6">
       <div class="column is-desktop is-one-third" v-for="photo in photos.results" >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
            <img :src="photo.urls.full" class="img-fit" @click="getPhoto(photo.id)">
              </figure>
            </div>
        </div>
      </div>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep" v-if="isCardModalActive">
      <div class="card">
          <div class="card-image">
              <figure class="image is-4by3">
                  <img :src="this.photo.urls.regular" alt="Image">
              </figure>
          </div>
          <div class="card-content">
              <div class="media">
                  <div class="media-content">
                      <p class="title is-4">{{this.photo.user.name}}</p>
                      <p class="subtitle is-6">{{this.photo.location.name}} </p>
                  </div>
              </div>
          </div>
      </div>
     </b-modal>
  </div>
</template>

<script>

import Search from './../components/Search.vue';

export default {  
  name: 'Photos',
  components: {
    Search
  },
  data() {
    return {
      isCardModalActive: false,
    };
  },
  computed: {
    filteredDataArray() {
      return this.data.filter(option => option
        .toString()
        .toLowerCase()
        .indexOf(this.keyword.toLowerCase()) >= 0);
    },
    photos() {
      return this.$store.getters['photos/photos'];
    },
    photo() {
      return this.$store.getters['photos/photo'];
    }
  },
  methods: {
    async getPhoto(id) {
      try {
        const getPhoto = await this.$store.dispatch(
          'photos/getPhoto',
          {
            id: id,
          },
        );

        this.isCardModalActive = true;

        // this.$buefy.snackbar.open({
        //   message: getPhoto.message,
        //   type: 'is-success',
        //   position: 'is-top',
        //   indefinite: true,
        // })

      } catch (e) {
        this.$buefy.snackbar.open({
          message: e.message,
          type: 'is-warning',
          position: 'is-top',
          indefinite: true,
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .full-page {
    height:100vh;
    margin: 0;
    padding: 0;
  }

  .img-fit {
    /* width: 300px;
    height: 300px; */
    object-fit: cover;
  }

  .flex-wrap {
    flex-wrap: wrap;;
  }
</style>
