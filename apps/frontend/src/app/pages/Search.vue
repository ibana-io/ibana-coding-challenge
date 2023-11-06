<template>
  <div class="min-w-screen min-h-screen bg-gray-800 flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-lg p-10 text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl" x-data="app()" x-init="generatePassword()">
      <div class="relative mt-1">
        <input
          v-model="search"
          type="text"
          id="password"
          class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
          @input="onSearch"
        />
        <button class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
          <i class="mdi mdi-magnify"></i>
        </button>
      </div>
      <div class="absolute top-0 left-0 w-full h-2 flex">
        <div class="h-2 bg-blue-500 flex-1"></div>
        <div class="h-2 bg-red-500 flex-1"></div>
        <div class="h-2 bg-yellow-500 flex-1"></div>
        <div class="h-2 bg-blue-500 flex-1"></div>
        <div class="h-2 bg-red-500 flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  emits: ["gifs-fetched"],
  data() {
    return {
      search: "",
      timeout: null,
      // apiKey: process.env.GIF_API_KEY,
      // apiUrl: process.env.GIF_API_URL,
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
/* Add the provided styles here */
.min-w-80 {
  min-width: 20rem;
}
.resize::-webkit-resizer,
.resize-x::-webkit-resizer,
.resize-y::-webkit-resizer {
  background-color: transparent;
}
.resize:after,
.resize-x:after,
.resize-y:after {
  display: block;
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  content: "\F045D";
  font: normal normal normal 24px/1 "Material Design Icons";
  font-size: 24px;
  text-rendering: auto;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0, 0, 0, 0.3);
}
</style>
