<template>
  <input v-model="search" placeholder="Type and search for gifs" @input="onSearch" class="p-4 rounded-md text-base border border-gray-500 w-full" />
</template>

<script>
export default {
  name: "SearchInput",
  emits: ['gifs-fetched'],
  data() {
    return {
      search: "",
      timeout: null,
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
        `https://api.giphy.com/v1/gifs/search?api_key=F5mS76XaeimOHwrehHLN1xC8jCc0ftSw&q=${this.search}&limit=9`
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
