<template>
  <div>
    <SearchInput @gifs-fetched="onGifsFetched" />
    <GifDisplay :gifs="gifs" />
    <RouterView />
  </div>
</template>

<script>
import GifDisplay from "./pages/GifDisplay.vue";
import SearchInput from "./pages/Overview.vue";

export default {
  name: "App",
  components: {
    SearchInput,
    GifDisplay,
  },
  data() {
    return {
      gifs: [],
    };
  },
  methods: {
    onGifsFetched(result) {
      this.gifs = result.data;
    },
  },
};
</script>
