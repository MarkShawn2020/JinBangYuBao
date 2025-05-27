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
  secondSubjects: string[]
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
      examBatch: '',
      examType: '',
      firstSubject: '',
      secondSubjects: [],
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
    const { secondSubjects } = this.state
    logger.info('Selected second subject:', subject)
    
    // 检查是否已经选择了这个科目
    const index = secondSubjects.indexOf(subject)
    let newSecondSubjects = [...secondSubjects]
    
    if (index > -1) {
      // 如果已选择，则取消选择
      newSecondSubjects.splice(index, 1)
    } else {
      // 如果未选择，且选择不超过2个，则添加
      if (newSecondSubjects.length < 2) {
        newSecondSubjects.push(subject)
      } else {
        // 如果已经选了2个，显示提示需要先取消选择
        Taro.showToast({
          title: '最多选择2门，请先取消选择一门',
          icon: 'none',
          duration: 2000
        })
      }
    }
    
    this.setState({ 
      secondSubjects: newSecondSubjects
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
    logger.info('提交高考信息');
    
    // 表单验证
    if (!this.state.examType) {
      Taro.showToast({
        title: '请选择报考批次',
        icon: 'none'
      })
      return
    }
    
    if (!this.state.firstSubject) {
      Taro.showToast({
        title: '请选择首选科目',
        icon: 'none'
      })
      return
    }
    
    if (this.state.secondSubjects.length !== 2) {
      Taro.showToast({
        title: '请选择2个再选科目',
        icon: 'none'
      })
      return
    }
    
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
    
    // 构建保存的考试信息对象
    const examInfo = {
      id: new Date().getTime().toString(), // 生成一个唯一ID
      userId: Taro.getStorageSync('userInfo')?.id,
      province: this.state.province,
      examBatch: this.state.examType,
      examType: this.state.examType,
      firstSubject: this.state.firstSubject,
      secondSubjects: this.state.secondSubjects,
      score: parseInt(this.state.score, 10),
      rank: parseInt(this.state.rank, 10),
      rankRange: this.state.scoreRange,
      percentile: 99, // 模拟数据，实际应由后端计算
      year: 2024,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    }
    
    // 保存到本地存储
    try {
      Taro.setStorageSync('examInfo', examInfo);
      logger.info('高考信息保存成功', { examInfo });
      
      setTimeout(() => {
        Taro.hideLoading()
        Taro.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            // 成功后返回首页
            setTimeout(() => {
              Taro.navigateBack()
            }, 1500)
          }
        })
      }, 500)
    } catch (error) {
      Taro.hideLoading()
      logger.error('高考信息保存失败', { error });
      Taro.showToast({
        title: '保存失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  }

  render() {
    const { 
      province, 
      examType, 
      firstSubject, 
      secondSubjects, 
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
                  {/* 物理选项 */}
                  <View 
                    className={`tag-item ${firstSubject === '物理' ? 'selected' : ''}`}
                    onClick={() => this.handleFirstSubjectSelect('物理')}
                  >
                    物理
                  </View>
                  {/* 历史选项 */}
                  <View 
                    className={`tag-item ${firstSubject === '历史' ? 'selected' : ''}`}
                    onClick={() => this.handleFirstSubjectSelect('历史')}
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
                  {/* 化学选项 */}
                  <View 
                    className={`tag-item ${secondSubjects.includes('化学') ? 'selected' : ''}`}
                    onClick={() => this.handleSecondSubjectSelect('化学')}
                  >
                    化学
                  </View>
                  {/* 生物选项 */}
                  <View 
                    className={`tag-item ${secondSubjects.includes('生物') ? 'selected' : ''}`}
                    onClick={() => this.handleSecondSubjectSelect('生物')}
                  >
                    生物
                  </View>
                  {/* 政治选项 */}
                  <View 
                    className={`tag-item ${secondSubjects.includes('政治') ? 'selected' : ''}`}
                    onClick={() => this.handleSecondSubjectSelect('政治')}
                  >
                    政治
                  </View>
                  {/* 地理选项 */}
                  <View 
                    className={`tag-item ${secondSubjects.includes('地理') ? 'selected' : ''}`}
                    onClick={() => this.handleSecondSubjectSelect('地理')}
                  >
                    地理
                  </View>
                </View>
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>高考成绩</View>
              <View className='value'>
                <View className='custom-input-wrapper'>
                  <input
                    className='custom-input'
                    type='number'
                    placeholder='请输入分数'
                    value={score}
                    onChange={(e) => this.handleScoreChange(e.target.value)}
                  />
                </View>
              </View>
            </View>
            
            <View className='form-item'>
              <View className='label'>高考位次</View>
              <View className='value'>
                <View className='custom-input-wrapper'>
                  <input
                    className='custom-input'
                    type='number'
                    placeholder='请输入位次'
                    value={rank}
                    onChange={(e) => this.handleRankChange(e.target.value)}
                  />
                </View>
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
