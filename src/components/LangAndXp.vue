<template>
  <div class="lang-xp">
    <div class="lang-xp__lang" v-if="languages">
      {{ languages.join(", ") }}
    </div>
    <div class="lang-xp__xp" v-if="graduateDate">
      <span class="lang-xp__count">{{ experience }}</span>
      {{ $tc("year_xp", experience) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LangAndXp",
  props: ["languages", "graduateDate"],
  computed: {
    experience() {
      return new Date().getFullYear() - this.graduateDate;
    },
  },
});
</script>

<style scoped lang="scss">
.lang-xp {
  border-top: solid 1px #e0e0e0;
  display: flex;
  padding: 3px 50px;
  font-size: 0.9em;
  margin-top: 160px;

  &__lang {
    flex-grow: 1;
  }

  &__count {
    color: #fe414d;
    font-weight: 800;
  }
}
</style>
