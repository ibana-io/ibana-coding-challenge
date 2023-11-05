

<template>
  <router-view />
  <SearchInput @gifs-fetched="onGifsFetched" />
  <GifList :gifs="gifs" />
</template>

<script>
import GifList from "./pages/GifList.vue";
import SearchInput from "./pages/Search.vue";

export default {
  name: "App",
  components: {
    GifList,
    SearchInput
  },
  data() {
    return {
      gifs: []
    };
  },
  methods: {
    onGifsFetched(result) {
      console.log(result);
      this.gifs = result.data;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  padding: 50px;
}

#App {
  width: 800px;
  margin: 0 auto;
}
</style>
