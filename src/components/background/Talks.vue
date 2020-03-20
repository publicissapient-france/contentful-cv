<template>
  <div class="talks">
    <div class="talks__title">Speaker</div>
    <ul>
      <li v-for="talk in talks" :key="talk.subject" class="talks__talk">
        <div class="talks__talk-inside">
          <span class="talks__year">{{talk.year}}</span> - {{talk.subject}}
          <div>
            <span class="talks__conference">{{talk.conference}}</span> <span v-if="talk.place">({{talk.place}})</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Talks',
    props: ['talks']
  }
</script>

<style scoped lang="scss">
  .talks {
    margin: 0 20px 30px;

    &__title {
      font-weight: 700;
      font-size: 2em;
      margin-bottom: 25px;
    }

    &__talk {
      margin: 10px 0;
    }

    &__talk-inside {
      display: inline-block;
    }

    &__year {
      font-weight: 700;
    }

    &__conference {
      font-weight: 700;
      color: #04a0ff;
    }
  }
</style>
