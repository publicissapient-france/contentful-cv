# Contentful CV tooling

## Requirements

To use Contentful setup `CONTENTFUL_SPACE` and `CONTENTFUL_TOKEN` environment variables.

## Export users

```sh
npm install
npx json2csv -i <(node export-users.js) -f id,firstName,name,role,xp,0,1,2,3,4,5 > export-users.csv
```
