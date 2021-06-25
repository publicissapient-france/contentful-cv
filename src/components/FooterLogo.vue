<template>
  <footer class="footer">
    <LogoPS/>
  </footer>
</template>

<script>

  import LogoPS from '@/assets/svg/LogoPS';
  export default {
    name: 'FooterLogo',
    components:{
      LogoPS
    }
  }
</script>

<style scoped lang="scss">
  @import "@/style/variables";

  .footer {
    height: 40px;
    width:$PTT-width-px ;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: flex-end;

    &>svg{
      height: 30px;
    }
  }
</style>
