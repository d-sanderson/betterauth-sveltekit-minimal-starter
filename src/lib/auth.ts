import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb, type DrizzleClient } from "./server/db";
import { env } from "$env/dynamic/private";

// NOTE: this needs to be commented back in to generate better-auth-schema.ts cmd below
// pnpm dlx @better-auth/cli generate --output src/lib/server/db/better-auth-schema.ts
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
