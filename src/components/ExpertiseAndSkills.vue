<template>
  <div class="expertise-and-skills">
    <div class="expertise-and-skills__expertise">
      <div class="expertise-and-skills__title">Mon Expertise</div>
      <div v-if="expertises">
        <RichTextRenderer :document="expertises"/>
      </div>
    </div>
    <div class="expertise-and-skills__skills">
      <div class="expertise-and-skills__title">Mes Skills</div>
      <div v-if="skills">
        <RichTextRenderer :document="skills"/>
      </div>
    </div>
  </div>
</template>

<script>
  import RichTextRenderer from 'contentful-rich-text-vue-renderer';

  export default {
    name: 'ExpertiseAndSkills',
    components: {
      RichTextRenderer,
    },
    props: ['expertises', 'skills'],
  }
</script>

<style scoped lang="scss">
  .expertise-and-skills {
    border-top: solid 1px #E0E0E0;
    padding: 20px 50px;
    display: flex;

    &__title {
      font-size: 1.8em;
      margin-bottom: 20px;
    }

    &__expertise {
      width: 50%;
      padding: 0 30px 0 0;

      li {
        margin-bottom: 10px;
      }
    }

    &__skills {
      width: 50%;

      li {
        margin-bottom: 15px;

        &::before {
          content: "";
          margin-left: -2em;
        }
      }

      strong {
        color: #fe414d;
      }
    }
  }
</style>
