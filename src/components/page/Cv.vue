<template>
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
  import InfoContent from '@/components/background/InfoContent';
  import ExpertiseAndSkills from '@/components/ExpertiseAndSkills';
  import MissionsHeader from '@/components/MissionsHeader';
  import Mission from '@/components/Mission';
  import Page from '@/components/Page';
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  import Bio from '@/components/Bio';
  import TechIcons from '@/components/TechIcons';
  import LangAndXp from '@/components/LangAndXp';
  import HeaderBig from '@/components/HeaderBig';
  import axios from 'axios';

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
      const response = await axios.get(`${process.env.VUE_APP_API}/${this.$route.params.id}/cv`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      this.cv = response.data;
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

<style scoped>

</style>
