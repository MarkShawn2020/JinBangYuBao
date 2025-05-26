import React from 'react';
import { View, Text } from '@tarojs/components';
import './CountdownTimer.scss';

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
}

/**
 * 倒计时组件
 * 显示活动剩余时间
 */
const CountdownTimer: React.FC<CountdownTimerProps> = ({ days, hours, minutes }) => {
  return (
    <View className='countdown-timer'>
      <View className='timer-unit'>
        <Text className='timer-value'>{days}</Text>
      </View>
      <Text className='timer-separator'>:</Text>
      <View className='timer-unit'>
        <Text className='timer-value'>{hours < 10 ? `0${hours}` : hours}</Text>
      </View>
      <Text className='timer-separator'>:</Text>
      <View className='timer-unit'>
        <Text className='timer-value'>{minutes < 10 ? `0${minutes}` : minutes}</Text>
      </View>
    </View>
  );
};

export default CountdownTimer;
