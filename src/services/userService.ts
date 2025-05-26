/**
 * 用户相关 API 服务
 * 遵循单一职责原则，只处理用户相关的 API 调用
 */

import httpClient from '../utils/request';
import { ApiResponse } from '../types/api';

// 用户相关的类型定义
export interface User {
  id: string;
  phone: string;
  nickname?: string;
  avatar?: string;
  vipLevel: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginParams {
  phone: string;
  code: string;
}

export interface WechatLoginParams {
  code: string;
  invite_code?: string;
  channel_id?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SendCodeParams {
  phone: string;
  type: 'login' | 'register' | 'reset';
}

export interface UpdateProfileParams {
  nickname?: string;
  avatar?: string;
}

export interface RechargeParams {
  amount: number;
  paymentMethod: 'wechat' | 'alipay';
}

export interface Order {
  id: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface InviteInfo {
  inviteCode: string;
  invitedUsers: Array<{
    id: string;
    nickname: string;
    avatar: string;
    createdAt: string;
    isVip: boolean;
  }>;
  rewards: Array<{
    id: string;
    type: string;
    amount: number;
    status: string;
    createdAt: string;
  }>;
  statistics: {
    totalInvited: number;
    totalRewards: number;
    convertCount: number;
  };
}

class UserService {
  /**
   * 发送验证码
   */
  async sendVerificationCode(params: SendCodeParams): Promise<ApiResponse<void>> {
    return httpClient.post('/auth/send-code', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 手机验证码登录
   */
  async login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
    return httpClient.post('/auth/login', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 微信小程序登录
   * @param params 微信登录参数（code、邀请码等）
   */
  async wechatLogin(params: WechatLoginParams): Promise<ApiResponse<LoginResponse>> {
    return httpClient.post('/wechat/login', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 退出登录
   */
  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post('/auth/logout', {}, {
      showError: true,
    });
  }

  /**
   * 刷新 token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string }>> {
    return httpClient.post('/auth/refresh', { refreshToken }, {
      showError: false,
    });
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(): Promise<ApiResponse<User>> {
    return httpClient.get('/user/profile', {}, {
      showError: true,
    });
  }

  /**
   * 更新用户信息
   */
  async updateProfile(params: UpdateProfileParams): Promise<ApiResponse<User>> {
    return httpClient.put('/user/profile', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取余额信息
   */
  async getBalance(): Promise<ApiResponse<{ balance: number }>> {
    return httpClient.get('/user/balance', {}, {
      showError: true,
    });
  }

  /**
   * 充值
   */
  async recharge(params: RechargeParams): Promise<ApiResponse<{ orderId: string; paymentUrl: string }>> {
    return httpClient.post('/user/recharge', params, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取订单列表
   */
  async getOrders(page: number = 1, pageSize: number = 10): Promise<ApiResponse<Order[]>> {
    return httpClient.get('/user/orders', { page, pageSize }, {
      showError: true,
    });
  }

  /**
   * 绑定推荐人
   */
  async bindInviter(inviteCode: string): Promise<ApiResponse<void>> {
    return httpClient.post('/user/bind-inviter', { inviteCode }, {
      showLoading: true,
      showError: true,
    });
  }

  /**
   * 获取邀请码
   */
  async getInviteCode(): Promise<ApiResponse<{ inviteCode: string }>> {
    return httpClient.get('/user/invite-code', {}, {
      showError: true,
    });
  }
  
  /**
   * 获取完整邀请信息，包含已邀请用户和奖励
   */
  async getInviteInfo(): Promise<ApiResponse<InviteInfo>> {
    return httpClient.get('/user/invite-info', {}, {
      showError: true,
    });
  }
  
  /**
   * 领取邀请奖励
   * @param rewardId 奖励ID
   */
  async claimInviteReward(rewardId: string): Promise<ApiResponse<{ success: boolean }>> {
    return httpClient.post('/user/claim-reward', { rewardId }, {
      showLoading: true,
      showError: true,
    });
  }
}

// 导出单例实例
export const userService = new UserService();
