/**
 * API 服务统一导出入口
 * 依赖注入模式，便于测试和维护
 */

export { default as httpClient } from '../utils/request';
export { logger } from '../utils/logger';
export { appConfig } from '../utils/config';

// 导出所有 API 服务
export * from './userService';
export * from './volunteerService';
export * from './schoolService';
