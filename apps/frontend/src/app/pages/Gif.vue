<template>
  <div class="w-60 h-60 mb-4 inline-flex items-end bg-cover bg-center" :style="`background-image: url('${gif.images.fixed_width.url}')`">
    <input ref="url" readonly class="flex-1" :value="url">
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md ml-2" @click="copy">Copy</button>
  </div>
</template>

<script>
export default {
  name: "SearchedGif",
  props: ['gif'],
  data() {
    return {
      url: '',
    };
  },
  methods: {
    async copy() {
      try {
        await navigator.clipboard.writeText(this.url);
        this.url = 'Copied!!!';
      } catch (err) {
        console.error('Copy command failed:', err);
      }
    },
  },
};
</script>

<style scoped>
</style>
