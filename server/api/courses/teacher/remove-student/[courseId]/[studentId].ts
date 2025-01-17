export default defineEventHandler((event) => {
  setHeader(event, "Access-Control-Allow-Methods", "DELETE");
});
