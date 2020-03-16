<template>
  <div class="bio">
    <img v-if="picture" class="bio__image" :src="picture.src" :alt="picture.alt">
    <div class="bio__description">
      <RichTextRenderer :document="biography"/>
    </div>
  </div>
</template>

<script>
  import RichTextRenderer from 'contentful-rich-text-vue-renderer';

  export default {
    name: 'Bio',
    components: {
      RichTextRenderer,
    },
    props: ['picture', 'biography'],
  }
</script>

<style scoped lang="scss">
  .bio {
    display: flex;
    border-top: solid 1px #E0E0E0;

    &__image {
      width: 30%;
      object-fit: cover;
    }

    &__description {
      width: 70%;
      padding: 40px;
    }
  }
</style>
