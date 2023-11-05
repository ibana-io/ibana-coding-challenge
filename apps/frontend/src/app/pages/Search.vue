<template>
    <div>
      <h1 class="search-title">Search GIFs</h1>
      <input v-model="searchQuery" class="search-input" @input="search" placeholder="Search GIFs">
      <div class="search-results">
        <div v-for="gif in searchResults" :key="gif.id" class="search-gif">
          <img :src="gif.images.original.url" alt="GIF">
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios'; // Import Axios for making HTTP requests
  
  const searchQuery = ref('');
  const searchResults = ref([]);
  
  const search = async () => {
    try {
      // Send the search query to the backend API
      await axios.post('/search', { query: searchQuery.value });
  
      // Now, perform the search and display search results
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=F5mS76XaeimOHwrehHLN1xC8jCc0ftSw&q=${searchQuery.value}`
      );
      const data = response.data.data;
      searchResults.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  </script>
  
  <style scoped>
  /* Add your Tailwind CSS classes for styling */
  </style>
  