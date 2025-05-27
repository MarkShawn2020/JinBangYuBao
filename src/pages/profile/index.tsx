import { Component, PropsWithChildren } from 'react'
import { View, Text, Button, Image, Switch } from '@tarojs/components'
import { AtButton, AtDivider } from 'taro-ui'
import Taro from '@tarojs/taro'
import { logger } from '../../services'
import './index.scss'

interface IState {
  isTestMode: boolean;
  tapCount: number;
}

export default class Profile extends Component<PropsWithChildren, IState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      isTestMode: false,
      tapCount: 0
    };
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '我的'
    })
    logger.info('个人中心页面加载')
  }
  
  // 跳转到邀请页面
  handleInviteClick = () => {
    logger.info('用户点击了邀请好友按钮')
    Taro.navigateTo({
      url: '/pages/invite/index'
    })
  }
  
  // 启用测试模式的隐藏触发器
  handleTitleClick = () => {
    const { tapCount } = this.state;
    const newCount = tapCount + 1;
    
    if (newCount >= 5) {
      // 连续点击5次标题，开启测试模式
      logger.info('开启测试模式');
      this.setState({ 
        isTestMode: true,
        tapCount: 0
      });
      Taro.showToast({
        title: '测试模式已开启',
        icon: 'success',
        duration: 2000
      });
    } else {
      this.setState({ tapCount: newCount });
    }
  }
  
  // 清除登录信息
  handleClearLoginInfo = () => {
    logger.info('清除登录信息');
    Taro.removeStorageSync('token');
    Taro.removeStorageSync('userInfo');
    
    Taro.showToast({
      title: '登录信息已清除',
      icon: 'success',
      duration: 2000
    });
  }
  
  // 清除考试信息
  handleClearExamInfo = () => {
    logger.info('清除考试信息');
    Taro.removeStorageSync('examInfo');
    
    Taro.showToast({
      title: '考试信息已清除',
      icon: 'success',
      duration: 2000
    });
  }
  
  // 清除所有本地数据
  handleClearAllData = () => {
    logger.info('清除所有本地数据');
    Taro.clearStorageSync();
    
    Taro.showToast({
      title: '所有数据已清除',
      icon: 'success',
      duration: 2000
    });
  }
  
  // 关闭测试模式
  handleCloseTestMode = () => {
    logger.info('关闭测试模式');
    this.setState({ isTestMode: false });
    
    Taro.showToast({
      title: '测试模式已关闭',
      icon: 'success',
      duration: 2000
    });
  }

  render() {
    const { isTestMode } = this.state;
    
    return (
      <View className='profile-page'>
        <View className='page-content'>
          {/* 通过连续点击标题5次激活测试模式 */}
          <Text className='page-title' onClick={this.handleTitleClick}>👤 个人中心</Text>
          <Text className='page-desc'>管理个人信息和设置</Text>
          
          {/* 邀请好友CTA */}
          <View className='feature-section'>
            <View className='invite-card' onClick={this.handleInviteClick}>
              <View className='invite-content'>
                <View className='invite-info'>
                  <Text className='invite-title'>🎁 邀请好友</Text>
                  <Text className='invite-desc'>邀请好友填志愿，赚最高1250元红包</Text>
                </View>
                <View className='invite-action'>
                  <Text className='invite-btn'>立即邀请</Text>
                  <Text className='invite-arrow'>→</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* 其他功能区域 */}
          <View className='other-features'>
            <Text className='section-title'>常用功能</Text>
          </View>
          
          {/* 测试模式区域 - 仅在测试模式开启时显示 */}
          {isTestMode && (
            <View className='dev-options'>
              <AtDivider content='开发者选项' fontColor='#FF6E26' lineColor='#FFE8E0' />
              
              <View className='dev-options-container'>
                <AtButton 
                  type='secondary' 
                  size='small' 
                  className='dev-button' 
                  onClick={this.handleClearLoginInfo}
                >
                  清空登录信息
                </AtButton>
                
                <AtButton 
                  type='secondary' 
                  size='small' 
                  className='dev-button' 
                  onClick={this.handleClearExamInfo}
                >
                  清空考试信息
                </AtButton>
                
                <AtButton 
                  type='primary' 
                  size='small' 
                  className='dev-button danger-button' 
                  onClick={this.handleClearAllData}
                >
                  清空所有数据
                </AtButton>
                
                <AtButton 
                  type='secondary' 
                  size='small' 
                  className='dev-button close-button' 
                  onClick={this.handleCloseTestMode}
                >
                  关闭测试模式
                </AtButton>
              </View>
              
              <View className='dev-note'>
                <Text>注意：以上操作将立即生效且不可恢复</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}
