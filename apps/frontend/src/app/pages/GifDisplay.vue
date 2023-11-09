<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
    <div v-for="gif in gifs" :key="gif.id" class="p-4">
      <img :src="gif.images.fixed_width.url" alt="GIF" class="w-full h-40 object-cover rounded-md shadow-md hover:shadow-lg transition-shadow" />
    </div>
  </div>
</template>


<script>
export default {
  name: "GifDisplay",
  props: ["gifs"],
};
</script>

<style scoped>
/* Add any styles for the GIF display component here */
</style>
