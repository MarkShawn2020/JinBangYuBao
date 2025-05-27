/**
 * 志愿填报相关 API 服务
 * 核心业务功能的 API 封装
 */

import httpClient from '../utils/request';
import { ApiResponse, PaginatedResponse, ExamInfo } from '../types/api';

// 志愿填报相关类型定义
export interface VolunteerForm {
  id: string;
  name: string;
  type: 'school_first' | 'major_first';
  province: string;
  year: number;
  score: number;
  ranking: number;
  status: 'draft' | 'completed' | 'submitted';
  volunteers: Volunteer[];
  createdAt: string;
  updatedAt: string;
}

export interface Volunteer {
  id: string;
  order: number;
  schoolId: string;
  schoolName: string;
  majors: VolunteerMajor[];
}

export interface VolunteerMajor {
  id: string;
  majorId: string;
  majorName: string;
  order: number;
  isAdjustment: boolean;
}

export interface CreateVolunteerFormParams {
  name: string;
  type: 'school_first' | 'major_first';
  province: string;
  year: number;
  score: number;
  ranking: number;
}

export interface UpdateVolunteerParams {
  volunteers: Volunteer[];
}

export interface DiagnosisResult {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  suggestions: string[];
  details: {
    stability: number;
    gradient: number;
    coverage: number;
  };
}

export interface SmartRecommendationParams {
  preferences: {
    regions: string[];
    schoolTypes: string[];
    majors: string[];
  };
  blacklist: {
    schools: string[];
    majors: string[];
  };
  constraints: {
    minScore?: number;
    maxScore?: number;
    schoolCount?: number;
  };
}

export interface RecommendationResult {
  schools: Array<{
    schoolId: string;
    schoolName: string;
    probability: number;
    reasons: string[];
    suggestedMajors: Array<{
      majorId: string;
      majorName: string;
      probability: number;
    }>;
  }>;
}

class VolunteerService {
  /**
   * 获取志愿表列表
   */
  async getVolunteerForms(page: number = 1, pageSize: number = 10): Promise<ApiResponse<VolunteerForm[]>> {
    // TODO: 后端返回数据结构需要对接，后续可能需要转换为 PaginatedResponse 类型
    return httpClient.get('/volunteer/forms', { page, pageSize }, {
      showError: true,
    });
  }

  /**
   * 创建志愿表
   */
  async createVolunteerForm(params: CreateVolunteerFormParams): Promise<ApiResponse<VolunteerForm>> {
    return httpClient.post('/volunteer/forms', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取志愿表详情
   */
  async getVolunteerForm(formId: string): Promise<ApiResponse<VolunteerForm>> {
    return httpClient.get(`/volunteer/forms/${formId}`, {}, {
      showError: true,
    });
  }

  /**
   * 更新志愿表
   */
  async updateVolunteerForm(formId: string, params: UpdateVolunteerParams): Promise<ApiResponse<VolunteerForm>> {
    return httpClient.put(`/volunteer/forms/${formId}`, params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 删除志愿表
   */
  async deleteVolunteerForm(formId: string): Promise<ApiResponse<void>> {
    return httpClient.delete(`/volunteer/forms/${formId}`, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 一键补齐志愿
   */
  async autoFillVolunteers(formId: string): Promise<ApiResponse<VolunteerForm>> {
    return httpClient.post(`/volunteer/forms/${formId}/auto-fill`, {}, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 志愿表诊断
   */
  async diagnoseVolunteerForm(formId: string): Promise<ApiResponse<DiagnosisResult>> {
    return httpClient.post(`/volunteer/forms/${formId}/diagnose`, {}, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 提交志愿表
   */
  async submitVolunteerForm(formId: string): Promise<ApiResponse<void>> {
    return httpClient.post(`/volunteer/forms/${formId}/submit`, {}, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 智能推荐
   */
  async getSmartRecommendations(
    formId: string, 
    params: SmartRecommendationParams
  ): Promise<ApiResponse<RecommendationResult>> {
    return httpClient.post(`/volunteer/forms/${formId}/recommendations`, params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 模拟填报
   */
  async simulateVolunteerForm(params: CreateVolunteerFormParams): Promise<ApiResponse<VolunteerForm>> {
    return httpClient.post('/volunteer/simulate', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取填报模板
   */
  async getVolunteerTemplates(province: string, year: number): Promise<ApiResponse<VolunteerForm[]>> {
    return httpClient.get('/volunteer/templates', { params: { province, year } });
  }

  /**
   * 复制志愿表
   */
  async copyVolunteerForm(formId: string, newName: string): Promise<ApiResponse<VolunteerForm>> {
    return httpClient.post(`/volunteer/forms/${formId}/copy`, { newName });
  }

  /**
   * 获取用户考试信息
   */
  async getUserExamInfo(): Promise<ApiResponse<ExamInfo>> {
    return httpClient.get('/user/exam-info');
  }
}

// 导出单例实例
export const volunteerService = new VolunteerService();
