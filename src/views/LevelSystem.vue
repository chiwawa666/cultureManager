<template>
  <div class="level-system-page">
    <!-- 顶部导航 -->
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span class="title">等级体系</span>
      <div class="placeholder"></div>
    </div>

    <!-- 我的等级卡片 -->
    <div class="my-level-card">
      <div class="my-level-header">
        <span class="my-level-title">我的等级</span>
        <span class="my-level-status">
          <span class="my-level-current">四星文化官</span>
          <span class="my-level-divider">/</span>
          <span class="my-level-next">五星</span>
        </span>
      </div>
      <div class="my-level-progress">
        <span class="current-points">当前：1240积分</span>
        <span class="upgrade-need">升级还需：760积分</span>
      </div>
      <van-progress
        :percentage="62"
        color="#2196F3"
        stroke-width="8"
        :show-pivot="false"
      />
    </div>

    <!-- 等级体系说明 -->
    <div class="system-desc-header">
      <van-icon name="medal-o" color="#2196F3" size="20" />
      <span class="system-desc-title">文化官等级体系</span>
    </div>
    <div class="system-desc-text">
      文化官共分为6个等级，从一星到六星，每个等级对应不同权益，积分越高等级越高。
    </div>

    <!-- 等级晋升说明 -->
    <div class="system-desc-header">
      <van-icon name="info-o" color="#2196F3" size="20" />
      <span class="system-desc-title">等级晋升说明</span>
    </div>
    <div class="system-desc-text">
      积分达到对应等级要求后，系统将自动提升您的文化官等级。等级提升后权益立即生效，降级规则将在每年1月1日统一执行。
    </div>

    <!-- 各等级卡片 -->
    <div class="level-card" v-for="level in levels" :key="level.name">
      <div class="level-card-title">
        {{ level.name }}<span class="level-score">{{ level.score }}</span>
      </div>
      <ul class="level-benefits">
        <li v-for="benefit in level.benefits" :key="benefit">
          <van-icon name="success" color="#4caf50" style="font-size: 16px" />
          <span>{{ benefit }}</span>
        </li>
      </ul>
    </div>

    <!-- 底部积分规则按钮 -->
    <div class="bottom-button-container">
      <div class="bottom-button" @click="goToPointsRules">
        <van-icon name="arrow-left" color="#2196F3" />
        <span>积分规则</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/");
};

const goToPointsRules = () => {
  router.push("/points-rules");
};

const levels = [
  {
    name: "一星文化官",
    score: "100-300积分",
    benefits: ["基础学习资源访问权", "参与公司文化活动演讲权"],
  },
  {
    name: "二星文化官",
    score: "300-600积分",
    benefits: ["专属小组权益", "每月活动抽奖加一份", "优先报名重要线下培训"],
  },
  {
    name: "三星文化官",
    score: "600-900积分",
    benefits: ["更多专属荣誉", "参与公司决策建议权"],
  },
  {
    name: "四星文化官",
    score: "900-1500积分",
    benefits: ["专属荣誉勋章", "公司内刊专访机会"],
  },
  {
    name: "五星文化官",
    score: "1500-3000积分",
    benefits: ["每年额外1天带薪休假", "优先晋升考核资格", "公司年会特别表彰"],
  },
  {
    name: "六星文化官",
    score: "3000积分及以上",
    benefits: [
      "包含Lv.5全部权益",
      "每年额外2天带薪休假",
      "优先获得培训及出差机会",
      "公司文化建设参与权",
      "年度特别奖金",
    ],
  },
];
</script>

<style scoped>
.level-system-page {
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

.header .title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.header .placeholder {
  width: 20px;
}

.my-level-card {
  background: white;
  margin: 16px 16px 12px 16px;
  border-radius: 12px;
  padding: 20px 20px 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.my-level-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.my-level-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.my-level-status {
  display: flex;
  align-items: center;
  gap: 4px;
}

.my-level-current {
  color: #2196f3;
  font-weight: 600;
  font-size: 15px;
}

.my-level-divider {
  color: #bbb;
  margin: 0 2px;
}

.my-level-next {
  color: #bbb;
  font-size: 14px;
}

.my-level-progress {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
}

.current-points {
  color: #333;
}

.upgrade-need {
  color: #2196f3;
}

.system-desc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 16px 8px 16px;
}

.system-desc-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.system-desc-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0 16px 12px 44px;
  text-align: left;
}

.level-card {
  background: white;
  margin: 0 16px 16px 16px;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.level-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-score {
  font-size: 13px;
  color: #2196f3;
  margin-left: 8px;
}

.level-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
}

.level-benefits li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #333;
  margin-bottom: 8px;
}

.level-benefits li:last-child {
  margin-bottom: 0;
}

.bottom-button-container {
  padding: 20px 16px;
  display: flex;
  justify-content: center;
}

.bottom-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.bottom-button:hover {
  background: #e0e0e0;
}

.bottom-button span {
  font-size: 14px;
  color: #333;
}
</style>