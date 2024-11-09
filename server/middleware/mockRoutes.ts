export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (process.env.NODE_ENV === "production" && url.pathname.startsWith("/api")) {
    event.node.res.statusCode = 404;
    event.node.res.end("Not found");
  }
});
