export default defineEventHandler(async (event): Promise<SubmitAnswer> => {
  setHeader(event, "Access-Control-Allow-Methods", "DELETE");
});
