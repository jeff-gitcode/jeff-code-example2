export default () => ({
  catsApi: process.env.CATSAPI,
  cacheTtl: parseInt(process.env.CACHETTL, 10) || 5,
});
