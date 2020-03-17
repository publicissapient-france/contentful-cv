<template>
  <div class="header">
    <div class="header__info">
      <div class="header__name">{{firstName}} {{name}}</div>
      <div class="header__role">{{role}}</div>
    </div>
    <div class="header__brand">
      <img alt="" class="header__image" src="logo.svg">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderBig',
    props: ['firstName', 'name', 'role']
  }
</script>

<style scoped lang="scss">
  $height: 160px;
  .header {
    z-index: 1;
    position: absolute;
    width: 794px;
    height: $height;
    display: flex;
    background-color: #fe414d;
    align-items: center;
    margin: 0;
    padding: 0;

    &__info {
      flex-grow: 1;
      margin-left: 50px;
      font-weight: 700;
    }

    &__brand {
      height: $height;
      padding-right: 25px;
      padding-left: 50px;
      background-color: #000000;
      border-radius: 0 0 0 75px;
    }

    &__name {
      color: #FFFFFF;
      font-size: 2em;
    }

    &__role {

    }

    &__image {
      height: 100%;
    }
  }
</style>
