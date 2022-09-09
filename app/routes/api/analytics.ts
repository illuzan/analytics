import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
export async function loader({ request }: LoaderArgs) {
  console.log(request.method);
  const requestUrl = new URL(request.url);
  //   console.log(url);
  const term = requestUrl.searchParams;
  console.log(term);
  const projectID = requestUrl.searchParams.get("client_id");
  const t = requestUrl.searchParams.get("t");
  const referer = requestUrl.searchParams.get("ref");
  const width = requestUrl.searchParams.get("w");
  const height = requestUrl.searchParams.get("h");

  console.log(projectID, t, referer, width, height);

  return null;
}
