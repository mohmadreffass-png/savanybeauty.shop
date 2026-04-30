/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_WEBHOOK: string;
  readonly VITE_SNAPCHAT_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
