declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    IMG_URL: string;
    API_BASE_URL: string;
    MONGODB_URI: string;
    NODE_ENV: "development" | "production";
    NEXT_PUBLIC_API_KEY: string;
    NEXT_PUBLIC_IMG_URL: string;
    NEXT_PUBLIC_API_BASE_URL: string;
  }
}
