import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Mock extends Component<PropsWithChildren> {

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '模拟填报'
    })
  }

  render() {
    return (
      <View className='mock-page'>
        <View className='page-content'>
          <Text className='page-title'>📝 模拟填报</Text>
          <Text className='page-desc'>智能志愿填报模拟，助您做出最佳选择</Text>
        </View>
      </View>
    )
  }
}
