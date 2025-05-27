import React, { Component } from "react";
import "./style.css";
import Taro from '@tarojs/taro';
import { userService, volunteerService, logger } from '../../../../../../services';
import { User, ExamInfo } from '../../../../../../types/api';

interface IState {
  isLoggedIn: boolean;
  hasExamInfo: boolean;
  userInfo: User | null;
  examInfo: ExamInfo | null;
  isLoading: boolean;
}

export class FrameWrapper extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasExamInfo: false,
      userInfo: null,
      examInfo: null,
      isLoading: true
    };
  }

  componentDidMount() {
    // 检查登录状态和考试信息
    this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    logger.info('检查登录状态');
    const token = Taro.getStorageSync('token');
    const userInfo = Taro.getStorageSync('userInfo');

    if (token && userInfo) {
      this.setState({ isLoggedIn: true, userInfo }, () => {
        // 获取用户考试信息
        this.fetchExamInfo();
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  fetchExamInfo = () => {
    logger.info('获取用户考试信息');
    // 假设有一个获取考试信息的API
    volunteerService.getUserExamInfo()
      .then(response => {
        if (response.data && response.data.score) {
          // 用户有考试信息
          this.setState({
            hasExamInfo: true,
            examInfo: response.data,
            isLoading: false
          });
        } else {
          // 用户没有考试信息
          this.setState({ hasExamInfo: false, isLoading: false });
        }
      })
      .catch(error => {
        logger.error('获取考试信息失败', { error });
        this.setState({ hasExamInfo: false, isLoading: false });
      });
  }

  handleLogin = () => {
    logger.info('开始微信登录流程');
    this.setState({ isLoading: true });
    
    // 调用微信登录获取code
    Taro.login({
      success: (res) => {
        if (res.code) {
          logger.info('获取微信登录凭证成功', { code: res.code });
          
          // 调用我们的后端登录接口
          userService.wechatLogin({
            code: res.code,
            // 可选参数
            invite_code: null,
            channel_id: 'wechat_miniprogram'
          }).then(response => {
            // 处理登录成功
            logger.info('微信登录成功');
            
            if (response.data && response.data.user) {
              logger.info('用户信息', { userId: response.data.user.id });
              
              // 保存登录信息到本地存储
              Taro.setStorageSync('token', response.data.token);
              Taro.setStorageSync('refreshToken', response.data.refreshToken);
              Taro.setStorageSync('userInfo', response.data.user);
              
              // 更新状态
              this.setState({
                isLoggedIn: true,
                userInfo: response.data.user
              }, () => {
                // 获取考试信息
                this.fetchExamInfo();
                
                // 提示登录成功
                Taro.showToast({ 
                  title: '登录成功', 
                  icon: 'success',
                  duration: 2000
                });
              });
            }
          }).catch(error => {
            // 处理登录失败
            logger.error('微信登录失败', { error });
            this.setState({ isLoading: false });
            Taro.showToast({
              title: error.message || '登录失败，请重试',
              icon: 'none',
              duration: 2000
            });
          });
        } else {
          // 获取微信code失败
          logger.error('获取微信登录凭证失败', { errMsg: res.errMsg });
          this.setState({ isLoading: false });
          Taro.showToast({ 
            title: '登录失败: ' + res.errMsg, 
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        // 微信登录API调用失败
        logger.error('微信登录API调用失败', { err });
        this.setState({ isLoading: false });
        Taro.showToast({ 
          title: '登录失败，请检查网络', 
          icon: 'none',
          duration: 2000
        });
      }
    });
  }

  navigateToExamInfoPage = () => {
    logger.info('跳转至填写分数页面');
    Taro.navigateTo({ url: '/pages/exam-info/index' });
  }

  // 渲染分数分布图组件（暂时是一个占位符）
  renderScoreDistribution = () => {
    const { examInfo } = this.state;
    
    return (
      <div className="chart">
        <div className="overlap-group">
          <div className="view-2">
            <div className="group-2">
              <div className="text-wrapper-9">10</div>
              <div className="text-wrapper-10">可冲击&gt;</div>
              <div className="text-wrapper-11">推荐志愿</div>
            </div>

            <div className="group-3">
              <div className="text-wrapper-12">6</div>
              <div className="text-wrapper-13">较稳妥&gt;</div>
            </div>

            <div className="group-4">
              <div className="text-wrapper-14">10</div>
              <div className="text-wrapper-15">可保底&gt;</div>
            </div>
          </div>

          <div className="overlap-group-wrapper">
            <div className="vector-wrapper">
              <img
                className="vector"
                alt="Vector"
                src="../../../../../assets/img/vector-1015.svg"
              />
            </div>
          </div>

          <div className="rectangle" />

          <div className="text-wrapper-16">本科批</div>
          <div className="text-wrapper-17">专科</div>

          <img className="img" alt="Vector" src="../../../../../assets/img/vector-1004.svg" />

          <div className="element" />
          <div className="ellipse" />

          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="text-wrapper-18">{examInfo?.score || 0}分</div>
              <div className="text-wrapper-19">{examInfo?.rankRange || '暂无数据'}</div>
              <p className="p">
                <span className="span">超过本省</span>
                <span className="text-wrapper-20">{examInfo?.percentile || 0}%</span>
                <span className="span">的考生</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 根据状态渲染不同的内容
  renderContent = () => {
    const { isLoggedIn, hasExamInfo, isLoading } = this.state;
    
    // 如果正在加载中，显示加载状态
    if (isLoading) {
      return <div className="text-wrapper-24">加载中...</div>;
    }
    
    // 未登录状态：显示登录按钮
    if (!isLoggedIn) {
      return (
        <div className="text-wrapper-24" onClick={this.handleLogin}>
          点击登录
        </div>
      );
    }
    
    // 已登录但没有考试信息：显示填写分数按钮
    if (isLoggedIn && !hasExamInfo) {
      return (
        <div className="text-wrapper-24" onClick={this.navigateToExamInfoPage}>
          填写分数
        </div>
      );
    }
    
    // 已登录且有考试信息：显示分数分布图
    return this.renderScoreDistribution();
  }

  render() {
    return (
    <div className="frame-wrapper">
      <div className="view">
        <div className="text-wrapper-8">完善信息，为您精准预测院校录取概率</div>
      </div>

      <div className="overlap">
        {/* 渲染基础框架 */}
        <div className="text-wrapper-21">100分</div>
        <div className="text-wrapper-22">750分</div>
        <div className="text-wrapper-23">{this.state.examInfo?.score || '677'}分</div>
        <div className="rectangle-2" />
        <div className="rectangle-3" />
        
        {/* 根据不同状态渲染不同内容 */}
        {this.renderContent()}
      </div>
    </div>
  );
  }
}
