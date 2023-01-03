<template>
  <div class="xp" v-if="graduateDate">
    <PictoBriefcase />
    <strong class="xp__count">
      {{ experience }} {{ $tc("year_xp", experience) }}
    </strong>
  </div>
</template>

<script lang="ts">
import PictoBriefcase from "@/assets/svg/PictoBriefcase.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["graduateDate"],
  components: {
    PictoBriefcase,
  },
  computed: {
    experience() {
      return new Date().getFullYear() - this.graduateDate;
    },
  },
});
</script>

<style scoped lang="scss">
.xp {
  color: #ffffff;
  display: flex;
  align-items: center;

  & svg {
    height: 30px;
    margin-right: 10px;
  }
}
</style>
