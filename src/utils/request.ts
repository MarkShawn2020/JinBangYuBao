/**
 * Axios 核心封装
 * 企业级 HTTP 请求库，包含拦截器、错误处理、重试机制
 */

import Taro from '@tarojs/taro';
import { appConfig } from './config';
import { logger } from './logger';
import { ApiResponse, ApiError, RequestConfig } from '../types/api';

interface TaroRequestConfig {
  url: string;
  data?: any;
  header?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  timeout?: number;
  dataType?: string;
  responseType?: string;
}

class HttpClient {
  private defaultConfig: RequestConfig;
  private requestInterceptors: Array<(config: TaroRequestConfig) => TaroRequestConfig> = [];
  private responseInterceptors: Array<(response: any) => any> = [];
  private errorInterceptors: Array<(error: any) => any> = [];

  constructor() {
    this.defaultConfig = {
      showLoading: false,
      showError: true,
      retryOnError: true,
      timeout: appConfig.timeout,
    };
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor: (config: TaroRequestConfig) => TaroRequestConfig): void {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: (response: any) => any): void {
    this.responseInterceptors.push(interceptor);
  }

  // 添加错误拦截器
  addErrorInterceptor(interceptor: (error: any) => any): void {
    this.errorInterceptors.push(interceptor);
  }

  // 应用请求拦截器
  private applyRequestInterceptors(config: TaroRequestConfig): TaroRequestConfig {
    return this.requestInterceptors.reduce((cfg, interceptor) => interceptor(cfg), config);
  }

  // 应用响应拦截器
  private applyResponseInterceptors(response: any): any {
    return this.responseInterceptors.reduce((res, interceptor) => interceptor(res), response);
  }

  // 应用错误拦截器
  private applyErrorInterceptors(error: any): any {
    return this.errorInterceptors.reduce((err, interceptor) => interceptor(err), error);
  }

  // 重试机制
  private async retryRequest(
    config: TaroRequestConfig, 
    retryCount: number = appConfig.retryCount
  ): Promise<any> {
    if (retryCount <= 0) {
      throw new Error('Max retry attempts reached');
    }

    try {
      await new Promise(resolve => setTimeout(resolve, appConfig.retryDelay));
      return await this.executeRequest(config);
    } catch (error) {
      logger.warn(`Request retry ${appConfig.retryCount - retryCount + 1}/${appConfig.retryCount}`, {
        url: config.url,
        error: error.message,
      });
      return this.retryRequest(config, retryCount - 1);
    }
  }

  // 执行实际请求
  private async executeRequest(config: TaroRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      Taro.request({
        ...config,
        success: (response) => {
          try {
            const processedResponse = this.applyResponseInterceptors(response);
            resolve(processedResponse);
          } catch (error) {
            reject(error);
          }
        },
        fail: (error) => {
          const processedError = this.applyErrorInterceptors(error);
          reject(processedError);
        },
      });
    });
  }

  // 核心请求方法
  async request<T = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const mergedConfig = { ...this.defaultConfig, ...config };
    
    // 构建请求配置
    let requestConfig: TaroRequestConfig = {
      url: url.startsWith('http') ? url : `${appConfig.baseURL}${url}`,
      method,
      data,
      timeout: mergedConfig.timeout,
      header: {
        'Content-Type': 'application/json',
      },
    };

    // 应用请求拦截器
    requestConfig = this.applyRequestInterceptors(requestConfig);

    // 显示加载状态
    if (mergedConfig.showLoading) {
      Taro.showLoading({ title: '加载中...' });
    }

    try {
      // 记录请求日志
      logger.apiRequest(requestConfig.url!, method, data);

      // 执行请求
      let response;
      try {
        response = await this.executeRequest(requestConfig);
      } catch (error) {
        // 重试机制
        if (mergedConfig.retryOnError) {
          logger.warn('Request failed, attempting retry', { url: requestConfig.url, error: error.message });
          response = await this.retryRequest(requestConfig);
        } else {
          throw error;
        }
      }

      // 记录响应日志
      logger.apiResponse(requestConfig.url!, response.statusCode, response.data);

      // 处理响应数据
      const result = this.handleResponse<T>(response, mergedConfig);
      return result;

    } catch (error) {
      // 记录错误日志
      logger.apiError(requestConfig.url!, error);

      // 处理错误
      const processedError = this.handleError(error, mergedConfig);
      throw processedError;

    } finally {
      // 隐藏加载状态
      if (mergedConfig.showLoading) {
        Taro.hideLoading();
      }
    }
  }

  // 处理响应数据
  private handleResponse<T>(response: any, config: RequestConfig): ApiResponse<T> {
    const { statusCode, data } = response;

    // HTTP 状态码检查
    if (statusCode >= 200 && statusCode < 300) {
      // 业务逻辑检查
      if (data && typeof data === 'object') {
        if (data.code === 0 || data.success === true) {
          return data as ApiResponse<T>;
        } else {
          // 业务错误
          const error: ApiError = {
            code: data.code || -1,
            message: data.message || '业务处理失败',
            details: data,
          };
          throw error;
        }
      }
      
      // 直接返回数据
      return {
        code: 0,
        message: 'success',
        data: data as T,
      };
    } else {
      // HTTP 错误
      throw {
        code: statusCode,
        message: `HTTP Error: ${statusCode}`,
        details: data,
      };
    }
  }

  // 处理错误
  private handleError(error: any, config: RequestConfig): ApiError {
    let apiError: ApiError = {
      code: -1,
      message: '网络请求失败',
    };

    if (error.code !== undefined) {
      apiError = error;
    } else if (error.errMsg) {
      apiError.message = error.errMsg;
    } else if (error.message) {
      apiError.message = error.message;
    }

    // 显示错误提示
    if (config.showError) {
      Taro.showToast({
        title: apiError.message,
        icon: 'none',
        duration: 2000,
      });
    }

    return apiError;
  }

  // 便捷方法
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const queryString = params ? this.buildQueryString(params) : '';
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return this.request<T>(fullUrl, 'GET', undefined, config);
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'POST', data, config);
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PUT', data, config);
  }

  delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'DELETE', undefined, config);
  }

  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PATCH', data, config);
  }

  // 构建查询字符串
  private buildQueryString(params: Record<string, any>): string {
    return Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}

// 创建默认实例
const httpClient = new HttpClient();

// 添加默认拦截器
httpClient.addRequestInterceptor((config) => {
  // 添加认证 token
  const token = Taro.getStorageSync('token');
  if (token) {
    config.header = {
      ...config.header,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

httpClient.addResponseInterceptor((response) => {
  return response;
});

httpClient.addErrorInterceptor((error) => {
  // 处理 401 未授权
  if (error.code === 401) {
    Taro.removeStorageSync('token');
    Taro.navigateTo({ url: '/pages/login/index' });
  }
  return error;
});

export default httpClient;
