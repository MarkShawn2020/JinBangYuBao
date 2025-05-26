/**
 * 院校和专业相关 API 服务
 * 处理院校查询、专业检索等功能
 */

import httpClient from '../utils/request';
import { ApiResponse, PaginatedResponse } from '../types/api';

// 院校相关类型定义
export interface School {
  id: string;
  name: string;
  code: string;
  type: string; // 985、211、双一流、普通本科等
  level: string; // 本科、专科
  province: string;
  city: string;
  address: string;
  website?: string;
  phone?: string;
  description?: string;
  logo?: string;
  tags: string[];
  ranking?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Major {
  id: string;
  name: string;
  code: string;
  category: string;
  description?: string;
  employmentRate?: number;
  averageSalary?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SchoolMajor {
  id: string;
  schoolId: string;
  school: School;
  majorId: string;
  major: Major;
  year: number;
  province: string;
  batchType: string; // 批次类型
  admissionScore: {
    min: number;
    max: number;
    avg: number;
  };
  admissionRanking: {
    min: number;
    max: number;
    avg: number;
  };
  planCount: number; // 招生计划
  enrolledCount: number; // 实际录取
}

export interface SchoolSearchParams {
  keyword?: string;
  province?: string;
  city?: string;
  type?: string;
  level?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
}

export interface MajorSearchParams {
  keyword?: string;
  category?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
}

export interface SchoolMajorSearchParams {
  schoolId?: string;
  majorId?: string;
  province?: string;
  year?: number;
  batchType?: string;
  minScore?: number;
  maxScore?: number;
  page?: number;
  pageSize?: number;
}

export interface AdmissionData {
  year: number;
  province: string;
  batchType: string;
  planCount: number;
  enrolledCount: number;
  scores: {
    min: number;
    max: number;
    avg: number;
  };
  rankings: {
    min: number;
    max: number;
    avg: number;
  };
}

class SchoolService {
  /**
   * 搜索院校
   */
  async searchSchools(params: SchoolSearchParams): Promise<ApiResponse<School[]>> {
    // TODO: 后端返回数据结构需要对接，后续可能需要转换为 PaginatedResponse 类型
    return httpClient.get('/schools/search', params, {
      showError: true,
    });
  }

  /**
   * 获取院校详情
   */
  async getSchoolDetail(schoolId: string): Promise<ApiResponse<School>> {
    return httpClient.get(`/schools/${schoolId}`, {}, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取院校专业列表
   */
  async getSchoolMajors(schoolId: string, year?: number): Promise<ApiResponse<SchoolMajor[]>> {
    return httpClient.get(`/schools/${schoolId}/majors`, { year }, {
      showError: true,
    });
  }

  /**
   * 获取院校录取数据
   */
  async getSchoolAdmissionData(
    schoolId: string, 
    province: string, 
    years?: number[]
  ): Promise<ApiResponse<AdmissionData[]>> {
    return httpClient.get(`/schools/${schoolId}/admission-data`, { province, years }, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 搜索专业
   */
  async searchMajors(params: MajorSearchParams): Promise<ApiResponse<Major[]>> {
    // TODO: 后端返回数据结构需要对接，后续可能需要转换为 PaginatedResponse 类型
    return httpClient.get('/majors/search', params, {
      showError: true,
    });
  }

  /**
   * 获取专业详情
   */
  async getMajorDetail(majorId: string): Promise<ApiResponse<Major>> {
    return httpClient.get(`/majors/${majorId}`, {}, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取专业开设院校
   */
  async getMajorSchools(majorId: string, year?: number): Promise<ApiResponse<SchoolMajor[]>> {
    return httpClient.get(`/majors/${majorId}/schools`, { year }, {
      showError: true,
    });
  }

  /**
   * 搜索院校专业组合
   */
  async searchSchoolMajors(params: SchoolMajorSearchParams): Promise<ApiResponse<SchoolMajor[]>> {
    // TODO: 后端返回数据结构需要对接，后续可能需要转换为 PaginatedResponse 类型
    return httpClient.get('/school-majors/search', params, {
      showError: true,
    });
  }

  /**
   * 获取院校专业详情
   */
  async getSchoolMajorDetail(schoolMajorId: string): Promise<ApiResponse<SchoolMajor>> {
    return httpClient.get(`/school-majors/${schoolMajorId}`, {}, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取热门院校
   */
  async getPopularSchools(province?: string, limit: number = 10): Promise<ApiResponse<School[]>> {
    return httpClient.get('/schools/popular', { province, limit }, {
      showError: true,
    });
  }

  /**
   * 获取热门专业
   */
  async getPopularMajors(limit: number = 10): Promise<ApiResponse<Major[]>> {
    return httpClient.get('/majors/popular', { limit }, {
      showError: true,
    });
  }

  /**
   * 获取院校类型列表
   */
  async getSchoolTypes(): Promise<ApiResponse<string[]>> {
    return httpClient.get('/schools/types', {}, {
      showError: true,
    });
  }

  /**
   * 获取专业类别列表
   */
  async getMajorCategories(): Promise<ApiResponse<string[]>> {
    return httpClient.get('/majors/categories', {}, {
      showError: true,
    });
  }

  /**
   * 获取省份城市列表
   */
  async getRegions(): Promise<ApiResponse<Array<{ province: string; cities: string[] }>>> {
    return httpClient.get('/regions', {}, {
      showError: true,
    });
  }

  /**
   * 比较院校
   */
  async compareSchools(schoolIds: string[]): Promise<ApiResponse<School[]>> {
    return httpClient.post('/schools/compare', { schoolIds }, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 比较专业
   */
  async compareMajors(majorIds: string[]): Promise<ApiResponse<Major[]>> {
    return httpClient.post('/majors/compare', { majorIds }, {
      showLoading: true,
      showError: true,
    });
  }
}

// 导出单例实例
export const schoolService = new SchoolService();
