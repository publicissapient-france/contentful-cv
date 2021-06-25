<template>
  <div class="cv landscape-content">
    <div class="cv__loaded" v-if="cv.id">
      <PageLandscape>
        <div class="cv__container">
          <div class="cv__container__column-left">
            <div>
              <img v-if="picture" class="cv__image" :src="picture.src" :alt="picture.alt">
              <div class="cv__container__xpAndLang">
                <Xp v-bind="cv"/>
                <Lang v-bind="cv"/>
              </div>
            </div>
            <Expertise v-bind="cv"/>
          </div>
          <div class="cv__container__column-right">
            <div class="header__info">
              <div class="header__name heading1">{{cv.firstName}} {{cv.name}}</div>
              <div class="header__role heading2">{{cv.role}}</div>
            </div>
            <div class="bio-and-tech">
              <div class="bio__title  heading3">{{ $t('heading.introduction') }}</div>
              <div class="tech-icons">
                <div class="tech-icons__item" v-for="(icon, index) in techIcons" :key="icon.alt">
                  <img class="tech-icons__image" :id="index" :src="icon.src" alt="icon.alt">
                  <label :for="index">{{icon.alt}}</label>
                </div>
              </div>
            </div>
            <div class="separator"/>
            <div class="bio__description" v-if="cv.biography">
              <RichTextRenderer :document="cv.biography"/>
            </div>
            <div class="missions__title  heading3">{{ $t('heading.some_missions') }}</div>
            <div class="separator"/>
            <ul class="missions__container">
              <li v-for="(mission, index) in missions()" :mission="mission" :key="index" :hasHeader="index===0">
                <p class="mission__client-name heading4">{{mission.client.name}}</p><br/>
                <RichTextRenderer :document="mission.shortDescription" v-if="mission.shortDescription"/>
                <p class="error-message" v-else>❌ Error : Short description of this mission is empty. Please complete on Contentful </p>
              </li>
            </ul>
          </div>
        </div>
      </PageLandscape>
      <FooterLogo/>
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
  import FooterLogo from '@/components/FooterLogo';
  import Xp from '@/components/Xp';
  import Lang from '@/components/Lang';
  import Expertise from '@/components/Expertise';
  import * as Contentful from 'contentful';
  import RichTextRenderer from 'contentful-rich-text-vue-renderer';

  export default {
    name: 'MiniCv',
    components: {
      PageLandscape,
      FooterLogo,
      Xp,
      Lang, Expertise, RichTextRenderer
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
        document.title = `${this.cv.name.toUpperCase()} ${this.cv.firstName} - Publicis Sapient France - ${this.currentYear()} - ${this.locale.toUpperCase()}`;
      } catch (e) {
        this.error = true;
        document.title = `❌ Curriculum vitae`;
      }

      console.log('missions', this.cv.missions);
    },
    methods: {
      missions() {
        try {
          return this.cv.missions ? this.cv.missions.slice(0, 3).map(m => ({
            ...m.fields,
            client: {
              name: m.fields.client.fields.name,
              shortDescription: m.fields.client.fields.shortDescription,
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
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/style/variables";
  @import "@/style/theme";

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
    }

    &__container {
      display: flex;
      height: 100%;

      &__column-left, &__column-right {
        display: flex;
        flex-direction: column;

        &:first-child {
          width: 330px;
        }
        &:nth-child(2) {
          width: calc(100% - 330px);
        }
      }

      &__column-left {
        background-color: $grey-S;

        & > div:first-child {
          position: relative;
        }

        & > div:nth-child(2) {
          padding: 50px 25px;
        }
      }

      &__column-right {
        padding: 50px 25px;
      }

      &__xpAndLang {
        background-color: $primary;
        padding: 10px 25px;
        position: absolute;
        bottom: 0;
        width: 100%;

        & > div:first-child {
          margin-bottom: 10px;
        }

      }
    }
  }

  .cv__image {
    width: 330px;
    height: 330px;
  }

  .header {
    &__info {
      margin-bottom: 50px;
    }

    &__role {
      color: $primary;
    }
  }

  .bio__title, .missions__title {
    color: $primary;
  }

  .bio__description {
    margin-bottom: 20px;
    column-count: 2;
    column-gap: 20px;
    color: $grey-L;

    & strong {
      color: #000000;
      font-weight: 400;
    }
  }

  .bio-and-tech {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
  }

  .tech-icons {
    display: flex;
    justify-content: flex-end;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .6rem;
      margin-left: 25px;
    }

    &__image {
      margin-bottom: 5px;
      height: 30px;
      margin-bottom: 5px;
    }
  }

  .missions__container {
    margin-left: 15px;

    & > li {
      margin-bottom: 15px;
      color: $grey-L;

      & p.mission__client-name {
        color: #000000;
      }
    }
  }

  .separator {
    width: 100%;
    border-top: 1px solid $grey-M;
    margin-top: 10px;
    margin-bottom: 30px;
  }
</style>
