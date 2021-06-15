<template>
  <strong class="lang" v-if="languages">
    {{languages.join(', ')}}
  </strong>
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
    color: #FFFFFF;
  }
</style>
