<template>
  <div class="mission">
    <MissionsHeader v-if="hasHeader" />
    <div v-if="mission">
      <img
        class="mission__client-image"
        :src="mission.client.image.src"
        :alt="mission.client.image.alt"
      />
      <div class="mission__header">
        <div class="mission__client-name">{{ mission.client.name }}</div>
        <div class="mission__duration">
          <span v-if="duration[0] > 0">{{
            $tc("mission_years", duration[0])
          }}</span>
          <span v-if="duration[1] > 0"
            >&nbsp;{{ $tc("mission_months", duration[1]) }}</span
          >
        </div>
      </div>
      <div class="mission__role">
        {{ mission.role }}
      </div>
      <div class="mission__description">
        <RichTextRenderer :document="mission.client.description" />
        <RichTextRenderer :document="mission.description" />
      </div>
      <div class="mission__tldr" v-if="mission.tldr">
        <RichTextRenderer :document="mission.tldr" />
      </div>
    </div>
  </div>
</template>

<script>
import RichTextRenderer from "contentful-rich-text-vue-renderer";
import dayjs from "dayjs";
import MissionsHeader from "@/components/missions/MissionsHeader.vue";

export default {
  components: {
    RichTextRenderer,
    MissionsHeader,
  },
  props: ["mission", "hasHeader"],
  computed: {
    duration() {
      let endDate = new Date();
      if (this.mission.endDate) {
        endDate = this.mission.endDate;
      }
      let years = dayjs(endDate).diff(this.mission.beginDate, "year");
      let months = dayjs(endDate).diff(
        dayjs(this.mission.beginDate).add(years, "year"),
        "month"
      );
      return [years, months];
    },
  },
};
</script>

<style scoped lang="scss">
.mission {
  padding: 20px 50px 50px 50px;
  page-break-after: always;

  &__client-image {
    max-height: 110px;
    max-width: 110px;
    margin-bottom: 10px;
  }

  &__header {
    display: flex;
    font-weight: 700;
  }

  &__client-name {
    flex-grow: 1;
    font-size: 1.5em;
    color: #fe414d;
  }

  &__duration {
    color: #04a0ff;
  }

  &__role {
    font-size: 1.2em;
    font-weight: 700;
    margin-bottom: 30px;
  }

  &__tldr {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-height: 400px;
    overflow: hidden;

    > p,
    ul {
      width: 50%;
    }
  }
}
</style>
