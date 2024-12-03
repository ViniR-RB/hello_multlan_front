import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENVIRONMENT: z.enum(["development", "production", "staging"]),
  VITE_GEOSEARCH_API_URL: z.string().url(),
  VITE_GEOSEARCH_API_KEY: z.string(),
});

class EnvConfig {
  private static instance: EnvConfig; // Instância Singleton

  VITE_API_URL: string;
  VITE_ENVIRONMENT: "development" | "production" | "staging";
  VITE_GEOSEARCH_API_URL: string;
  VITE_GEOSEARCH_API_KEY: string;

  private constructor() {
    const parsedEnv = envSchema.safeParse(import.meta.env);

    if (!parsedEnv.success) {
      console.error(
        "Erro na validação das variáveis de ambiente:",
        parsedEnv.error.format()
      );
      throw new Error("Variáveis de ambiente inválidas.");
    }

    this.VITE_API_URL = parsedEnv.data.VITE_API_URL;
    this.VITE_ENVIRONMENT = parsedEnv.data.VITE_ENVIRONMENT;
    this.VITE_GEOSEARCH_API_URL = parsedEnv.data.VITE_GEOSEARCH_API_URL;
    this.VITE_GEOSEARCH_API_KEY = parsedEnv.data.VITE_GEOSEARCH_API_KEY;
  }

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }

    return EnvConfig.instance;
  }
}

export default EnvConfig;
