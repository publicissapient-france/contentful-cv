<template>
  <div class="lang" v-if="languages">
    {{languages.join(', ')}}
  </div>
</template>

<script>
  export default {
    name: 'Lang',
    props: ['languages'],

  }
</script>

<style scoped lang="scss">
  .lang {
    flex-grow: 1;
  }
</style>
