import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './ScoreCurveGraph.scss';

interface ScoreCurveGraphProps {
  score?: number;
  rank?: string | number;
  percentage?: number;
  isFrosted?: boolean;
}

export default class ScoreCurveGraph extends Component<ScoreCurveGraphProps> {
  static defaultProps = {
    score: 677,
    rank: '412-536',
    percentage: 99,
    isFrosted: false
  };

  render() {
    const { score, rank, percentage, isFrosted } = this.props;

    return (
      <View className={`score-curve-container ${isFrosted ? 'frosted' : ''}`}>
        
        {/* 背景曲线 */}
        <View className="curve-background">
          <View className="curve-line"></View>
        </View>

        {/* 分数标签 */}
        <View className="score-markers">
          <View className="marker start">
            <Text className="marker-score">100分</Text>
          </View>
          <View className="marker user-score">
            <Text className="marker-score active">{score}分</Text>
          </View>
          <View className="marker end">
            <Text className="marker-score">750分</Text>
          </View>
        </View>

        {/* 分类标签 */}
        <View className="category-markers">
          <View className="category-marker left">
            <Text className="category-text">专科</Text>
          </View>
          <View className="category-marker right">
            <Text className="category-text">本科批</Text>
          </View>
        </View>

        {/* 成绩卡片 */}
        <View className="score-card">
          <View className="score-value">{score}分</View>
          <View className="score-rank">{rank}名</View>
          <View className="score-percentage">
            超过本省<Text className="percentage-highlight">{percentage}%</Text>的考生
          </View>
        </View>

        {/* 志愿推荐指标 */}
        <View className="recommendation-indicators">
          <View className="indicator">
            <Text className="indicator-label">推荐志愿</Text>
            <View className="indicator-value-container orange">
              <Text className="indicator-value">10</Text>
              <Text className="indicator-description">可冲击&gt;</Text>
            </View>
          </View>
          <View className="indicator">
            <View className="indicator-value-container blue">
              <Text className="indicator-value">6</Text>
              <Text className="indicator-description">较稳妥&gt;</Text>
            </View>
          </View>
          <View className="indicator">
            <View className="indicator-value-container green">
              <Text className="indicator-value">10</Text>
              <Text className="indicator-description">可保底&gt;</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
