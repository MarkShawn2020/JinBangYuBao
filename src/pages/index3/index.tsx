import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss"
import './index.scss'

interface IFunctionItem {
  id: string
  title: string
  icon: string
  color: string
  path?: string
}

interface INewsItem {
  id: string
  title: string
  date: string
  summary: string
}

export default class Index extends Component<PropsWithChildren> {

  componentDidMount() {
    // 设置导航栏
    Taro.setNavigationBarTitle({
      title: '金榜豫报'
    })
  }
  
  // 功能入口配置
  functionItems: IFunctionItem[] = [
    { id: '1', title: '模拟填报', icon: '📝', color: '#8B7CF6', path: '/pages/mock/index' },
    { id: '2', title: '志愿表', icon: '📋', color: '#EC4899', path: '/pages/volunteer/index' },
    { id: '3', title: '择校158', icon: '🏫', color: '#10B981', path: '/pages/school/index' },
    { id: '4', title: 'AI一键填报', icon: '🤖', color: '#F59E0B', path: '/pages/ai/index' },
    { id: '5', title: '查大学', icon: '🏛️', color: '#3B82F6', path: '/pages/university/index' },
    { id: '6', title: '查专业', icon: '📚', color: '#6366F1', path: '/pages/major/index' },
    { id: '7', title: '招生计划', icon: '📊', color: '#8B5CF6', path: '/pages/plan/index' },
    { id: '8', title: '一分一段', icon: '📈', color: '#06B6D4', path: '/pages/score/index' },
    { id: '9', title: '查院线', icon: '📏', color: '#84CC16', path: '/pages/line/index' },
    { id: '10', title: '录取日程', icon: '📅', color: '#F97316', path: '/pages/schedule/index' }
  ]

  // 热点资讯数据
  newsItems: INewsItem[] = [
    {
      id: '1',
      title: '985/211 vs 双一流院校对比，哪种专业更理想，即你科学最佳选择！',
      date: '2025-5-8',
      summary: '深度分析985/211与双一流院校的区别与优势'
    },
    {
      id: '2', 
      title: '2025高考院校时间公布！提前准备志愿填报，圆梦理想大学！',
      date: '2025-5-12',
      summary: '最新院校招生时间安排'
    },
    {
      id: '3',
      title: '分数线预估+院校优势分析，避免踩雷误区，精准锁定目标院校！',
      date: '',
      summary: '专业的志愿填报指导'
    }
  ]

  // 处理登录点击
  handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  // 处理功能项点击
  handleFunctionClick = (item: IFunctionItem) => {
    if (item.path) {
      Taro.navigateTo({
        url: item.path
      }).catch(() => {
        Taro.showToast({
          title: '功能开发中',
          icon: 'none'
        })
      })
    }
  }

  render() {
    return (
      <View className='index-page'>
        {/* 主要内容区域 */}
        <View className='index-content'>
          {/* 顶部横幅 */}
          <View className='banner-section'>
            <View className='banner-card'>
              <View className='banner-content'>
                <View className='banner-text'>
                  <Text className='banner-title'>高考百日冲刺</Text>
                  <Text className='banner-subtitle'>我们陪伴</Text>
                  <Text className='banner-desc'>精准填报 • 圆梦名校</Text>
                </View>
                <View className='banner-icons'>
                  <Text className='banner-emoji'>🎓</Text>
                  <Text className='banner-emoji'>📚</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 登录区域 */}
          <View className='login-section'>
            <View className='login-card'>
              <Text className='login-tip'>完善信息，为您推荐最适合的志愿高考服务</Text>
              <AtButton 
                type='primary' 
                className='login-btn'
                onClick={this.handleLogin}
              >
                点击登录
              </AtButton>
            </View>
          </View>

          {/* 功能网格 */}
          <View className='function-grid'>
            {this.functionItems.map((item) => (
              <View 
                key={item.id} 
                className='function-item'
                onClick={() => this.handleFunctionClick(item)}
              >
                <View className='function-icon' style={{ backgroundColor: item.color }}>
                  <Text className='function-emoji'>{item.icon}</Text>
                </View>
                <Text className='function-title'>{item.title}</Text>
              </View>
            ))}
          </View>

          {/* 热点资讯 */}
          <View className='news-section'>
            <View className='news-header'>
              <Text className='news-title'>热点招生资讯</Text>
              <Text className='news-more'>更多</Text>
            </View>
            <View className='news-list'>
              {this.newsItems.map((item) => (
                <View key={item.id} className='news-item'>
                  <Text className='news-item-title'>{item.title}</Text>
                  <View className='news-item-meta'>
                    <Text className='news-item-source'>河南考者试院</Text>
                    {item.date && <Text className='news-item-date'>{item.date}</Text>}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
