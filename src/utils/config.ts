/**
 * 应用配置管理
 * 统一管理环境配置，避免硬编码
 */

export interface AppConfig {
  baseURL: string;
  timeout: number;
  retryCount: number;
  retryDelay: number;
}

// 环境配置
const configs: Record<string, AppConfig> = {
  development: {
    baseURL: 'http://39.105.157.244:8000/v1/',
    timeout: 10000,
    retryCount: 3,
    retryDelay: 1000,
  },
  production: {
    baseURL: 'http://39.105.157.244:8000/v1/',
    timeout: 15000,
    retryCount: 2,
    retryDelay: 1500,
  },
  test: {
    baseURL: 'http://39.105.157.244:8000/v1/',
    timeout: 5000,
    retryCount: 1,
    retryDelay: 500,
  },
};

// 获取当前环境
const getEnvironment = (): string => {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  return 'development';
};

export const appConfig: AppConfig = configs[getEnvironment()] || configs.development;
