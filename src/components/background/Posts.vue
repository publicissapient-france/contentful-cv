<template>
  <div class="posts">
    <div class="posts__title">Publications</div>
    <ul>
      <li v-for="post in posts" :key="post.title" class="posts__post">
        <div class="posts__post-inside">
          <span class="posts__year">{{post.year}}</span> - <span class="posts__target">{{post.postTarget}}</span>
          <div>
            "{{post.name}}"
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Posts',
    props: ['posts']
  }
</script>

<style scoped lang="scss">
  .posts {
    margin: 0 20px 30px;

    &__post {
      margin: 10px 0;
    }

    &__post-inside {
      display: inline-block;
    }

    &__title {
      font-weight: 700;
      font-size: 2em;
      margin-bottom: 25px;
    }

    &__year {
      font-weight: 700;
    }

    &__target {
      font-weight: 700;
      color: #04a0ff;
    }
  }
</style>
