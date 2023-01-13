import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import parser from "ua-parser-js";

// import isbot from 'isbot'
// import geoip from 'geoip-country'
// Nodejs HTTP
// isbot(request.getHeader('User-Agent'))

// var ip = "207.97.227.239";
// var geo = geoip.lookup(ip);

// console.log(geo);
// { range: [ 3479299040, 3479299071 ],
//   country: 'US'}

export async function loader({ request }: LoaderArgs) {
  const ua = request.headers.get("user-agent");
  const usera = parser(ua);
  const device = `${usera.browser.name} ${usera.browser.major}, ${usera.os.name}`;
  console.log(request.method);
  const requestUrl = new URL(request.url);
  const term = requestUrl.searchParams;
  console.log(term);
  // const projectID = requestUrl.searchParams.get("client_id");
  const projectID = "cl82zdzqm0010d4lbgtmm4kc1";
  // const uid = requestUrl.searchParams.get("uid");
  const uid = "sdhsadh";
  const t = requestUrl.searchParams.get("t");
  const referer = requestUrl.searchParams.get("ref");
  const width = requestUrl.searchParams.get("w");
  const height = requestUrl.searchParams.get("h");
  if (typeof uid === "string" && typeof projectID === "string") {
    try {
      // const data = await db.user.upsert({
      //   where: { userId: uid },
      //   update: {},
      //   create: {
      //     userId: uid,
      //     device: device,
      //     projectId: projectID,
      //     Path: { create: [{ path: "test" }] },
      //   },
      // });
      const data =await db.pageview.create({
        data: {
          url: requestUrl.pathname,
          projectId: projectID,
        },
      })
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}
