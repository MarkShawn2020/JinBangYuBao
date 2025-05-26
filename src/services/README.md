# API 服务使用指南

这是一个企业级的 axios 封装库，提供了完整的 HTTP 请求解决方案，包含日志记录、错误处理、重试机制等功能。

## 🚀 快速开始

### 基础使用

```typescript
import { httpClient, userService, volunteerService, schoolService } from '@/services';

// 直接使用 httpClient
const response = await httpClient.get('/api/data');

// 使用业务服务
const userInfo = await userService.getUserInfo();
const schools = await schoolService.searchSchools({ keyword: '清华大学' });
```

### 配置自定义请求

```typescript
// 显示加载状态和错误提示
const data = await httpClient.post('/api/submit', payload, {
  showLoading: true,
  showError: true,
  retryOnError: true,
  timeout: 15000,
});

// 静默请求（不显示错误）
const result = await httpClient.get('/api/check', {}, {
  showError: false,
  retryOnError: false,
});
```

## 📋 API 服务模块

### 用户服务 (userService)

```typescript
// 发送验证码
await userService.sendVerificationCode({
  phone: '13800138000',
  type: 'login'
});

// 登录
const { data } = await userService.login({
  phone: '13800138000',
  code: '123456'
});

// 获取用户信息
const userInfo = await userService.getUserInfo();

// 充值
await userService.recharge({
  amount: 100,
  paymentMethod: 'wechat'
});
```

### 志愿填报服务 (volunteerService)

```typescript
// 创建志愿表
const form = await volunteerService.createVolunteerForm({
  name: '2024年高考志愿',
  type: 'school_first',
  province: '河南',
  year: 2024,
  score: 650,
  ranking: 1000
});

// 智能推荐
const recommendations = await volunteerService.getSmartRecommendations(formId, {
  preferences: {
    regions: ['北京', '上海'],
    schoolTypes: ['985', '211'],
    majors: ['计算机科学与技术']
  },
  blacklist: {
    schools: [],
    majors: []
  },
  constraints: {
    minScore: 600,
    schoolCount: 10
  }
});

// 志愿表诊断
const diagnosis = await volunteerService.diagnoseVolunteerForm(formId);
```

### 院校专业服务 (schoolService)

```typescript
// 搜索院校
const schools = await schoolService.searchSchools({
  keyword: '北京',
  type: '985',
  page: 1,
  pageSize: 20
});

// 获取院校详情
const schoolDetail = await schoolService.getSchoolDetail(schoolId);

// 搜索专业
const majors = await schoolService.searchMajors({
  keyword: '计算机',
  category: '工学'
});

// 获取热门院校
const popularSchools = await schoolService.getPopularSchools('北京', 10);
```

## 🔧 高级功能

### 自定义拦截器

```typescript
import { httpClient } from '@/services';

// 添加请求拦截器
httpClient.addRequestInterceptor((config) => {
  // 添加自定义 header
  config.header = {
    ...config.header,
    'X-Custom-Header': 'custom-value'
  };
  return config;
});

// 添加响应拦截器
httpClient.addResponseInterceptor((response) => {
  // 处理响应数据
  return response;
});

// 添加错误拦截器
httpClient.addErrorInterceptor((error) => {
  // 自定义错误处理
  if (error.code === 403) {
    // 处理权限错误
  }
  return error;
});
```

### 日志管理

```typescript
import { logger } from '@/services';

// 记录不同级别的日志
logger.debug('调试信息', { data: someData });
logger.info('普通信息', { userId: 123 });
logger.warn('警告信息', { error: 'something wrong' });
logger.error('错误信息', { error: errorObject });

// 获取存储的日志
const logs = logger.getLogs();

// 清除日志
logger.clearLogs();
```

### 环境配置

```typescript
import { appConfig } from '@/services';

// 获取当前配置
console.log('Base URL:', appConfig.baseURL);
console.log('Timeout:', appConfig.timeout);
console.log('Retry Count:', appConfig.retryCount);
```

## 🎯 最佳实践

### 1. 错误处理

```typescript
try {
  const result = await userService.getUserInfo();
  // 处理成功结果
} catch (error) {
  // 错误已经被自动处理（显示 toast）
  // 这里只需要处理业务逻辑
  console.log('获取用户信息失败:', error.message);
}
```

### 2. 加载状态管理

```typescript
// 自动显示加载状态
const data = await httpClient.post('/api/heavy-task', payload, {
  showLoading: true
});

// 手动管理加载状态
Taro.showLoading({ title: '处理中...' });
try {
  const data = await httpClient.post('/api/task', payload, {
    showLoading: false
  });
} finally {
  Taro.hideLoading();
}
```

### 3. 缓存策略

```typescript
// 使用 Taro 的本地存储进行缓存
const getCachedData = async (key: string, fetchFn: () => Promise<any>) => {
  const cached = Taro.getStorageSync(key);
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5分钟缓存
    return cached.data;
  }
  
  const data = await fetchFn();
  Taro.setStorageSync(key, {
    data,
    timestamp: Date.now()
  });
  
  return data;
};

// 使用示例
const schools = await getCachedData('popular_schools', () => 
  schoolService.getPopularSchools()
);
```

## 🚨 注意事项

1. **认证 Token**: 系统会自动从本地存储读取 `token` 并添加到请求头
2. **401 处理**: 当收到 401 错误时，会自动清除 token 并跳转到登录页
3. **网络重试**: 默认开启网络重试，可以通过配置关闭
4. **错误提示**: 默认显示错误 toast，可以通过 `showError: false` 关闭
5. **日志记录**: 所有请求都会被记录，生产环境建议调整日志级别

## 📝 类型定义

所有的类型定义都在 `src/types/api.ts` 中，确保类型安全：

```typescript
import { ApiResponse, PaginatedResponse, RequestConfig } from '@/types/api';
```
