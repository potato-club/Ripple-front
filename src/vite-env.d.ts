/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_LOCALSTORAGE_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
