import { Component, PropsWithChildren } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtNavBar, AtToast } from "taro-ui";
import { logger, userService } from "../../services";
import { User, ExamInfo } from "../../types/api";
import "./index.scss";

interface IState {
  isLoggedIn: boolean;
  isLoading: boolean;
  hasExamInfo: boolean;
  userInfo: User | null;
  examInfo: ExamInfo | null;
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
      isLoading: false,
      hasExamInfo: false,
      userInfo: null,
      examInfo: null,
      newsItems: [
        {
          id: 1,
          title:
            "985/211 vs 双一流院校对比，附王牌专业推荐，助你科学填报志愿！",
          source: "河南省考试院",
          date: "2025-5-8",
        },
        {
          id: 2,
          title: "2025高考放榜时间公布！提前准备志愿填报，圆梦理想大学！",
          source: "河南省考试院",
          date: "2025-5-12",
        },
        {
          id: 3,
          title: "分数线预估+院校梯度分析，避免滑档退档，精准锁定目标高校！",
          source: "河南省考试院",
          date: "2025-5-15",
        },
      ],
    };
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: "志愿通",
    });

    // 检查登录状态
    this.checkLoginStatus();

    // 添加事件监听器，用于接收页面刷新通知
    Taro.eventCenter.on("indexPageRefresh", () => {
      logger.info("首页接收到页面刷新事件");
      this.refreshData();
    });

    logger.info("首页加载完成");
  }

  componentWillUnmount() {
    // 组件卸载时移除事件监听
    Taro.eventCenter.off("indexPageRefresh");
  }

  // 刷新数据方法
  refreshData = () => {
    logger.info("刷新首页数据");
    this.fetchExamInfo();
  };

  // 检查登录状态
  checkLoginStatus = () => {
    logger.info("检查登录状态");
    const token = Taro.getStorageSync("token");
    const userInfo = Taro.getStorageSync("userInfo");

    if (token && userInfo) {
      this.setState({ isLoggedIn: true, userInfo }, () => {
        // 获取用户考试信息
        this.fetchExamInfo();
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  // 获取考试信息
  fetchExamInfo = () => {
    logger.info("获取用户考试信息");

    // 从本地存储中获取考试信息
    try {
      const examInfo = Taro.getStorageSync("examInfo");

      if (examInfo && examInfo.score) {
        // 用户有考试信息
        logger.info("从本地读取考试信息成功");
        this.setState({
          hasExamInfo: true,
          examInfo: examInfo,
          isLoading: false,
        });
      } else {
        // 用户没有考试信息
        logger.info("本地没有存储考试信息");
        this.setState({ hasExamInfo: false, isLoading: false });
      }
    } catch (error) {
      logger.error("获取考试信息失败", { error });
      this.setState({ hasExamInfo: false, isLoading: false });
    }
  };

  // 功能网格数据
  featureItems: FeatureItem[] = [
    {
      id: "mock",
      icon: "../../assets/icons/mock-icon.png",
      name: "模拟填报",
      path: "/pages/mock/index",
    },
    {
      id: "volunteer",
      icon: "../../assets/icons/volunteer-icon.png",
      name: "志愿表",
      path: "/pages/volunteer/index",
    },
    {
      id: "expert",
      icon: "../../assets/icons/expert-icon.png",
      name: "状元1对1",
      path: "/pages/expert/index",
      isBeta: true,
    },
    {
      id: "ai",
      icon: "../../assets/icons/ai-icon.png",
      name: "AI一键填报",
      path: "/pages/ai/index",
    },
    {
      id: "university",
      icon: "../../assets/icons/university-icon.png",
      name: "查大学",
      path: "/pages/university/index",
    },
    {
      id: "major",
      icon: "../../assets/icons/major-icon.png",
      name: "查专业",
      path: "/pages/major/index",
    },
    {
      id: "enrollment",
      icon: "../../assets/icons/enrollment-icon.png",
      name: "招生计划",
      path: "/pages/enrollment/index",
    },
    {
      id: "score",
      icon: "../../assets/icons/score-icon.png",
      name: "一分一段",
      path: "/pages/score/index",
    },
    {
      id: "control",
      icon: "../../assets/icons/control-icon.png",
      name: "省控线",
      path: "/pages/control/index",
    },
    {
      id: "schedule",
      icon: "../../assets/icons/schedule-icon.png",
      name: "录取日程",
      path: "/pages/schedule/index",
    },
  ];

  // 处理登录按钮点击
  handleLogin = () => {
    logger.info("用户点击登录按钮");
    this.setState({ isLoading: true });

    // 调用微信登录获取code
    Taro.login({
      success: (res) => {
        if (res.code) {
          logger.info("获取微信登录凭证成功", { code: res.code });

          // 调用后端登录接口
          userService
            .wechatLogin({
              code: res.code,
              // 可选参数
              invite_code: null,
              channel_id: "wechat_miniprogram",
            })
            .then((response) => {
              // 处理登录成功
              logger.info("微信登录成功");

              if (response.data && response.data.user) {
                logger.info("用户信息", { userId: response.data.user.id });

                // 保存登录信息到本地存储
                Taro.setStorageSync("token", response.data.token);
                Taro.setStorageSync("refreshToken", response.data.refreshToken);
                Taro.setStorageSync("userInfo", response.data.user);

                // 获取考试信息
                this.fetchExamInfo();

                // 提示登录成功
                Taro.showToast({
                  title: "登录成功",
                  icon: "success",
                  duration: 2000,
                });

                const examInfo = Taro.getStorageSync("examInfo");
                if (!examInfo || !examInfo.score) {
                  logger.info("用户无考试信息，跳转至填写分数页面");
                  this.navigateToExamInfoPage();
                }

                // 更新状态
                this.setState({
                  isLoggedIn: true,
                  userInfo: response.data.user,
                  isLoading: false,
                });
              }
            })
            .catch((error) => {
              // 处理登录失败
              logger.error("微信登录失败", { error });
              this.setState({ isLoading: false });
              Taro.showToast({
                title: error.message || "登录失败，请重试",
                icon: "none",
                duration: 2000,
              });
            });
        } else {
          // 获取微信code失败
          logger.error("获取微信登录凭证失败", { errMsg: res.errMsg });
          this.setState({ isLoading: false });
          Taro.showToast({
            title: "登录失败: " + res.errMsg,
            icon: "none",
            duration: 2000,
          });
        }
      },
      fail: (err) => {
        // 微信登录API调用失败
        logger.error("微信登录API调用失败", { err });
        this.setState({ isLoading: false });
        Taro.showToast({
          title: "登录失败，请检查网络",
          icon: "none",
          duration: 2000,
        });
      },
    });
  };

  // 导航到填写分数页面
  navigateToExamInfoPage = () => {
    logger.info("跳转至填写分数页面");
    Taro.navigateTo({ url: "/pages/exam-info/index" });
  };

  // 导航到功能页面
  handleFeatureClick = (path: string) => {
    logger.info(`用户点击功能项: ${path}`);
    Taro.navigateTo({ url: path });
  };

  // 导航到新闻详情页
  handleNewsClick = (id: number) => {
    logger.info(`用户点击新闻项: ${id}`);
    Taro.navigateTo({
      url: `/pages/exam-info/detail?id=${id}`,
    });
  };

  // 查看更多新闻
  handleMoreNews = () => {
    logger.info("用户点击查看更多新闻");
    Taro.navigateTo({
      url: "/pages/exam-info/index",
    });
  };

  render() {
    const { isLoggedIn, isLoading, hasExamInfo, newsItems } = this.state;

    return (
      <View className="index-page">
        {/* 顶部广告区域 */}
        <View className="top-banner-image">
          <Image
            src="../../assets/img/image.jpeg"
            mode="widthFix"
            className="banner-img"
          />
        </View>

        <View className="banner-section">
          <View className="banner-content">
            <Text className="banner-text">
              完善信息，为您精准测院校录取概率
            </Text>
            <View className="login-card">
           {isLoggedIn && hasExamInfo ? (
                <View className="login-btn success">已登录</View>
              ) : isLoggedIn && !hasExamInfo ? (
                <View
                  className="login-btn warning"
                  onClick={this.navigateToExamInfoPage}
                >
                  填写分数
                </View>
              ) : (
                <View className="login-btn" onClick={this.handleLogin}>
                  点击登录
                </View>
              )}
            </View>
          </View>
        </View>

        {/* 功能网格区域 */}
        <View className="features-grid">
          {this.featureItems.map((item) => (
            <View
              key={item.id}
              className="feature-item"
              onClick={() => this.handleFeatureClick(item.path)}
            >
              <View className="feature-icon-wrapper">
                <Image
                  className="feature-icon"
                  src={item.icon}
                  mode="aspectFit"
                />
                {item.isBeta && <View className="beta-tag">NEW</View>}
              </View>
              <Text className="feature-name">{item.name}</Text>
            </View>
          ))}
        </View>

        {/* 热点资讯区域 */}
        <View className="news-section">
          <View className="section-header">
            <Text className="section-title">热点招生资讯</Text>
            <Text className="more-link" onClick={this.handleMoreNews}>
              更多
            </Text>
          </View>
          <View className="news-list">
            {newsItems.map((news) => (
              <View
                key={news.id}
                className="news-item"
                onClick={() => this.handleNewsClick(news.id)}
              >
                <View className="news-content">
                  <Text className="news-title">{news.title}</Text>
                  <View className="news-meta">
                    <Text className="news-source">{news.source}</Text>
                    <Text className="news-date">{news.date}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
