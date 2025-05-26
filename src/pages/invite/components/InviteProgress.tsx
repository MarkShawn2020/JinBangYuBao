import React from 'react';
import { View, Text } from '@tarojs/components';
import './InviteProgress.scss';

interface InviteProgressProps {
  current: number;
  max: number;
}

/**
 * 邀请进度条组件
 * 显示当前邀请人数和进度
 */
const InviteProgress: React.FC<InviteProgressProps> = ({ current, max }) => {
  // 计算进度百分比
  const percentage = Math.min((current / max) * 100, 100);
  
  // 生成进度标记点
  const renderMarkers = () => {
    const markers: React.ReactNode[] = [];
    const step = 100 / (max - 1); // 计算每个标记点之间的间距百分比
    
    for (let i = 0; i <= max; i += 2) {
      const isActive = i <= current;
      const position = i === 0 ? 0 : (i === max ? 100 : i * step);
      
      markers.push(
        <View 
          key={i} 
          className={`progress-marker ${isActive ? 'active' : ''}`}
          style={{ left: `${position}%` }}
        >
          <Text className='marker-value'>{i}</Text>
        </View>
      );
    }
    
    return markers;
  };
  
  return (
    <View className='invite-progress'>
      <View className='progress-bar'>
        <View 
          className='progress-fill'
          style={{ width: `${percentage}%` }}
        />
        {renderMarkers()}
      </View>
    </View>
  );
};

export default InviteProgress;
