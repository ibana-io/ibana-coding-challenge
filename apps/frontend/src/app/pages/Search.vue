<template>
  <input v-model="search" placeholder="Type and search for gifs" @input="onSearch">
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
  }, // Declare the emitted event
};
</script>

<style scoped>
input {
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 18px;
  border: 2px solid #5f5f5f;
  outline: 0;
  display: block;
  width: 100%;
}

input:focus {
  border-color: #009ad7;
}
</style>
