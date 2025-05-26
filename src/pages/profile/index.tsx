import { Component, PropsWithChildren } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { logger } from '../../services'
import './index.scss'

export default class Profile extends Component<PropsWithChildren> {

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

  render() {
    return (
      <View className='profile-page'>
        <View className='page-content'>
          <Text className='page-title'>👤 个人中心</Text>
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
        </View>
      </View>
    )
  }
}
