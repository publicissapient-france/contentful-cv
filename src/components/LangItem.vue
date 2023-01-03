<template>
  <p class="lang">
    <PictoDialog />
    <strong v-if="languages">
      {{ languages.join(", ") }}
    </strong>
  </p>
</template>

<script lang="ts">
import PictoDialog from "@/assets/svg/PictoDialog.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["languages"],
  components: {
    PictoDialog,
  },
});
</script>

<style scoped lang="scss">
.lang {
  flex-grow: 1;
  color: #ffffff;
  display: flex;
  align-items: center;

  & svg {
    height: 30px;
    margin-right: 10px;
  }
}
</style>
