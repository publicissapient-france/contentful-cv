<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Page'
  }
</script>

<style scoped lang="scss">
  .page {
    height: 1123px;
    overflow: hidden;
  }

  @media print {
    .page {
      page-break-after: always;
    }
  }
</style>
