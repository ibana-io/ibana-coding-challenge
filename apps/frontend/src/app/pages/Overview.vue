<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Find the Perfect GIFs</h1>
      <input
        v-model="search"
        placeholder="Search for GIFs..."
        class="p-4 rounded-full text-lg border border-gray-300 w-full focus:outline-none transition-all duration-300 hover:border-blue-500
               text-gray-600 placeholder-gray-400" 
        @input="onSearch"
      />
    </div>
    <GifDisplay :gifs="fetchedGifs" />
  </div>
</template>

<!-- ... -->


<script>
import GifDisplay from './GifDisplay.vue';

export default {
  name: "SearchInput",
  components: {
    GifDisplay,
  },
  data() {
    return {
      search: '',
      timeout: null,
      fetchedGifs: [],
      
    }
  },
  methods: {
    onSearch() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.makeSearch();
      }, 500)
    },
    makeSearch() {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=F5mS76XaeimOHwrehHLN1xC8jCc0ftSw&q=${this.search}&limit=50`)
          .then(response => response.json())
          .then(result => {
            this.fetchedGifs = result.data;
          })
    },
   
  }
}
</script>

<style scoped>
</style>
