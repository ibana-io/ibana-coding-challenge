<template>
  <input v-model="search" placeholder="Type and search for gifs" class="p-4 rounded-md text-base border border-gray-500 w-full" @input="onSearch" />
</template>

<script>
export default {
  name: "SearchInput",
  emits: ['gifs-fetched'],
  data() {
    return {
      search: "",
      timeout: null,
      apiKey: process.env.GIF_API_KEY, 
      apiUrl: process.env.GIF_API_URL, 
    };
  },
  methods: {
    onSearch() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.makeSearch();
      }, 500);
    },
    makeSearch() {
      fetch(
        `${this.apiUrl}/gifs/search?api_key=${this.apiKey}&q=${this.search}&limit=9`
      )
        .then((response) => response.json())
        .then((result) => {
          this.$emit("gifs-fetched", result);
        });
    },
  },
};
</script>

<style scoped>
input:focus {
  @apply border-blue-500;
}
</style>
