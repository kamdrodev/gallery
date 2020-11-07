<template>
  <div class="container full-page">
    <div class="columns  is-centered full-page is-justify-content-center is-align-items-center">
      <div class="column is-half ">
        <Search></Search>
      </div>
    </div>
  </div>
</template>

<script>

import Search from './../components/Search.vue';

export default {  
  name: 'Index',
  components: {
    Search
  },
  data() {
    return {
      
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .full-page {
    height:100vh;
    margin: 0;
    padding: 0;
  }
  .nm {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
