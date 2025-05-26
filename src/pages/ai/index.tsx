import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class AI extends Component<PropsWithChildren> {

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: 'AI智能填报'
    })
  }

  render() {
    return (
      <View className='ai-page'>
        <View className='page-content'>
          <Text className='page-title'>🤖 AI智能填报</Text>
          <Text className='page-desc'>人工智能为您推荐最适合的志愿方案</Text>
        </View>
      </View>
    )
  }
}
