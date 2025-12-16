import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb, type DrizzleClient } from "./server/db";
import { env } from "$env/dynamic/private";

// export const auth = betterAuth({
//   database: drizzleAdapter(getDb(undefined, 'file:local.db'), {
//     provider: "sqlite", // or "mysql", "sqlite"
//   }),
//   socialProviders: {
//     google: {
//       clientId: env.GOOGLE_CLIENT_ID!,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//     }
//   }
// });

export function getAuth(db: DrizzleClient) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite", // or "mysql", "sqlite"
    }),
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }
    }
  });
}

export type BetterAuth = ReturnType<typeof getAuth>
