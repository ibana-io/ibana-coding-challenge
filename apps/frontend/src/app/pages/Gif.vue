<template>
    <div class="gif" :style="`background-image: url('${gif.images.fixed_width.url}')`">
      <input ref="url" readonly type="text" style="flex: 1" :value="url">
      <button @click="copy">Copy</button>
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
  .gif {
    width: 240px;
    height: 240px;
    margin-bottom: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  </style>
  