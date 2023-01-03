<template>
  <div class="cv">
    <div class="cv__loaded" v-if="cv.id">
      <div>
        <PageItem>
          <HeaderBig v-bind="cv" />
          <LangAndXp v-bind="cv" />
          <TechIcons :tech-icons="techIcons" />
          <BioItem :picture="picture" :biography="cv.biography" />
          <ExpertiseAndSkills v-bind="cv" />
        </PageItem>
        <table>
          <thead>
            <tr>
              <td>
                <div style="height: 120px">&nbsp;</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InfoContent
                  :background="background"
                  :talks="talks"
                  :posts="posts"
                />
                <MissionItem
                  v-for="(mission, index) in missions()"
                  :mission="mission"
                  :key="index"
                  :hasHeader="index === 0"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div style="height: 50px">&nbsp;</div>
              </td>
            </tr>
          </tfoot>
        </table>

        <HeaderItem v-bind="cv" />
        <FooterItem />
      </div>
    </div>
    <div class="cv__loading" v-else>
      <div v-if="!error">
        <p>⏳ Calling Contentful...</p>
        <p>Please wait, the first time can be longer than usual 🔥...</p>
      </div>
      <div v-else>
        <p>❌ An error occurred.</p>
        <p>
          💡 Please check Contentful data and retry: every fields in Contentful
          should be published (not in draft). Check clients and missions.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import InfoContent from "@/components/background/InfoContent.vue";
import ExpertiseAndSkills from "@/components/ExpertiseAndSkills.vue";
import MissionItem from "@/components/missions/MissionItem.vue";
import PageItem from "@/components/PageItem.vue";
import HeaderItem from "@/components/header/HeaderItem.vue";
import FooterItem from "@/components/FooterItem.vue";
import BioItem from "@/components/BioItem.vue";
import TechIcons from "@/components/TechIcons.vue";
import LangAndXp from "@/components/LangAndXp.vue";
import HeaderBig from "@/components/header/HeaderBig.vue";
import { auth } from "@/firebase/init";
import * as Contentful from "contentful";

export default {
  components: {
    InfoContent,
    ExpertiseAndSkills,
    MissionItem,
    PageItem,
    HeaderItem,
    FooterItem,
    BioItem,
    TechIcons,
    LangAndXp,
    HeaderBig,
  },
  data() {
    return {
      cv: {},
      error: false,
    };
  },
  created() {
    this.$i18n.locale = this.locale();
  },
  async mounted() {
    const _this = this;
    document.title = "⏳ Curriculum vitae";
    auth.onAuthStateChanged(async (user) => {
      const accessToken = await user?.getIdToken();
      _this.error = false;
      try {
        const entries = await Contentful.createClient({
          host: "europe-central2-contentful-cv.cloudfunctions.net",
          basePath: `/fcv/${this.$route.query.id}`,
          space: "s",
          accessToken,
        }).getEntries({ locale: _this.locale() });
        _this.cv = entries.items[0].fields;
        document.title = `CV - ${this.cv.name.toUpperCase()} ${
          this.cv.firstName
        } - Publicis Sapient France - ${_this.locale().toUpperCase()}`;
      } catch (e) {
        console.error(e);
        this.error = true;
        document.title = `❌ Curriculum vitae`;
      }
    });
  },
  methods: {
    missions() {
      try {
        return this.cv.missions
          ? this.cv.missions.map((m) => ({
              ...m.fields,
              client: {
                name: m.fields.client.fields.name,
                description: m.fields.client.fields.description,
                image: {
                  src: m.fields.client.fields.image.fields.file.url,
                  alt: m.fields.client.fields.image.fields.title,
                },
              },
            }))
          : null;
      } catch (_) {
        this.cv = {};
        this.error = true;
        document.title = `❌ Curriculum vitae`;
      }
    },
    locale() {
      return this.$route.query.lang ? this.$route.query.lang : "fr";
    },
  },
  computed: {
    techIcons() {
      return this.cv.techIcons
        ? this.cv.techIcons.map((ti) => ({
            src: ti.fields.file.url,
            alt: ti.fields.title,
          }))
        : null;
    },
    picture() {
      return this.cv.picture
        ? {
            src: this.cv.picture.fields.file.url,
            alt: this.cv.picture.fields.title,
          }
        : null;
    },
    background() {
      return this.cv.background
        ? this.cv.background.map((b) => ({
            ...b.fields,
          }))
        : null;
    },
    talks() {
      return this.cv.talks
        ? this.cv.talks.map((t) => ({
            ...t.fields,
          }))
        : null;
    },
    posts() {
      return this.cv.posts
        ? this.cv.posts.map((t) => ({
            ...t.fields,
          }))
        : null;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.cv {
  width: $A4-width-px;
  margin: auto;

  &__loading {
    font-size: 1.1em;
    text-align: center;
    margin: 50px;
  }
}
</style>
