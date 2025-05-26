/**
 * 全局共享的专业 Logger
 * 统一管理日志输出，支持不同级别和环境
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStorageSize: number;
}

class Logger {
  private config: LoggerConfig;
  private logStorage: Array<{ level: string; message: string; timestamp: number; data?: any }> = [];

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableStorage: false,
      maxStorageSize: 100,
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const dataStr = data ? ` | Data: ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${level}] ${message}${dataStr}`;
  }

  private log(level: LogLevel, levelName: string, message: string, data?: any): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(levelName, message, data);

    // 控制台输出
    if (this.config.enableConsole) {
      const consoleMethod = level >= LogLevel.ERROR ? 'error' 
        : level >= LogLevel.WARN ? 'warn' 
        : level >= LogLevel.INFO ? 'info' 
        : 'log';
      console[consoleMethod](formattedMessage);
    }

    // 存储日志
    if (this.config.enableStorage) {
      this.logStorage.push({
        level: levelName,
        message,
        timestamp: Date.now(),
        data,
      });

      // 限制存储大小
      if (this.logStorage.length > this.config.maxStorageSize) {
        this.logStorage.shift();
      }
    }
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, 'INFO', message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, 'WARN', message, data);
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, 'ERROR', message, data);
  }

  // API 专用日志方法
  apiRequest(url: string, method: string, data?: any): void {
    this.info(`API Request: ${method.toUpperCase()} ${url}`, data);
  }

  apiResponse(url: string, status: number, data?: any): void {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    const levelName = status >= 400 ? 'ERROR' : 'INFO';
    this.log(level, levelName, `API Response: ${status} ${url}`, data);
  }

  apiError(url: string, error: any): void {
    this.error(`API Error: ${url}`, error);
  }

  // 获取存储的日志
  getLogs(): Array<{ level: string; message: string; timestamp: number; data?: any }> {
    return [...this.logStorage];
  }

  // 清除日志
  clearLogs(): void {
    this.logStorage = [];
  }
}

// 全局共享的 logger 实例
export const logger = new Logger({
  level: process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG,
  enableConsole: true,
  enableStorage: process.env.NODE_ENV !== 'production',
});

export default logger;
