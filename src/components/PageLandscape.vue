<template>
  <div class="page-landscape">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'PageLandscape'
  }
</script>

<style scoped lang="scss">
  @import "@/style/variables";

  .page {
    height: $PTT-height-px;
    overflow: hidden;
    page-break-after: always;
    position: relative;
    widows: inherit;
  }
</style>
