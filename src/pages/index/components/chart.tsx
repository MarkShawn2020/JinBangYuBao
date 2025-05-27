import React, { useEffect, useState } from 'react';
import { Canvas, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
// 不直接导入 VChart 组件，而是使用默认导出的方式
// 因为默认导出的组件具有更宽松的类型检查
import VChart from '@visactor/taro-vchart';
import theme from '../../../assets/theme/light.json';
import { logger } from '../../../utils/logger';

export function Pie() {
  const [chartReady, setChartReady] = useState(false);
  const canvasId = 'line-chart-canvas';
    const spec = {
        type: 'line',
        theme,
        data: {
          values: [
            {
              time: '2:00',
              value: 38
            },
            {
              time: '4:00',
              value: 56
            },
            {
              time: '6:00',
              value: 10
            },
            {
              time: '8:00',
              value: 70
            },
            {
              time: '10:00',
              value: 36
            },
            {
              time: '12:00',
              value: 94
            },
            {
              time: '14:00',
              value: 24
            },
            {
              time: '16:00',
              value: 44
            },
            {
              time: '18:00',
              value: 36
            },
            {
              time: '20:00',
              value: 68
            },
            {
              time: '22:00',
              value: 22
            }
          ]
        },
        xField: 'time',
        yField: 'value',
        line: {
          style: {
            curveType: 'monotone'
          }
        }
      };

  // 使用 useEffect 确保在组件挂载后初始化图表
  useEffect(() => {
    // 确保在小程序环境中运行
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      logger.info('初始化图表', { canvasId });
      // 延迟一下以确保 Canvas 组件已渲染
      setTimeout(() => {
        setChartReady(true);
      }, 100);
    }
  }, []);

  return (
    <View
      style={{
        border: '1px solid #eeeeee',
        width: '90vw',
        position: 'relative'
      }}
    >
      <Canvas
        type="2d"
        id={canvasId}
        canvasId={canvasId}
        style={{
          width: '100%',
          height: '35vh'
        }}
      />
      
      {chartReady && (
        <VChart
          type="weapp"
          // @ts-ignore
          spec={spec}
          canvasId={canvasId}
          style={{ height: '35vh', width: '100%' }}
          onChartInit={() => {
            logger.info('图表初始化完成');
          }}
          onChartReady={() => {
            logger.info('图表准备完成');
          }}
          onChartUpdate={() => {
            logger.info('图表更新');
          }}
        />
      )}
    </View>
  );
}