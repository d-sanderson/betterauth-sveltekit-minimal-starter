<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  async function loginWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/",
      newUserCallbackURL: "/",
    });
  }
</script>

{#if data.session?.user}
  <img src={data.session.user.image} alt={data.session.user.name} />
  Hello {data.session.user.name}
  <button
    onclick={async () => {
      await authClient.signOut();
      invalidateAll();
    }}>Logout</button
  >
{:else}
  <h1>Login</h1>
  <button onclick={loginWithGoogle}>Login with Google</button>
{/if}
