<template>
    <div class="xp" v-if="graduateDate">
      <img src="../assets/images/xp-picto.png"/>
      <strong class="xp__count">{{experience}} {{ $tc('year_xp', experience) }}</strong>
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
    color: #FFFFFF;
    display: flex;

    & img{
      height: 20px;
      margin-right: 10px;
    }
  }
</style>
