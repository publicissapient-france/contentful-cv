<template>
  <div class="page-landscape">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.page-landscape {
  height: $PTT-height-px;
  overflow: hidden;
  page-break-after: always;
  position: relative;
  widows: inherit;
}
</style>
