<template>
  <div id="gifList" class="mt-5 flex justify-between flex-wrap">
    <Gif v-for="gif in gifs" :key="gif.id" :gif="gif" />
  </div>
</template>

<script>
import Gif from "./Gif.vue";

export default {
  name: "GifList",
  components: {
    Gif
  },
  props: ['gifs']
};
</script>

<style scoped>
</style>
