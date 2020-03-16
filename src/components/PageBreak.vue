<template>
  <div class="page-break"></div>
</template>

<script>
  export default {
    name: 'PageBreak'
  }
</script>

<style scoped lang="scss">
  @media print {
    .page-break {
      page-break-after: always;
    }
  }
</style>
