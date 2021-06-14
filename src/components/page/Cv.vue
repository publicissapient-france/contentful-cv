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
              <Mission v-for="(mission, index) in missions()" :mission="mission" :key="index" :hasHeader="index===0"/>
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
    <div class="cv__loading" v-else>
      <p>⏳ Récupération des données de Contentful...</p>
      <p>Un peu long la première fois, la lambda se chauffe 🔥...</p>
      <div v-if="error">
        <p>❌ Une erreur est survenue lors de la récupération du CV.</p>
        <p>💡 Vérifiez les données Contentful et essayez à nouveau : tous les champs Contentful doivent être publiés
          (pas de Draft). Vérifiez notamment les clients dans les
          missions.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoContent from '@/components/background/InfoContent';
  import ExpertiseAndSkills from '@/components/ExpertiseAndSkills';
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
        cv: {},
        error: false,
      };
    },
    created() {
      this.$i18n.locale = this.locale;
    },
    async mounted() {
      document.title = '⏳ Curriculum vitae';
      this.error = false;
      const token = await this.$auth.getTokenSilently();
      try {
        const client = Contentful.createClient({
          host: process.env.VUE_APP_API_HOST,
          basePath: `/people/${this.$route.params.id}/cv`,
          space: 's',
          accessToken: token,
        });
        const entries = await client.getEntries({locale: this.locale});
        this.cv = entries.items[0].fields;
        document.title = `${this.cv.name.toUpperCase()} ${this.cv.firstName} - Publicis Sapient France DBT - ${this.currentYear()} - ${this.locale.toUpperCase()}`;
      } catch (e) {
        this.error = true;
        document.title = `❌ Curriculum vitae`;
      }
    },
    methods: {
      missions() {
        try {
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
        } catch (_) {
          this.cv = {};
          this.error = true;
          document.title = `❌ Curriculum vitae`;
        }
      },
    },
    computed: {
      locale() {
        return this.$route.query.lang ? this.$route.query.lang : 'fr';
      },
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
      },
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style scoped lang="scss">
  .cv {
    &__loading {
      font-size: 1.1em;
      text-align: center;
      margin: 50px;
    }
  }
</style>
