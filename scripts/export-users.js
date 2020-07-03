const {fetchCurriculumVitae} = require('./service-contentful');

const exportUsers = async () => {
  const cvs = [];
  const contentfulCvs = await fetchCurriculumVitae();
  contentfulCvs.forEach(contentfulCv => {
    cvs.push({
      id: contentfulCv.fields.id,
      firstName: contentfulCv.fields.firstName,
      name: contentfulCv.fields.name,
      role: contentfulCv.fields.role,
      xp: new Date().getFullYear() - parseInt(contentfulCv.fields.graduateDate, 10),
      ...(contentfulCv.fields.techIcons.map(tech => tech.fields.title))
    });
  });
  return cvs;
};

exportUsers()
  .then(users => console.log(JSON.stringify(users)))
  .catch(console.error);
