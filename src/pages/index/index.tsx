import { View } from "@tarojs/components";
import { Component } from "react";
import Taro from "@tarojs/taro";
import { Screen } from "./screens/Screen";
import { logger } from "../../services";

// 创建一个Taro页面组件，使用onShow生命周期方法
export default class Index extends Component {
  // 在页面显示时触发
  componentDidShow() {
    logger.info('首页显示，刷新数据');
    
    // 检查本地存储中的考试信息
    const examInfo = Taro.getStorageSync('examInfo');
    
    if (examInfo) {
      logger.info('发起首页刷新事件');
      
      // 通过事件中心触发刷新事件，通知 FrameWrapper 组件刷新数据
      Taro.eventCenter.trigger('indexPageRefresh');
      
      // 强制刷新页面组件
      this.forceUpdate();
    }
  }
  
  render() {
    return <Screen />;
  }
}