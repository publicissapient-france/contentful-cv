<template>
  <div class="mission" v-if="mission">
    <div class="mission__unbreakable">
      <img class="mission__client-image" :src="mission.client.image.src" :alt="mission.client.image.alt">
      <div class="mission__header">
        <div class="mission__client-name">{{mission.client.name}}</div>
        <div class="mission__duration">{{duration}} mois</div>
      </div>
    </div>
    <div class="mission__role">
      {{mission.role}}
    </div>
    <div class="mission__description">
      <RichTextRenderer :document="mission.client.description"/>
      <RichTextRenderer :document="mission.description"/>
    </div>
    <div class="mission__tldr" v-if="mission.tldr">
      <RichTextRenderer :document="mission.tldr"/>
    </div>
  </div>
</template>

<script>
  import RichTextRenderer from 'contentful-rich-text-vue-renderer';
  import dayjs from 'dayjs';

  export default {
    name: 'Mission',
    components: {
      RichTextRenderer,
    },
    props: ['mission'],
    computed: {
      duration() {
        let endDate = new Date();
        if (this.mission.endDate) {
          endDate = this.mission.endDate;
        }
        return dayjs(endDate).diff(this.mission.beginDate, 'month');
      },
    },
  }
</script>

<style scoped lang="scss">
  .mission {
    padding: 0 50px 50px 50px;

    &__unbreakable {
      page-break-inside: avoid;
    }

    &__client-image {
      height: 50px;
      margin-bottom: 10px;
    }

    &__header {
      display: flex;
      font-weight: 700;
    }

    &__client-name {
      flex-grow: 1;
      font-size: 1.5em;
      color: #FE414D;
    }

    &__duration {
      color: #04A0FF;
    }

    &__role {
      font-size: 1.2em;
      font-weight: 700;
      margin-bottom: 30px;
    }

    &__tldr {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: 250px;
      padding: 5px;
      overflow: hidden;
      page-break-inside: avoid;

      > * {
        margin: 0 20px;
        width: 42%;
      }
    }
  }
</style>
