const apiMap = {
  development: 'http://183.82.55.190:8880/MOLD-TEK/api',
  staging: 'http://10.10.25.5:8880/MOLD-TEK/api',
  production: 'http://10.10.25.5:8880/MOLD-TEK/api',
} as const;

type Env = keyof typeof apiMap;

function getBaseApiUrl(): string {
  const env = import.meta.env.MODE as Env;
  console.log(env, 'ENVIRONMENT');
  return apiMap[env] ?? apiMap.production;
}

export const BASE_API_URL = getBaseApiUrl();
