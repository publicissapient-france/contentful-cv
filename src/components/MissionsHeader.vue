<template>
  <div class="missions-header">Détails des dernières missions</div>
</template>

<script>
  export default {
    name: 'MissionsHeader'
  }
</script>

<style scoped lang="scss">
  .missions-header {
    margin: -100px 50px 50px 50px;
    font-weight: 700;
    font-size: 2em;
  }

  @media print {
    .missions-header {
      padding-top: 150px;
    }
  }
</style>
