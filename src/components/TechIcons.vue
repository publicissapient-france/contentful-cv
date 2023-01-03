<template>
  <div class="tech-icons">
    <div
      class="tech-icons__item"
      v-for="(icon, index) in techIcons"
      :key="icon.alt"
    >
      <img
        class="tech-icons__image"
        :id="index.toString()"
        :src="icon.src"
        alt="icon.alt"
      />
      <label :for="index">{{ icon.alt }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TechIcons",
  props: {
    techIcons: { type: Object, required: true },
  },
});
</script>

<style scoped lang="scss">
.tech-icons {
  border-top: solid 1px #e0e0e0;
  padding: 15px 20px;
  display: flex;
  justify-content: space-around;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.6rem;
  }

  &__image {
    height: 40px;
    margin-bottom: 5px;
  }
}
</style>
