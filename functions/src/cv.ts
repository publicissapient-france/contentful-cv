import axios from "axios";

export const getCv = async (userId: string) => {
  const {data} = await axios.get(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE}/environments/master/entries/?content_type=curriculumVitae&include=2&fields.id=${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
    },
  });
  return data;
};
