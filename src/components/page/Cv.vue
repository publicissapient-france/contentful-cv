<template>
  <div class="cv">
    <div class="cv__loaded" v-if="cv.id">
      <div>
        <Page>
          <HeaderBig v-bind="cv"/>
          <LangAndXp v-bind="cv"/>
          <TechIcons :tech-icons="techIcons"/>
          <Bio :picture="picture" :biography="cv.biography"/>
          <ExpertiseAndSkills v-bind="cv"/>
        </Page>
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
              <InfoContent :background="background" :talks="talks" :posts="posts"/>
              <MissionsHeader/>
              <Mission v-for="(mission, index) in missions" :mission="mission" :key="index"/>
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

        <Header v-bind="cv"/>
        <Footer/>
      </div>
    </div>
    <h1 class="cv__loading" v-else>⏳ Récupération des données de Contentful...</h1>
  </div>
</template>

<script>
  import InfoContent from '@/components/background/InfoContent';
  import ExpertiseAndSkills from '@/components/ExpertiseAndSkills';
  import MissionsHeader from '@/components/missions/MissionsHeader';
  import Mission from '@/components/missions/Mission';
  import Page from '@/components/Page';
  import Header from '@/components/header/Header';
  import Footer from '@/components/Footer';
  import Bio from '@/components/Bio';
  import TechIcons from '@/components/TechIcons';
  import LangAndXp from '@/components/LangAndXp';
  import HeaderBig from '@/components/header/HeaderBig';
  import * as Contentful from 'contentful';

  export default {
    name: 'Cv',
    components: {
      InfoContent,
      ExpertiseAndSkills,
      MissionsHeader,
      Mission,
      Page,
      Header,
      Footer,
      Bio,
      TechIcons,
      LangAndXp,
      HeaderBig
    },
    data() {
      return {
        cv: {}
      };
    },
    async mounted() {
      const token = await this.$auth.getTokenSilently();
      const client = Contentful.createClient({
        host: process.env.VUE_APP_API_HOST,
        basePath: `/people/${this.$route.params.id}/cv`,
        space: 's',
        accessToken: token,
      });
      const entries = await client.getEntries();
      this.cv = entries.items[0].fields;
    },
    computed: {
      techIcons() {
        return this.cv.techIcons ? this.cv.techIcons.map(ti => ({
          src: ti.fields.file.url,
          alt: ti.fields.title,
        })) : null;
      },
      picture() {
        return this.cv.picture ? {
          src: this.cv.picture.fields.file.url,
          alt: this.cv.picture.fields.title
        } : null
      },
      missions() {
        return this.cv.missions ? this.cv.missions.map(m => ({
          ...m.fields,
          client: {
            name: m.fields.client.fields.name,
            description: m.fields.client.fields.description,
            image: {
              src: m.fields.client.fields.image.fields.file.url,
              alt: m.fields.client.fields.image.fields.title,
            }
          },
        })) : null;
      },
      background() {
        return this.cv.background ? this.cv.background.map(b => ({
          ...b.fields
        })) : null;
      },
      talks() {
        return this.cv.talks ? this.cv.talks.map(t => ({
          ...t.fields
        })) : null;
      },
      posts() {
        return this.cv.posts ? this.cv.posts.map(t => ({
          ...t.fields
        })) : null;
      }
    }
  }
</script>

<style scoped lang="scss">
  .cv {
    &__loading {
      text-align: center;
      margin: 50px;
    }
  }
</style>
