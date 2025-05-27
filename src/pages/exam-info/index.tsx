import { Component } from 'react'
import { View, Text, Button, Form, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtTag, AtInput, AtButton } from 'taro-ui'
import { logger } from '../../utils/logger'
import './index.scss'

interface IState {
  province: string
  examBatch: string
  examType: string
  firstSubject: string
  secondSubject: string
  score: string
  rank: string
  scoreRange: string
  isFirstSubjectModalOpen: boolean
  isSecondSubjectModalOpen: boolean
  examBatchOptions: Array<{ value: string; label: string }>
  examTypeOptions: Array<{ value: string; label: string }>
  subjectOptions: Array<{ value: string; label: string }>
}

export default class ExamInfo extends Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      province: '河南',
      examBatch: '本科普通批',
      examType: '本科普通批',
      firstSubject: '物理',
      secondSubject: '化学',
      score: '',
      rank: '',
      scoreRange: '435~618',
      isFirstSubjectModalOpen: false,
      isSecondSubjectModalOpen: false,
      examBatchOptions: [
        { value: '本科普通批', label: '本科普通批' },
        { value: '高职（专科）普通批', label: '高职（专科）普通批' }
      ],
      examTypeOptions: [
        { value: '本科普通批', label: '本科普通批' },
        { value: '高职（专科）普通批', label: '高职（专科）普通批' }
      ],
      subjectOptions: [
        { value: '物理', label: '物理' },
        { value: '历史', label: '历史' },
        { value: '化学', label: '化学' },
        { value: '生物', label: '生物' },
        { value: '政治', label: '政治' },
        { value: '地理', label: '地理' }
      ]
    }
  }

  componentDidMount() {
    logger.info('ExamInfo page mounted')
    // 从缓存或API获取省份数据
    this.loadProvinceData()
  }

  loadProvinceData = () => {
    // 实际项目中应从API获取
    logger.info('Loading province data')
    // Mock data loaded
  }

  handleExamTypeChange = (value: string) => {
    logger.info('Selected exam type:', value)
    this.setState({ examType: value })
  }

  handleFirstSubjectSelect = (subject: string) => {
    logger.info('Selected first subject:', subject)
    this.setState({ 
      firstSubject: subject,
      isFirstSubjectModalOpen: false
    })
  }

  handleSecondSubjectSelect = (subject: string) => {
    logger.info('Selected second subject:', subject)
    this.setState({ 
      secondSubject: subject,
      isSecondSubjectModalOpen: false
    })
  }

  handleScoreChange = (value: string) => {
    // 验证输入是否为数字
    if (!/^[0-9]*$/.test(value) && value !== '') {
      return this.state.score
    }
    logger.info('Updated score:', value)
    this.setState({ score: value })
    return value
  }

  handleRankChange = (value: string) => {
    // 验证输入是否为数字
    if (!/^[0-9]*$/.test(value) && value !== '') {
      return this.state.rank
    }
    logger.info('Updated rank:', value)
    this.setState({ rank: value })
    return value
  }

  handleSubmit = () => {
    logger.info('Submitting exam info:', this.state)
    // 表单验证
    if (!this.state.score) {
      Taro.showToast({
        title: '请输入高考成绩',
        icon: 'none'
      })
      return
    }
    
    if (!this.state.rank) {
      Taro.showToast({
        title: '请输入高考位次',
        icon: 'none'
      })
      return
    }

    // 保存数据并跳转
    Taro.showLoading({ title: '保存中...' })
    
    // 模拟API调用
    setTimeout(() => {
      Taro.hideLoading()
      Taro.navigateTo({
        url: '/pages/volunteer/index'
      })
    }, 1000)
  }

  render() {
    const { 
      province, 
      examType, 
      firstSubject, 
      secondSubject, 
      score, 
      rank, 
      scoreRange,
      examTypeOptions,
      subjectOptions
    } = this.state

    return (
      <View className='exam-info'>
        <View className='header'>
          <View className='back-btn'>
            <Text className='icon'>←</Text>
          </View>
          <View className='title'>填写信息</View>
          <View className='more-btn'>
            <Text className='icon'>⋯</Text>
          </View>
        </View>

        <View className='form-container'>
          <Form>
            <View className='form-item'>
              <View className='label'>高考省份</View>
              <View className='value with-arrow'>
                <Text>{province}</Text>
                <Text className='arrow'>︎▼</Text>
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>报考批次</View>
              <View className='value'>
                <Text className='required'>需选择1项</Text>
                <View className='tag-group'>
                  {examTypeOptions.map(option => (
                    <View 
                      key={option.value}
                      className={`tag-item ${examType === option.value ? 'selected' : ''}`}
                      onClick={() => this.handleExamTypeChange(option.value)}
                    >
                      {option.label}
                    </View>
                  ))}
                </View>
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>首选</View>
              <View className='value'>
                <Text className='required'>需选择1门</Text>
                <View className='tag-group'>
                  <View 
                    className={`tag-item selected`}
                    onClick={() => this.setState({ isFirstSubjectModalOpen: true })}
                  >
                    {firstSubject}
                  </View>
                  <View 
                    className={`tag-item`}
                    onClick={() => this.setState({ isFirstSubjectModalOpen: true })}
                  >
                    历史
                  </View>
                </View>
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>再选</View>
              <View className='value'>
                <Text className='required'>需选择2门</Text>
                <View className='tag-group'>
                  <View 
                    className={`tag-item selected`}
                    onClick={() => this.setState({ isSecondSubjectModalOpen: true })}
                  >
                    {secondSubject}
                  </View>
                  <View className='tag-item'>生物</View>
                  <View className='tag-item'>政治</View>
                  <View className='tag-item'>地理</View>
                </View>
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>高考成绩</View>
              <View className='value'>
                <AtInput
                  name='score'
                  type='number'
                  placeholder='请输入分数'
                  value={score}
                  onChange={this.handleScoreChange}
                />
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>高考位次</View>
              <View className='value'>
                <AtInput
                  name='rank'
                  type='number'
                  placeholder='请输入位次'
                  value={rank}
                  onChange={this.handleRankChange}
                />
              </View>
            </View>
            
            <View className='form-item score-range'>
              <Text className='star'>*</Text>
              <Text className='year'>2024年高考一分一段</Text>
              <Text className='range'>{scoreRange}</Text>
              <Text className='unit'>名</Text>
            </View>
          </Form>
          
          <View className='submit-container'>
            <AtButton type='primary' className='submit-btn' onClick={this.handleSubmit}>
              完成
            </AtButton>
          </View>
          
          <View className='disclaimer'>
            本产品仅支持普通类高考批次考生
            <View>暂不支持艺术生、提前批等特殊类型志愿</View>
          </View>
        </View>
      </View>
    )
  }
}
