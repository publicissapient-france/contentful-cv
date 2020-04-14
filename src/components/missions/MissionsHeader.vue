<template>
  <div class="missions-header">{{ $t('heading.last_missions') }}</div>
</template>

<script>
  export default {
    name: 'MissionsHeader'
  }
</script>

<style scoped lang="scss">
  .missions-header {
    margin: 50px;
    font-weight: 700;
    font-size: 1.7em;
  }
</style>
