<template>
  <div class="info-content" :class="mode">
    <div v-if="background" class="info-content__background">
      <Background :background="background"/>
    </div>
    <div v-if="posts" :style="{order: postsOrder}" class="info-content__posts">
      <Posts :posts="posts"/>
    </div>
    <div v-if="talks" :style="{order: talksOrder}" class="info-content__talks">
      <Talks :talks="talks"/>
    </div>
  </div>
</template>

<script>
  import Background from '@/components/background/Background';
  import Talks from '@/components/background/Talks';
  import Posts from '@/components/background/Posts';

  export default {
    name: 'InfoContent',
    components: {Posts, Talks, Background},
    props: ['background', 'talks', 'posts'],
    computed: {
      postsOrder() {
        if (this.talks && this.posts) {
          if (this.talks.length > this.posts.length) {
            return 2
          }
        }
        return 3;
      },
      talksOrder() {
        if (this.talks && this.posts) {
          if (this.talks.length > this.posts.length) {
            return 3
          }
        }
        return 2;
      },
      mode() {
        const talkCount = this.talks ? this.talks.length : 0;
        const postCount = this.posts ? this.posts.length : 0;
        const stepCount = this.background ? this.background.length : 0;
        const count = talkCount + postCount + stepCount;
        if (count < 6) {
          return 'info-content--2column-small';
        } else if (count < 11) {
          return 'info-content--2column';
        }
        return '';
      }
    }
  }
</script>

<style scoped lang="scss">
  .info-content {
    padding: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 800px;

    &--2column-small {
      height: 300px;
      page-break-after: avoid;
    }

    &--2column {
      height: 500px;
    }

    &__background {
      width: 50%;
    }

    &__talks {
      width: 50%;
    }

    &__posts {
      width: 50%;
    }
  }
</style>
