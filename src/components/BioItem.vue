<template>
  <div class="bio">
    <img
      v-if="picture"
      class="bio__image"
      :src="picture.src"
      :alt="picture.alt"
    />
    <div class="bio__description" v-if="biography">
      <RichTextRenderer :document="biography" />
    </div>
  </div>
</template>

<script>
import RichTextRenderer from "contentful-rich-text-vue-renderer";

export default {
  components: {
    RichTextRenderer,
  },
  props: ["picture", "biography"],
};
</script>

<style scoped lang="scss">
.bio {
  display: flex;
  border-top: solid 1px #e0e0e0;

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
