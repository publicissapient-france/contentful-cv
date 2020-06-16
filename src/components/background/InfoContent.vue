<template>
  <ul class="info-content" :class="mode">
    <li class="info-content__step info-content__title">{{ $t('heading.background') }}</li>
    <li v-for="step in background" :key="step.description" class="info-content__step">
      <div class="info-content__step-inside">
        <span class="info-content__year">{{step.year}}</span> - <span class="info-content__background-name">{{step.name}}</span>
        <div>
          {{step.description}}
        </div>
      </div>
    </li>
    <li v-if="posts" class="info-content__step info-content__title">{{ $t('heading.publications') }}</li>
    <li v-for="post in posts" :key="post.title" class="info-content__step">
      <div class="info-content__step-inside">
        <span class="info-content__year">{{post.year}}</span> - <span class="info-content__posts-target">{{post.postTarget}}</span>
        <div>
          "{{post.name}}"
        </div>
      </div>
    </li>
    <ul class="info-content__step-group">
      <li v-if="talks" class="info-content__step info-content__title">{{ $t('heading.speaker') }}</li>
      <li v-for="talk in talks" :key="talk.subject" class="info-content__step">
        <div class="info-content__step-inside">
          <span class="info-content__year">{{talk.year}}</span> - {{talk.subject}}
          <div>
            <span class="info-content__talks-conference">{{talk.conference}}</span> <span v-if="talk.place">({{talk.place}})</span>
          </div>
        </div>
      </li>
    </ul>
  </ul>
</template>

<script>
  export default {
    name: 'InfoContent',
    props: ['background', 'talks', 'posts'],
    computed: {
      mode() {
        const bLength = this.background && this.background.length ? this.background.length : 0;
        const tLength = this.talks && this.talks.length ? this.talks.length : 0;
        const pLength = this.posts && this.posts.length ? this.posts.length : 0;
        let length = bLength + tLength + pLength;
        let mode = '';
        if (length > 6) {
          mode += ' info-content--2columns ';
        }
        if (length > 10) {
          mode += ' info-content--many ';
        }
        return mode;
      }
    },
  }
</script>

<style scoped lang="scss">
  .info-content {
    padding: 0 62px 50px 62px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 550px;
    page-break-after: always;

    $self: &;

    &--2columns {
      > #{$self}__step, #{$self}__step-group {
        width: 44%;
      }
    }

    &--many {
      max-height: 900px;
    }

    &__step {
      margin: 5px 25px;

      &:last-of-type {
        margin-bottom: 25px;
      }
    }

    &__step-group {
      break-inside: avoid;
      margin: 0;
      padding: 0;
    }

    &__title {
      font-weight: 700;
      font-size: 1.7em;
      margin-bottom: 15px;
      margin-top: 25px;

      &:first-of-type {
        margin-top: 0;
      }

      &::before {
        content: '';
        margin-left: -1.5em;
      }
    }

    &__step-inside {
      display: inline-block;
    }

    &__background-name {
      font-weight: 700;
      color: #fe414d;
    }

    &__year {
      font-weight: 700;
    }

    &__posts-target, &__talks-conference {
      font-weight: 700;
      color: #04a0ff;
    }
  }
</style>
