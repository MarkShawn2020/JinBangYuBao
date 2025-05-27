import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtNavBar } from 'taro-ui'
import { logger } from '../../services'
import './index.scss'

interface IState {
  isLoggedIn: boolean;
  newsItems: Array<{
    id: number;
    title: string;
    source: string;
    date: string;
  }>;
}

interface FeatureItem {
  id: string;
  icon: string;
  name: string;
  path: string;
  isBeta?: boolean;
}

export default class Index extends Component<PropsWithChildren, IState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      isLoggedIn: false,
      newsItems: [
        {
          id: 1,
          title: '985/211 vs 双一流院校对比，附王牌专业推荐，助你科学填报志愿！',
          source: '河南省考试院',
          date: '2025-5-8'
        },
        {
          id: 2,
          title: '2025高考放榜时间公布！提前准备志愿填报，圆梦理想大学！',
          source: '河南省考试院',
          date: '2025-5-12'
        },
        {
          id: 3,
          title: '分数线预估+院校梯度分析，避免滑档退档，精准锁定目标高校！',
          source: '河南省考试院',
          date: '2025-5-15'
        }
      ]
    };
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '志愿通'
    });
    
    // 检查登录状态
    const token = Taro.getStorageSync('token');
    if (token) {
      this.setState({ isLoggedIn: true });
    }
    
    logger.info('首页加载完成');
  }

  // 功能网格数据
  featureItems: FeatureItem[] = [
    {
      id: 'mock',
      icon: '../../assets/icons/mock-icon.png',
      name: '模拟填报',
      path: '/pages/mock/index'
    },
    {
      id: 'volunteer',
      icon: '../../assets/icons/volunteer-icon.png',
      name: '志愿表',
      path: '/pages/volunteer/index'
    },
    {
      id: 'expert',
      icon: '../../assets/icons/expert-icon.png',
      name: '状元1对1',
      path: '/pages/expert/index',
      isBeta: true
    },
    {
      id: 'ai',
      icon: '../../assets/icons/ai-icon.png',
      name: 'AI一键填报',
      path: '/pages/ai/index'
    },
    {
      id: 'university',
      icon: '../../assets/icons/university-icon.png',
      name: '查大学',
      path: '/pages/university/index'
    },
    {
      id: 'major',
      icon: '../../assets/icons/major-icon.png',
      name: '查专业',
      path: '/pages/major/index'
    },
    {
      id: 'enrollment',
      icon: '../../assets/icons/enrollment-icon.png',
      name: '招生计划',
      path: '/pages/enrollment/index'
    },
    {
      id: 'score',
      icon: '../../assets/icons/score-icon.png',
      name: '一分一段',
      path: '/pages/score/index'
    },
    {
      id: 'control',
      icon: '../../assets/icons/control-icon.png',
      name: '省控线',
      path: '/pages/control/index'
    },
    {
      id: 'schedule',
      icon: '../../assets/icons/schedule-icon.png',
      name: '录取日程',
      path: '/pages/schedule/index'
    }
  ];

  // 导航到登录页
  handleLogin = () => {
    logger.info('用户点击登录按钮');
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  }

  // 导航到功能页面
  handleFeatureClick = (path: string) => {
    logger.info(`用户点击功能项: ${path}`);
    Taro.navigateTo({ url: path });
  }

  // 导航到新闻详情页
  handleNewsClick = (id: number) => {
    logger.info(`用户点击新闻项: ${id}`);
    Taro.navigateTo({
      url: `/pages/exam-info/detail?id=${id}`
    });
  }

  // 查看更多新闻
  handleMoreNews = () => {
    logger.info('用户点击查看更多新闻');
    Taro.navigateTo({
      url: '/pages/exam-info/index'
    });
  }

  render() {
    const { isLoggedIn, newsItems } = this.state;

    return (
      <View className='index-page'>
        {/* 顶部广告区域 */}
        <View className='top-banner-image'>
          <Image 
            src='../../assets/img/image.jpeg' 
            mode='widthFix' 
            className='banner-img'
          />
        </View>
        
        <View className='banner-section'>
          <View className='banner-content'>
            <Text className='banner-text'>完善信息，为您精准测院校录取概率</Text>
            <View className='login-card'>
              <View className='login-btn' onClick={this.handleLogin}>
                点击登录
              </View>
            </View>
          </View>
        </View>

        {/* 功能网格区域 */}
        <View className='features-grid'>
          {this.featureItems.map(item => (
            <View 
              key={item.id} 
              className='feature-item'
              onClick={() => this.handleFeatureClick(item.path)}
            >
              <View className='feature-icon-wrapper'>
                <Image className='feature-icon' src={item.icon} mode='aspectFit' />
                {item.isBeta && <View className='beta-tag'>NEW</View>}
              </View>
              <Text className='feature-name'>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* 热点资讯区域 */}
        <View className='news-section'>
          <View className='section-header'>
            <Text className='section-title'>热点招生资讯</Text>
            <Text className='more-link' onClick={this.handleMoreNews}>更多</Text>
          </View>
          <View className='news-list'>
            {newsItems.map(news => (
              <View 
                key={news.id} 
                className='news-item'
                onClick={() => this.handleNewsClick(news.id)}
              >
                <View className='news-content'>
                  <Text className='news-title'>{news.title}</Text>
                  <View className='news-meta'>
                    <Text className='news-source'>{news.source}</Text>
                    <Text className='news-date'>{news.date}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }
}
