<template>
  <footer class="footer">
    <LogoPS />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoPS from "@/assets/svg/LogoPS.vue";
export default defineComponent({
  name: "FooterLogo",
  components: {
    LogoPS,
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.footer {
  height: 40px;
  width: $PTT-width-px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;

  & > svg {
    height: 30px;
  }
}
</style>
