<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.page {
  height: $A4-height-px;
  overflow: hidden;
  page-break-after: always;
  position: relative;
  widows: inherit;
}
</style>
