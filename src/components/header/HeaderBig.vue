<template>
  <div class="header">
    <div class="header__info">
      <div class="header__name">{{firstName}} {{name}}</div>
      <div class="header__role">{{role}}</div>
    </div>
    <div class="header__brand">
      <ImageCurve class="header__curve"/>
      <ImageLogo class="header__logo"/>
    </div>
  </div>
</template>

<script>
  import ImageCurve from '@/components/header/ImageCurve';
  import ImageLogo from '@/components/header/ImageLogo';

  export default {
    name: 'HeaderBig',
    props: ['firstName', 'name', 'role'],
    components: {
      ImageLogo,
      ImageCurve
    }
  }
</script>

<style scoped lang="scss">
  $height: 160px;
  .header {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: $height;
    display: flex;
    background-color: #fe414d;
    align-items: center;
    margin: 0;
    padding: 0;

    &__info {
      flex-grow: 1;
      margin-left: 50px;
      font-weight: 600;
    }

    &__brand {
      display:flex;
      align-items: center;
      justify-content: center;
      position:relative;
      width : 200px;
      height: $height;
      //padding-left: 25px;
      background-color: #000000;
    }

    &__name {
      color: #FFFFFF;
      font-size: 2em;
    }

    &__role {

    }

    &__curve {
      height: 100%;
      width: 70px;
      position: absolute;
      left:  -55px;
    }

    &__logo {
      height: 150px;
    }
  }
</style>
