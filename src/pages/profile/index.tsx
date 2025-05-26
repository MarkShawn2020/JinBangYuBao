import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Profile extends Component<PropsWithChildren> {

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '我的'
    })
  }

  render() {
    return (
      <View className='profile-page'>
        <View className='page-content'>
          <Text className='page-title'>👤 个人中心</Text>
          <Text className='page-desc'>管理个人信息和设置</Text>
        </View>
      </View>
    )
  }
}
