<template>
  <div id="app">
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
          <div>
            <InfoContent :background="background" :talks="talks" :posts="posts"/>
            <MissionsHeader/>
            <Mission v-for="(mission, index) in missions" :mission="mission" :key="index"/>
          </div>
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
</template>

<script>
  import HeaderBig from '@/components/HeaderBig';
  import LangAndXp from '@/components/LangAndXp';
  import TechIcons from '@/components/TechIcons';
  import Bio from '@/components/Bio';
  import Footer from '@/components/Footer';
  import Header from '@/components/Header';
  import Page from '@/components/Page';
  import * as Contentful from 'contentful';
  import Mission from '@/components/Mission';
  import MissionsHeader from '@/components/MissionsHeader';
  import ExpertiseAndSkills from '@/components/ExpertiseAndSkills';
  import InfoContent from '@/components/background/InfoContent';

  export default {
    name: 'App',
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
      const client = Contentful.createClient({
        space: process.env.VUE_APP_SPACE,
        accessToken: process.env.VUE_APP_TOKEN,
      });
      const entries = await client.getEntries({
        content_type: 'curriculumVitae',
        'fields.id': 'blacroix@xebia.fr',
        include: 2,
      });
      this.cv = entries.items[0].fields;
      console.log(this.cv);
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
    },
  }
</script>

<style lang="scss">
  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }
  }

  body {
    margin: 0;
    font-size: 14px;
  }

  ul {
    margin: 5px 0;
    padding-left: 10px;
    list-style: none;

    p {
      margin: 0;
      display: inline-block;
    }
  }

  li {
    &::before {
      vertical-align: top;
      content: "\2022";
      color: #fe414d;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }

    li {
      &::before {
        content: "\25E6";
        margin-left: -.5em;
      }
    }
  }

  #app {
    width: 794px; /* 96 ppi */
    margin: auto;
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2B2B2B;
  }
</style>
