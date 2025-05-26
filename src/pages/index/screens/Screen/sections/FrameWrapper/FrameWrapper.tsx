import React from "react";
import "./style.css";
import Taro from '@tarojs/taro';
import { userService, logger } from '../../../../../../services';

export const FrameWrapper = (): JSX.Element => {
  return (
    <div className="frame-wrapper">
      <div className="view">
        <div className="text-wrapper-8">完善信息，为您精准预测院校录取概率</div>
      </div>

      <div className="overlap">
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
                <div className="text-wrapper-18">677分</div>

                <div className="text-wrapper-19">412-536名</div>

                <p className="p">
                  <span className="span">超过本省</span>

                  <span className="text-wrapper-20">99%</span>

                  <span className="span">的考生</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-wrapper-21">100分</div>

        <div className="text-wrapper-22">750分</div>

        <div className="text-wrapper-23">677分</div>

        <div className="rectangle-2" />

        <div className="rectangle-3" />

        <div className="text-wrapper-24" onClick={() => {
            // 记录开始登录日志
            logger.info('开始微信登录流程');
            
            // 调用微信登录获取code
            Taro.login({
              success(res) {
                if (res.code) {
                  logger.info('获取微信登录凭证成功', { code: res.code });
                  
                  // 调用我们的后端登录接口
                  userService.wechatLogin({
                    code: res.code,
                    // 可选参数
                    invite_code: '',
                    channel_id: 'wechat_miniprogram'
                  }).then(response => {
                    // 处理登录成功
                    logger.info('微信登录成功', { userId: response.data.user.id });
                    
                    // 保存登录信息到本地存储
                    Taro.setStorageSync('token', response.data.token);
                    Taro.setStorageSync('refreshToken', response.data.refreshToken);
                    Taro.setStorageSync('userInfo', response.data.user);
                    
                    // 提示登录成功
                    Taro.showToast({ 
                      title: '登录成功', 
                      icon: 'success',
                      duration: 2000
                    });
                    
                  }).catch(error => {
                    // 处理登录失败
                    logger.error('微信登录失败', { error });
                    Taro.showToast({
                      title: error.message || '登录失败，请重试',
                      icon: 'none',
                      duration: 2000
                    });
                  });
                } else {
                  // 获取微信code失败
                  logger.error('获取微信登录凭证失败', { errMsg: res.errMsg });
                  Taro.showToast({ 
                    title: '登录失败: ' + res.errMsg, 
                    icon: 'none',
                    duration: 2000
                  });
                }
              },
              fail(err) {
                // 微信登录API调用失败
                logger.error('微信登录API调用失败', { err });
                Taro.showToast({ 
                  title: '登录失败，请检查网络', 
                  icon: 'none',
                  duration: 2000
                });
              }
            })
        }}>点击登录</div>
      </div>
    </div>
  );
};
