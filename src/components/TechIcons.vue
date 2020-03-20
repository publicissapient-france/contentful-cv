<template>
  <div class="tech-icons">
    <div class="tech-icons__item" v-for="(icon, index) in techIcons" :key="icon.alt">
      <img class="tech-icons__image" :id="index" :src="icon.src" alt="icon.alt">
      <label :for="index">{{icon.alt}}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TechIcons',
    props: ['techIcons'],
  }
</script>

<style scoped lang="scss">
  .tech-icons {
    border-top: solid 1px #E0E0E0;
    padding: 15px 20px;
    display: flex;
    justify-content: space-around;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .7rem;
    }

    &__image {
      height: 40px;
      margin-bottom: 5px;
    }
  }
</style>
