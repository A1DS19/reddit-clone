declare namespace NodeJS {
  interface ProcessEnv {
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    SMTP_SERVER: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
  }
}