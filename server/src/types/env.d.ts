declare namespace NodeJS {
  interface ProcessEnv {
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_SECRET: string;
  }
}