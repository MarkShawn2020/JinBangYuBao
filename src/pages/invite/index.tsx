import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { userService, logger } from '../../services';

// 引入组件（避免使用相对导入方式）
const CountdownTimer = require('./components/CountdownTimer').default;
const RewardItem = require('./components/RewardItem').default;
const InviteProgress = require('./components/InviteProgress').default;
import './index.scss';

const InvitePage: React.FC = () => {
  // 状态管理
  const [inviteCode, setInviteCode] = useState<string>('');
  const [invitedCount, setInvitedCount] = useState<number>(0);
  const [totalReward, setTotalReward] = useState<number>(0);
  const [inviteRecord, setInviteRecord] = useState<{count: number, amount: number}[]>([
    { count: 7, amount: 1250 },
    { count: 5, amount: 900 },
    { count: 3, amount: 600 }
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  // 奖励列表数据
  const rewardList = [
    { 
      id: 1, 
      title: '成功邀请 3 位新用户', 
      reward: '得 100 积分', 
      completed: false 
    },
    { 
      id: 2, 
      title: '成功邀请 5 位新用户', 
      reward: '得 200 积分', 
      completed: false 
    },
    { 
      id: 3, 
      title: '成功邀请 7 位及以上新用户', 
      reward: '得 300 积分', 
      completed: false 
    },
    { 
      id: 4, 
      title: '邀请 10 位新用户', 
      reward: '额外得平台积分*200 积分', 
      completed: false,
      highlighted: true
    },
    { 
      id: 5, 
      title: '成功邀请 2 位好友下单', 
      reward: '返现平台积分*50 积分', 
      completed: false,
      highlighted: true 
    },
    { 
      id: 6, 
      title: '成功邀请 3 位好友下单', 
      reward: '额外得平台积分*1000 积分', 
      completed: false,
      highlighted: true 
    }
  ];

  // 页面加载时获取邀请信息
  useEffect(() => {
    logger.info('邀请页面加载');
    fetchInviteInfo();
    
    // 注册分享能力
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage', 'shareTimeline']
    });
    
    return () => {
      logger.info('邀请页面卸载');
    };
  }, []);
  
  // 配置页面分享信息
  useShareAppMessage(() => {
    // 从存储中获取用户ID
    const userInfo = Taro.getStorageSync('userInfo');
    const userId = userInfo ? userInfo.id : '';
    
    logger.info('用户进行了页面分享', { userId });
    
    // 构造分享路径
    const path = `/pages/invite/index?user_id=${userId}&channel_id=default`;
    
    return {
      title: '高考志愿填报神器，点击领取你的必备利器！',
      path: path,
      imageUrl: '../../assets/img/share/invite_share_image.png'
    };
  });

  // 获取邀请信息
  const fetchInviteInfo = async () => {
    setLoading(true);
    try {
      logger.info('获取邀请信息');
      
      // 调用更完整的邀请信息 API
      const res = await userService.getInviteInfo();
      
      if (res.code === 0 && res.data) {
        const { inviteCode, statistics, invitedUsers, rewards } = res.data;
        
        // 设置邀请码
        setInviteCode(inviteCode || '');
        
        // 设置邀请统计信息
        if (statistics) {
          setInvitedCount(statistics.totalInvited || 0);
          setTotalReward(statistics.totalRewards || 0);
          
          // 更新奖励状态
          updateRewardStatus(statistics.totalInvited || 0);
        }
        
        // 设置邀请记录
        if (rewards && rewards.length > 0) {
          // 这里可以处理奖励信息，但当前示例仅展示静态数据
        }
        
        logger.info('邀请信息获取成功', { 
          invitedCount: statistics?.totalInvited || 0,
          totalReward: statistics?.totalRewards || 0 
        });
      } else {
        Taro.showToast({
          title: '获取邀请信息失败',
          icon: 'none'
        });
      }
    } catch (error) {
      logger.error('获取邀请信息失败', error);
      Taro.showToast({
        title: '网络异常，请重试',
        icon: 'none'
      });
    } finally {
      setLoading(false);
    }
  };

  // 更新奖励状态
  const updateRewardStatus = (count: number) => {
    const updatedList = rewardList.map(item => {
      // 安全地提取数字
      const matches = item.title.match(/\d+/);
      let threshold = matches ? parseInt(matches[0]) : 0;
      return {
        ...item,
        completed: count >= threshold
      };
    });
    // 这里只是示例，实际组件中不会直接修改rewardList
  };

  // 复制邀请码
  const copyInviteCode = () => {
    if (inviteCode && inviteCode.trim() !== '') {
      Taro.setClipboardData({
        data: inviteCode,
        success: () => {
          Taro.showToast({
            title: '邀请码已复制',
            icon: 'success'
          });
          logger.info('用户复制了邀请码', { inviteCode });
        }
      });
    }
  };

  // 分享给好友
  const shareToFriend = () => {
    // 在实际小程序中，会调用Taro.showShareMenu或在onShareAppMessage中处理
    logger.info('用户点击了立即邀请按钮');
    Taro.showToast({
      title: '请点击右上角分享',
      icon: 'none'
    });
  };
  
  // 分享到微信好友
  const shareToWechatFriend = () => {
    logger.info('用户尝试分享到微信好友');
    // 在小程序环境中，通过Taro API调用系统分享
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      Taro.showShareMenu({
        withShareTicket: true,
        showShareItems: ['shareAppMessage']
      });
      Taro.showToast({
        title: '请点击右上角的分享按钮',
        icon: 'none',
        duration: 2000
      });
    } else {
      // 在H5环境中，提示用户复制链接
      Taro.showModal({
        title: '分享提示',
        content: '当前环境不支持直接分享到微信，请复制链接后手动分享',
        confirmText: '复制链接',
        success: (res) => {
          if (res.confirm) {
            copyInviteLink();
          }
        }
      });
    }
  };
  
  // 分享到朋友圈
  const shareToTimeline = () => {
    logger.info('用户尝试分享到朋友圈');
    // 在小程序环境中，通过Taro API调用系统分享
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      Taro.showShareMenu({
        withShareTicket: true,
        showShareItems: ['shareTimeline']
      });
      Taro.showToast({
        title: '请点击右上角的分享按钮',
        icon: 'none',
        duration: 2000
      });
    } else {
      // 在H5环境中，提示用户复制链接
      Taro.showModal({
        title: '分享提示',
        content: '当前环境不支持直接分享到朋友圈，请复制链接后手动分享',
        confirmText: '复制链接',
        success: (res) => {
          if (res.confirm) {
            copyInviteLink();
          }
        }
      });
    }
  };
  
  // 分享到QQ
  const shareToQQ = () => {
    logger.info('用户尝试分享到QQ');
    // QQ小程序或H5环境
    Taro.showModal({
      title: '分享提示',
      content: '当前环境不支持直接分享到QQ，请复制链接后手动分享',
      confirmText: '复制链接',
      success: (res) => {
        if (res.confirm) {
          copyInviteLink();
        }
      }
    });
  };
  
  // 复制邀请链接
  const copyInviteLink = () => {
    logger.info('用户复制邀请链接');
    // 构建邀请链接 - 实际链接需要根据应用环境确定
    const inviteLink = `https://jinbangyubao.com/invite?code=${inviteCode}`;
    
    Taro.setClipboardData({
      data: inviteLink,
      success: () => {
        Taro.showToast({
          title: '邀请链接已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
  };
  
  // 显示二维码
  const showQrCode = () => {
    logger.info('用户请求查看邀请二维码');
    
    // 假设二维码图片已生成并保存在服务器上
    // 实际实现可能需要调用后端API生成二维码或使用前端库
    Taro.showModal({
      title: '邀请二维码',
      content: '您可以保存该二维码，分享给好友扫码加入',
      confirmText: '查看二维码',
      success: (res) => {
        if (res.confirm) {
          // 实际应用中，这里可能会打开一个包含二维码的页面
          // 或者直接使用Taro.previewImage预览二维码图片
          Taro.showToast({
            title: '二维码功能开发中',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  };

  // 查看活动规则
  const viewRules = () => {
    Taro.showModal({
      title: '活动规则',
      content: '1. 每成功邀请1位新用户注册并使用，可获得相应奖励\n2. 邀请奖励可累计，达到不同等级获得不同奖励\n3. 活动期间邀请的用户才计入统计\n4. 最终解释权归平台所有',
      showCancel: false
    });
  };

  return (
    <View className='invite-page'>
      {/* 顶部标题 */}
      <View className='invite-header'>
        <Text className='header-title'>邀请好友</Text>
      </View>

      {/* 活动横幅 */}
      <View className='invite-banner'>
        <View className='banner-content'>
          <Text className='year-label'>2025 高考加油</Text>
          <Text className='banner-title'>喊朋友填志愿，你就可以赚</Text>
          <Text className='reward-amount'>最高 1250 元红包</Text>
          
          {/* 倒计时 */}
          <View className='countdown-container'>
            <Text className='countdown-label'>本轮活动剩余时间</Text>
            <CountdownTimer days={23} hours={59} minutes={10} />
          </View>
        </View>
      </View>

      {/* 邀请进度 */}
      <View className='invite-progress-container'>
        <Text className='progress-title'>已邀请 {invitedCount} 人</Text>
        <InviteProgress current={invitedCount} max={10} />
      </View>

      {/* 邀请奖励列表 */}
      <View className='reward-section'>
        <Text className='section-title'>邀请奖励</Text>
        <View className='reward-list'>
          {rewardList.map(item => (
            <RewardItem 
              key={item.id}
              title={item.title}
              reward={item.reward}
              completed={item.completed}
              highlighted={item.highlighted}
            />
          ))}
        </View>
        <View className='rule-link' onClick={viewRules}>
          <Text className='rule-text'>查看活动规则</Text>
        </View>
      </View>

      {/* 邀请记录 */}
      <View className='invite-record-section'>
        <Text className='section-title'>邀请记录</Text>
        <View className='record-list'>
          {inviteRecord.map((record, index) => (
            <View key={index} className='record-item'>
              <Text className='record-count'>{record.count}</Text>
              <Text className='record-amount'>{record.amount}</Text>
              <Text className='record-label'>{index === 0 ? '元最高红包' : index === 1 ? '元现金红包' : '元积分红包'}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 底部按钮 */}
      <View className='bottom-actions'>
        <Button className='copy-code-btn' onClick={copyInviteCode}>
          复制邀请码
        </Button>
        <Button className='share-btn' onClick={shareToFriend}>
          立即邀请
        </Button>
        {/* <Text className='alternate-share'>暂不分享邀请</Text> */}

        <Text className='share-methods-title'>更多分享方式</Text>
        
        <View className='share-methods-grid'>
          {/* 微信好友 */}
          <View className='share-method-item' onClick={shareToWechatFriend}>
            <View className='share-icon-wrapper wechat-color'>
              <Image 
                className='share-icon' 
                src='../../assets/img/share/wechat_friend.png' 
                mode='aspectFit'
              />
            </View>
            <Text className='share-method-name'>微信好友</Text>
          </View>
          
          {/* 朋友圈 */}
          <View className='share-method-item' onClick={shareToTimeline}>
            <View className='share-icon-wrapper timeline-color'>
              <Image 
                className='share-icon' 
                src='../../assets/img/share/wechat_moments.png' 
                mode='aspectFit'
              />
            </View>
            <Text className='share-method-name'>朋友圈</Text>
          </View>
          
          {/* QQ */}
          <View className='share-method-item' onClick={shareToQQ}>
            <View className='share-icon-wrapper qq-color'>
              <Image 
                className='share-icon' 
                src='../../assets/img/share/qq.png' 
                mode='aspectFit'
              />
            </View>
            <Text className='share-method-name'>QQ好友</Text>
          </View>
          
          {/* 复制链接 */}
          <View className='share-method-item' onClick={copyInviteLink}>
            <View className='share-icon-wrapper link-color'>
              <Image 
                className='share-icon' 
                src='../../assets/img/share/copy_link.png' 
                mode='aspectFit'
              />
            </View>
            <Text className='share-method-name'>复制链接</Text>
          </View>
          
          {/* 二维码 */}
          <View className='share-method-item' onClick={showQrCode}>
            <View className='share-icon-wrapper qrcode-color'>
              <Image 
                className='share-icon' 
                src='../../assets/img/share/qrcode.png' 
                mode='aspectFit'
              />
            </View>
            <Text className='share-method-name'>二维码</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

export default InvitePage;
