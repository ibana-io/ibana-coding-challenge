<template>
  <div class="p-4">
    <router-view />
    <SearchInput @gifs-fetched="onGifsFetched" />
    <GifList :gifs="gifs" />
  </div>
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
</style>
