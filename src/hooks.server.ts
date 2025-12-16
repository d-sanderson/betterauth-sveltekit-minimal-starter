import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { getDb } from "$lib/server/db";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { getAuth } from "$lib/auth";
import { building } from "$app/environment";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = getDb(event.platform?.env.DB, env.DATABASE_URL);
  event.locals.auth = getAuth(event.locals.db)

  return svelteKitHandler({ event, resolve, auth: event.locals.auth, building });
};
