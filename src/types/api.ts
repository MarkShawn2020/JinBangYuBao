/**
 * API 相关的 TypeScript 类型定义
 */

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
  success?: boolean;
}

export interface ApiError {
  code: number;
  message: string;
  details?: any;
  stack?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  total?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// 请求配置接口
export interface RequestConfig {
  showLoading?: boolean;
  showError?: boolean;
  retryOnError?: boolean;
  timeout?: number;
}

// 常用的 HTTP 方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 请求参数类型
export interface RequestParams {
  [key: string]: any;
}

// 上传文件相关类型
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export interface UploadConfig extends RequestConfig {
  onProgress?: (percent: number) => void;
}
