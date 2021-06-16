<template>
  <p class="lang">
    <img src="../assets/images/dialog-picto.png"/>
    <strong v-if="languages">
      {{languages.join(', ')}}
    </strong>
  </p>
</template>

<script>
  export default {
    name: 'Lang',
    props: ['languages'],

  }
</script>

<style scoped lang="scss">
  .lang {
    flex-grow: 1;
    color: #FFFFFF;
    display: flex;

    & img{
      height: 20px;
      margin-right: 10px;
    }
  }
</style>
