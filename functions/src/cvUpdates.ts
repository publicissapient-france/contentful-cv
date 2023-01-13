import axios from "axios";

export const getCvUpdates = async (): Promise<Array<CvUpdate>> => {
  const {data} = await axios.get(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE}/environments/master/entries/?content_type=curriculumVitae&order=-sys.updatedAt&include=0&limit=10`, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
    },
  });
  return data.items.map((item: any) => ({
    id: item.fields.id,
    firstName: item.fields.firstName,
    name: item.fields.name,
    updatedAt: item.sys.updatedAt,
  }));
};

type CvUpdate = {
    id: string
    firstName: string
    name: string
    updatedAt: Date
}
