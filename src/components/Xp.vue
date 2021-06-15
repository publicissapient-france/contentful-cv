<template>
    <p class="xp" v-if="graduateDate">
      <strong class="xp__count">{{experience}} {{ $tc('year_xp', experience) }}</strong>
    </p>
</template>

<script>
  export default {
    name: 'Xp',
    props: ['graduateDate'],
    computed: {
      experience() {
        return new Date().getFullYear() - this.graduateDate;
      },
    }
  }
</script>

<style scoped lang="scss">
  .xp {
    color: #FFFFFF;
  }
</style>
