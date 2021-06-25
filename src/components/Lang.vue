<template>
  <p class="lang">
    <PictoDialog/>
    <strong v-if="languages">
      {{languages.join(', ')}}
    </strong>
  </p>
</template>

<script>
  import PictoDialog from '@/assets/svg/PictoDialog';

  export default {
    name: 'Lang',
    props: ['languages'],
    components:{
      PictoDialog
    }
  }
</script>

<style scoped lang="scss">
  .lang {
    flex-grow: 1;
    color: #FFFFFF;
    display: flex;
    align-items: center;

    & svg{
      height: 30px;
      margin-right: 10px;
    }
  }
</style>
