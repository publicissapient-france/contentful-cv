<template>
  <div class="lang-xp">
    <div class="lang-xp__lang" v-if="languages">
      {{languages.join(', ')}}
    </div>
    <div class="lang-xp__xp" v-if="graduateDate">
      <span class="lang-xp__count">{{experience}}</span> ans d‘expérience
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LangAndXp',
    props: ['languages', 'graduateDate'],
    computed: {
      experience() {
        return new Date().getFullYear() - this.graduateDate;
      },
    }
  }
</script>

<style scoped lang="scss">
  .lang-xp {
    border-top: solid 1px #E0E0E0;
    display: flex;
    padding: 3px 50px;
    font-size: .9em;
    margin-top: 160px;

    &__lang {
      flex-grow: 1;
    }

    &__count {
      color: #FE414D;
    }
  }
</style>
