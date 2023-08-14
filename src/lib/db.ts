import { Redis } from "@upstash/redis";

export const db = new Redis({
  url: "https://apn1-rare-guppy-33427.upstash.io",
  token:
    "AYKTASQgYTk1ZDM5NjUtYTg2Yy00MTRmLTk1NDYtNzczYTgzZTZmMjY3NTMzNmI3MTRkY2I5NGVhN2FjNDg4N2ExYzdhZjY2NzA=",
});
