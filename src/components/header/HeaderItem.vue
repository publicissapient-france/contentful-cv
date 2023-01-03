<template>
  <div class="header">
    <div class="header__info">
      <div class="header__name">{{ firstName }} {{ name }}</div>
      <div class="header__role">{{ role }}</div>
    </div>
    <LogoPSForColoredBkg class="header__logo" />
  </div>
</template>

<script lang="ts">
import LogoPSForColoredBkg from "@/assets/svg/LogoPSForColoredBkg.vue";

export default {
  components: { LogoPSForColoredBkg },
  props: ["firstName", "name", "role"],
};
</script>

<style scoped lang="scss">
$height: 100px;
.header {
  height: $height;
  display: flex;
  background-color: #fe414d;
  align-items: center;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 794px;

  &__info {
    flex-grow: 1;
    margin-left: 50px;
    font-weight: 600;
  }

  &__brand {
    height: $height;
    padding-right: 25px;
    padding-left: 50px;
  }

  &__name {
    color: #ffffff;
    font-size: 2em;
  }

  &__logo {
    width: 120px;
    padding-right: 50px;
  }
}
</style>
