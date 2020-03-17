<template>
  <div id="app">
    <Page>
      <HeaderBig v-bind="cv"/>
      <LangAndXp v-bind="cv"/>
      <TechIcons :tech-icons="techIcons"/>
      <Bio :picture="picture" :biography="cv.biography"/>
    </Page>
    <Page>
      <Header v-bind="cv"/>
      <Footer/>
    </Page>
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

  export default {
    name: 'App',
    components: {Page, Header, Footer, Bio, TechIcons, LangAndXp, HeaderBig},
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
        'content_type': 'curriculumVitae',
        'fields.id': 'blacroix'
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
    },
  }
</script>

<style>
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

  #app {
    max-width: 794px; /* 96 ppi */
    margin: auto;
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2B2B2B;
  }
</style>
