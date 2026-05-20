declare module "vite" {
  interface ImportMetaEnv {
    OPENAI_HOST: string;
    OPENAI_MODEL: string;
  }
  export function defineConfig<T extends UserConfig>(config: T): T;
  export type { UserConfig, UserConfigFn };
}

interface ImportMeta {
  env: ImportMetaEnv;
}
