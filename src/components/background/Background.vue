<template>
  <div class="background">
    <div class="background__title">Parcours</div>
    <ul>
      <li v-for="step in background" :key="step.description" class="background__step">
        <div class="background__step-inside">
          <span class="background__year">{{step.year}}</span> - <span class="background__name">{{step.name}}</span>
          <div>
            {{step.description}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Background',
    props: ['background']
  }
</script>

<style scoped lang="scss">
  .background {
    margin: 0 20px 30px;

    &__title {
      font-weight: 700;
      font-size: 1.7em;
      margin-bottom: 25px;
    }

    &__step {
      margin: 10px 0;
    }

    &__step-inside {
      display: inline-block;
    }

    &__year {
      font-weight: 700;
    }

    &__name {
      font-weight: 700;
      color: #fe414d;
    }
  }
</style>
