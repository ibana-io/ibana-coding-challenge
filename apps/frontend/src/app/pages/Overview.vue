<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full sm:w-1/2 p-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Find the Perfect GIFs</h1>
      <input
        v-model="search"
        placeholder="Search for GIFs..."
        class="p-4 rounded-full text-lg border border-gray-300 w-full focus:outline-none transition-all duration-300 hover:border-blue-500"
        @input="onSearch"
      />
    </div>
  </div>
</template>

<script>
// Import your configuration file
import config from '../../../config/default.yml'

export default {
  name: "SearchInput",
  data() {
    return {
      search: "",
      timeout: null,
    };
  },
  methods: {
    onSearch() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.makeSearch, 500);
    },
    async makeSearch() {
      try {
        // Access the API settings from the configuration
        const apiKey = config.gifApiKey;
        const apiBaseUrl = config.gifApiUrl;

        // Construct the API URL with apiKey
        const apiUrl = `${apiBaseUrl}/gifs/search?api_key=${apiKey}&q=${this.search}&limit=20`;

        // Make the API request using the constructed URL
        const response = await fetch(apiUrl);
        const result = await response.json();
        this.$emit("gifs-fetched", result);
      } catch (error) {
        console.error("Failed to fetch gifs:", error);
      }
    },
  },
};
</script>

<style scoped>
input:focus {
  @apply border-blue-500;
}
</style>
