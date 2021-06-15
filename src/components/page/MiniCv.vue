<template>
  <div class="cv landscape-content">
    <div class="cv__loaded" v-if="cv.id">
      <PageLandscape>
        <div class="cv__container">
          <div class="column">
            <div class="bio__container__image">
              <img v-if="picture" class="bio__image" :src="picture.src" :alt="picture.alt">
              <Lang v-bind="cv"/>
              <Xp v-bind="cv"/>
            </div>

          </div>
          <div class="column">
            <div class="header__info">
              <div class="header__name">{{cv.firstName}} {{cv.name}}</div>
              <div class="header__role">{{cv.role}}</div>
            </div>
          </div>
        </div>
      </PageLandscape>
      <Footer/>
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
  import PageLandscape from '@/components/PageLandscape';
  import Footer from '@/components/Footer';
  import Xp from '@/components/Xp';
  import Lang from '@/components/Lang';
  import * as Contentful from 'contentful';


  export default {
    name: 'MiniCv',
    components: {
      PageLandscape,
      Footer,
      Xp,
      Lang
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
  @import "@/style/variables";

  .cv {
    width: $PTT-width-px;
    height: $PTT-height-px;
    margin: auto;

    &__loading {
      font-size: 1.1em;
      text-align: center;
      margin: 50px;
    }

    &__loaded {
      width: inherit;

      .column {
        display: flex;
        flex-direction: column;
        height: 40px;

        &:first-child {
          width: 330px;
        }
        &:nth-child(2) {
          width: calc(100% - 330px);
        }

        & .bio__image{
          width:330px;
          height:330px;
        }
      }
    }

    &__container {
      display: flex;
    }
  }
</style>
