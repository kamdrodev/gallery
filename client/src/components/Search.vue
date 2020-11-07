<template>
    <section>
      <p class="content"><b>Photo App</b> {{ selected }}</p>
      <b-field label="Find your favourite photo">
        <b-autocomplete
          rounded
          v-model="keyword"
          :data="filteredDataArray"
          placeholder="Type at least three characters"
          icon="magnify"
          clearable
          @keydown.native.enter="showPhotos"
          @select="showPhotos"
          @input="searchPhotos"
          >
          <template slot="empty" v-if="isDropdownVisible">No results found</template>
        </b-autocomplete>
      </b-field>
    </section>
</template>

<script>
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'Search',
  created() {
    this.keyword = this.$store.state['photos/keyword'];
    this.searchPhotos();
  },
  data() {
    return {
      data: [],
      keyword: '',
      selected: null,
      isDropdownVisible: true,
      isEmpty: false,
    };
  },
  computed: {
    filteredDataArray() {
       return this.data;
    },
    photos() {
      return this.$store.getters['photos/photos'];
    }
  },
  methods: {
    async searchPhotos() {
      // if (this.keyword.length >= 3) {
        // this.isDropdownVisible = true;
      // } else {
        // this.data = [];
        // this.isDropdownVisible = false;
      // }

      if (this.keyword.length <= 2) {
        this.data = [];
      }

      if (this.keyword.length >= 3) {


        try {
          const getPhotosProcess = await this.$store.dispatch(
            'photos/getPhotos',
            {
              keyword: this.keyword,
            },
          );
          console.log(this.photos.results);
          this.data = [];
          let descriptions = this.photos.results.map(a => a.alt_description);
          console.log(descriptions)
          this.data = descriptions;

          // console.log('x')
          // this.data = ["smiling woman in shallow focus photography", "closeup photography of woman smiling", "woman with white background", "woman walking in white sand during daytime", "shallow focus photography of woman outdoor during day", "woman surrounded by sunflowers", "woman in brown long-sleeved top standing beside wall", "woman smiling wearing denim jacket", "woman looking sideways leaning on white wall", "woman standing on middle of road"];

          // this.$router.push('/photos');;

          this.$buefy.snackbar.open({
            message: getPhotosProcess.message,
            type: 'is-success',
            position: 'is-top',
            indefinite: true,
          })

        } catch (e) {
          console.log(e);
          this.$buefy.snackbar.open({
            message: e.message,
            type: 'is-warning',
            position: 'is-top',
            indefinite: true,
          })
        }
      }     
    },
    showPhotos() {
      console.log("showPhotos");
      console.log('keyword', this.keyword)
      console.log(this.$route.path)

      if (this.$route.path == '/') {

        try {
          this.$store.dispatch('photos/navigateKeyword', {keyword: this.keyword});
        } catch (e) {

        }

         this.$router.push('/photos');
      } else {
        this.searchPhotos();
      }

     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
