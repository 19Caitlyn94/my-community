const env = process.env.NODE_ENV

export const isDev = env == "development" ? true : false;

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/';