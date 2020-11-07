<template>
    <section>
      <p class="content"><b>Photo App</b> {{ selected }}</p>
      <b-field label="Find your favourite photo">
        <b-autocomplete
          rounded
          v-model="keyword"
          :data="filteredDataArray"
          placeholder="e.g. jQuery"
          icon="magnify"
          clearable
          @select="option => selected = option"
          @input="searchPhotos"
          >
          <template slot="empty" v-if="isDropdownVisible">No results found</template>
        </b-autocomplete>
      </b-field>
    </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      data: [
      ],
      keyword: '',
      selected: null,
      isDropdownVisible: false,
    };
  },
  computed: {
    filteredDataArray() {
      return this.data.filter(option => option
        .toString()
        .toLowerCase()
        .indexOf(this.keyword.toLowerCase()) >= 0);
    },
  },
  methods: {
    searchPhotos() {
      if (this.keyword.length >= 3) {
        this.isDropdownVisible = true;
      } else {
        this.isDropdownVisible = false;
      }

      console.log('Search Photos', this.name);
      this.data = [
        'Angular 2',
        'Aurelia',
        'Backbone',
        'Ember',
        'jQuery',
        'Meteor',
      ];
    },
  },
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
