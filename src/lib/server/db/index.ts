import { drizzle as drizzleLibSql } from "drizzle-orm/libsql";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

export function getDb(db?: D1Database, databaseUrl?: string) {
  if (db && !env.NODE_ENV) {
    console.log('using d1')
    return drizzleD1(db, { schema });
  }

  if (databaseUrl) {
    console.log('using libsql')
    const client = createClient({ url: databaseUrl });
    return drizzleLibSql(client, { schema });
  }

  throw new Error("No database configuration found");
}

export type DrizzleClient = ReturnType<typeof getDb>;
