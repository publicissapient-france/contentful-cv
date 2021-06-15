<template>
    <div class="xp" v-if="graduateDate">
      <span class="xp__count">{{experience}}</span> {{ $tc('year_xp', experience) }}
    </div>
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
    &__count {
      color: #FE414D;
      font-weight: 800;
    }
  }
</style>
