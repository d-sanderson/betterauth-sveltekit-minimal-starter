import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, request }) => {
  const session = await locals.auth.api.getSession({ headers: request.headers });
  return {
    session,
  };
};
