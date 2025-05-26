import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import './RewardItem.scss';

interface RewardItemProps {
  title: string;
  reward: string;
  completed?: boolean;
  highlighted?: boolean;
}

/**
 * 奖励项组件
 * 展示单个邀请奖励项
 */
const RewardItem: React.FC<RewardItemProps> = ({ 
  title, 
  reward, 
  completed = false,
  highlighted = false 
}) => {
  return (
    <View className={`reward-item ${highlighted ? 'highlighted' : ''} ${completed ? 'completed' : ''}`}>
      <View className='reward-content'>
        <Text className='reward-title'>{title}</Text>
        <Text className='reward-value'>{reward}</Text>
      </View>
      {completed && (
        <View className='reward-status'>
          <Image 
            className='status-icon' 
            src='../../../assets/img/check-circle.svg' 
          />
        </View>
      )}
    </View>
  );
};

export default RewardItem;
