import type { Endpoints, requestBodies, config } from "./types";
import { EJSON } from "bson";
import type { fetch as Ifetch } from "undici"


let localFetch: typeof Ifetch;

try {
  const { fetch: undiciFetch } = require("undici");
  localFetch = undiciFetch.fetch;
} catch (e) {
  if (fetch === undefined) throw new Error("No fetch implementation found. Please install the optional dependency undici");
  else localFetch = fetch as typeof Ifetch;
}


export default function <Endpoint extends Endpoints>(config: config, endpoint: Endpoint, body: requestBodies[Endpoint]) {

  return localFetch(config.url + "/action/" + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/ejson",
      "api-key": config.key,
    },
    body: EJSON.stringify(body, { relaxed: false }),
  })
}