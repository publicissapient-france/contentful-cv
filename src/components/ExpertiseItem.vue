<template>
  <div class="expertises">
    <div class="expertises__title heading3">{{ $t("heading.expertises") }}</div>
    <div v-if="expertises">
      <RichTextRenderer :document="expertises"/>
    </div>
  </div>
</template>

<script>
import RichTextRenderer from "contentful-rich-text-vue-renderer";

export default {
  components: {
    RichTextRenderer,
  },
  props: ["expertises"],
};
</script>

<style scoped lang="scss">
@import "@/assets/theme.scss";

.expertises {
  color: $grey-L;

  &__title {
    color: $primary;
  }

  & li {
    margin-bottom: 5px;
  }
}
</style>
