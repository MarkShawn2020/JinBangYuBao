import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Volunteer extends Component<PropsWithChildren> {

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '志愿表'
    })
  }

  render() {
    return (
      <View className='volunteer-page'>
        <View className='page-content'>
          <Text className='page-title'>📋 我的志愿表</Text>
          <Text className='page-desc'>管理您的高考志愿填报方案</Text>
        </View>
      </View>
    )
  }
}
