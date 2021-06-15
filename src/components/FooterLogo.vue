<template>
  <footer class="footer">
    <LogoPublicisSapient/>
  </footer>
</template>

<script>

  import LogoPublicisSapient from '@/assets/svg/LogoPublicisSapient';
  export default {
    name: 'FooterLogo',
    components:{
      LogoPublicisSapient
    }
  }
</script>

<style scoped lang="scss">
  @import "@/style/variables";

  .footer {
    height: 45px;
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
