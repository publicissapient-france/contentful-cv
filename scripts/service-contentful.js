const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN
});

const fetchCurriculumVitae = async () => (await client.getEntries({
  content_type: 'curriculumVitae'
})).items;

module.exports = {
  fetchCurriculumVitae,
};
