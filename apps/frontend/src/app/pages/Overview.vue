<template>
  <div>
    <h1 class="overview-title">Trending GIFs</h1>
    <div v-for="gif in displayedGIFs" :key="gif.id" class="overview-gif">
      <img :src="gif.images.original.url" alt="GIF">
    </div>
    <div class="pagination">
      <button v-for="page in pages" :key="page" :class="{ 'active': page === currentPage }" @click="changePage(page)">{{ page }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const trendingGIFs = ref([]);
const limit = 10;
const currentPage = ref(1);

const displayedGIFs = computed(() => {
  const startIndex = (currentPage.value - 1) * limit;
  const endIndex = startIndex + limit;
  return trendingGIFs.value.slice(startIndex, endIndex);
});

const fetchTrendingGIFs = async () => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=F5mS76XaeimOHwrehHLN1xC8jCc0ftSw&limit=${limit}`
    );
    const data = await response.json();
    trendingGIFs.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchTrendingGIFs();
});

const totalGIFs = computed(() => trendingGIFs.value.length);
const totalPages = computed(() => Math.ceil(totalGIFs.value / limit));
const pages = ref([]);

for (let i = 1; i <= totalPages.value; i++) {
  pages.value.push(i);
}

const changePage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
/* Add your Tailwind CSS classes for styling */
</style>
