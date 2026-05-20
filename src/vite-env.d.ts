/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_OPENAI_HOST?: string;
  VITE_OPENAI_MODEL?: string;
  VITE_OPENAI_API_KEY?: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
