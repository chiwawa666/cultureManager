<template>
  <div class="points-rules-page">
    <!-- 顶部导航 -->
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span class="title">积分规则</span>
      <div class="placeholder"></div>
    </div>

    <!-- 积分获取途径 标题和说明 -->
    <div class="section-header-outer">
      <van-icon name="info-o" color="#2196F3" size="20" />
      <span class="section-title">积分获取途径</span>
    </div>
    <div class="section-description-outer">
      公司文化官积分可通过多种方式获取，完成不同任务获得不同积分值。积分实时累计，系统每月更新排名。
    </div>
    <!-- 卡片：积分获取途径规则 -->
    <div class="rules-section">
      <div class="rules-list">
        <div
          v-for="(item, idx) in getRules('acquire')"
          :key="item.title"
          class="rule-item-wrapper"
        >
          <div class="rule-item">
            <span class="circle-check"><van-icon name="success" /></span>
            <div class="rule-content">
              <div class="rule-title">{{ item.title }}</div>
              <div class="rule-description">{{ item.desc }}</div>
            </div>
          </div>
          <div
            v-if="idx < getRules('acquire').length - 1"
            class="rule-divider"
          ></div>
        </div>
      </div>
    </div>

    <!-- 积分失效规则 -->
    <div class="section-header-outer">
      <van-icon name="info-o" color="#2196F3" size="20" />
      <span class="section-title">积分失效规则</span>
    </div>
    <div class="section-description-outer">
      公司文化官积分以自然年为时限，每年扣除一定个人积分用于保级。
    </div>
    <div class="rules-section">
      <div class="rules-list">
        <div
          v-for="(item, idx) in getRules('expire')"
          :key="item.title"
          class="rule-item-wrapper"
        >
          <div class="rule-item">
            <span class="circle-check"><van-icon name="success" /></span>
            <div class="rule-content">
              <div class="rule-title">{{ item.title }}</div>
              <div class="rule-description">{{ item.desc }}</div>
            </div>
          </div>
          <div
            v-if="idx < getRules('expire').length - 1"
            class="rule-divider"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/points");
};

const acquireRules = [
  {
    title: "完成优秀投稿",
    desc: "完成优秀投稿可获得10-100积分不等，根据阅读量评定",
  },
  {
    title: "完成优秀短视频",
    desc: "完成优秀短视频可获得10-100积分不等，根据播放量评定",
  },
  {
    title: "百果之家活跃度",
    desc: "通过在百果之家轻享、发帖、论坛互动、K吧运营等行为获得的活跃度",
  },
  { title: "荣誉勋章", desc: "通过在百果之家获得勋章可获得2-34积分" },
];
const expireRules = [
  { title: "一星~三星文化官", desc: "不扣除积分" },
  { title: "四星文化官", desc: "每年扣除200积分" },
  { title: "五星文化官", desc: "每年扣除300积分" },
  { title: "六星文化官", desc: "每年扣除400积分" },
];
const getRules = (type) => (type === "acquire" ? acquireRules : expireRules);
</script>

<style scoped>
.points-rules-page {
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

.section-header-outer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 16px 8px 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.section-description-outer {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0 16px 12px 44px;
  text-align: left;
}

.rules-section {
  background: white;
  margin: 0 16px 16px 16px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rule-item-wrapper {
  display: flex;
  flex-direction: column;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.rule-content {
  flex: 1;
}

.rule-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  text-align: left;
}

.rule-description {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  text-align: left;
}

.circle-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2196f3;
  margin-top: 2px;
  flex-shrink: 0;
}

.circle-check .van-icon {
  color: #fff;
  font-size: 14px;
}

.rule-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 12px 0 0 0;
}
</style> 