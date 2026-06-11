/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIFY_CLIENT_SECRET: string
  readonly SPOTIFY_REFRESH_TOKEN: string
  readonly PUBLIC_LASTFM_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
