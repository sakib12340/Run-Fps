export async function onRequest({ request, next }) {
  const res = await next();
  if (request.headers.get("host")?.includes("pages.dev")) {
    res.headers.set("X-Robots-Tag", "noindex");
  }
  return res;
}
