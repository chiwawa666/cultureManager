<template>
  <div class="home-page">
    <!-- 积分卡片 -->
    <div class="points-card">
      <div class="card-header">
        <span class="title">我的积分</span>
        <div class="level-info">
          <van-icon name="star" color="#FFD700" />
          <span>四星文化官</span>
        </div>
      </div>

      <div class="points-display">
        <div class="total-points">1240分</div>
        <div class="next-level">距离下一等级还需760分</div>
      </div>

      <div class="progress-section">
        <div class="progress-info">
          <span>距离五星文化官等级进度</span>
          <span class="progress-percent">62%</span>
        </div>
        <van-progress
          :percentage="62"
          :show-pivot="false"
          color="linear-gradient(to right, #4CAF50, #2196F3)"
          stroke-width="8"
        />
      </div>

      <div class="expiration-warning">
        <div><van-icon name="warning-o" color="#FF9800" />400积分即将过期</div>
        <div class="expiration-date">过期日期: 2025-12-31</div>
      </div>
    </div>

    <!-- 导航图标 -->
    <div class="nav-icons">
      <div class="nav-item" @click="goToDetails">
        <van-icon name="orders-o" size="24" color="#2196F3" />
        <span>积分明细</span>
      </div>
      <div class="nav-item" @click="goToRanking">
        <van-icon name="award" size="24" color="#FF9800" />
        <span>排行榜</span>
      </div>
      <div class="nav-item" @click="goToRules">
        <van-icon name="description" size="24" color="#4CAF50" />
        <span>积分规则</span>
      </div>
      <div class="nav-item" @click="goToLevels">
        <van-icon name="medal-o" size="24" color="#9C27B0" />
        <span>等级体系</span>
      </div>
    </div>

    <!-- 通知提醒 -->
    <div class="notifications">
      <div class="notifications-header">
        <van-icon name="bell" color="#2196F3" />
        <span>通知提醒</span>
      </div>

      <div class="notification-list">
        <div class="notification-item">
          <van-icon name="plus" color="#2196F3" />
          <div class="notification-content">
            <div class="notification-text">积分增加+10</div>
            <div class="notification-time">今天 14:30</div>
          </div>
        </div>

        <div class="notification-item">
          <van-icon name="warning-o" color="#F44336" />
          <div class="notification-content">
            <div class="notification-text">积分即将过期提醒</div>
            <div class="notification-time">昨天 09:15</div>
          </div>
        </div>

        <div class="notification-item">
          <van-icon name="arrow-up" color="#4CAF50" />
          <div class="notification-content">
            <div class="notification-text">恭喜成为四星文化官</div>
            <div class="notification-time">11-15 10:25</div>
          </div>
        </div>

        <!-- 添加更多通知项用于测试滚动 -->
        <div class="notification-item">
          <van-icon name="plus" color="#2196F3" />
          <div class="notification-content">
            <div class="notification-text">积分增加+5</div>
            <div class="notification-time">11-14 16:20</div>
          </div>
        </div>

        <div class="notification-item">
          <van-icon name="medal-o" color="#9C27B0" />
          <div class="notification-content">
            <div class="notification-text">获得新勋章</div>
            <div class="notification-time">11-13 09:30</div>
          </div>
        </div>

        <div class="notification-item">
          <van-icon name="star" color="#FFD700" />
          <div class="notification-content">
            <div class="notification-text">等级提升提醒</div>
            <div class="notification-time">11-12 14:15</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToDetails = () => {
  // 跳转到积分明细页面
  router.push("/points");
};

const goToRanking = () => {
  // 跳转到排行榜页面
  router.push("/ranking");
};

const goToRules = () => {
  // 跳转到积分规则页面
  router.push("/points-rules");
};

const goToLevels = () => {
  router.push("/level-system");
};
</script>

<style scoped>
.home-page {
  padding: 16px;
  padding-bottom: 80px; /* 为Tabbar预留更多空间 */
  background: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.points-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.level-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.points-display {
  /* text-align: center; */
  margin-bottom: 20px;
}

.total-points {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.next-level {
  font-size: 14px;
  opacity: 0.9;
}

.progress-section {
  margin-bottom: 20px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.progress-percent {
  font-weight: bold;
}

.expiration-warning {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  text-align: left;
  gap: 8px;
  font-size: 14px;
}

.expiration-date {
  margin-left: auto;
  font-size: 12px;
  opacity: 0.8;
}

.nav-icons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-item:hover {
  transform: translateY(-2px);
}

.nav-item span {
  font-size: 12px;
  color: #333;
}

.notifications {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-height: 280px;
  overflow: hidden;
}

.notifications-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
  font-size: 16px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding-bottom: 8px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 4px;
}

.notification-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  min-height: 56px;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px; /* 增加左边距，让内容更居中 */
}

.notification-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  flex: 1;
  text-align: left; /* 确保文本左对齐 */
}

.notification-time {
  font-size: 12px;
  color: #999;
  margin-left: 12px; /* 增加与文本的间距 */
  white-space: nowrap;
  min-width: 60px; /* 确保时间有固定宽度 */
  text-align: right; /* 时间右对齐 */
}

/* 自定义滚动条样式 */
.notification-list::-webkit-scrollbar {
  width: 3px;
}

.notification-list::-webkit-scrollbar-track {
  background: transparent;
}

.notification-list::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 2px;
}

.notification-list::-webkit-scrollbar-thumb:hover {
  background: #c0c0c0;
}

/* 移动端适配 */
@media (max-width: 375px) {
  .home-page {
    padding: 12px;
    padding-bottom: 90px;
  }

  .nav-icons {
    gap: 8px;
  }

  .nav-item {
    padding: 12px 4px;
  }

  .nav-item span {
    font-size: 11px;
  }
}

/* 确保在iPhone等设备上的安全区域 */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .home-page {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
  }
}
</style> 