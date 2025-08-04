<template>
  <div class="ranking-page">
    <!-- 顶部导航 -->
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span class="title">积分排行榜</span>
      <div class="placeholder"></div>
    </div>

    <!-- 前三名展示 -->
    <div class="top-three">
      <div class="rank-item second-place">
        <div class="rank-number">2</div>
        <div class="avatar">
          <div class="avatar-placeholder">
            <span>头像缺失</span>
          </div>
        </div>
        <div class="user-info">
          <div class="name">张小姐</div>
          <div class="points">3,540分</div>
        </div>
      </div>

      <div class="rank-item first-place">
        <div class="crown">
          <van-icon name="award" color="#FFD700" size="24" />
        </div>
        <div class="rank-number">1</div>
        <div class="avatar">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
            alt="王先生"
          />
        </div>
        <div class="user-info">
          <div class="name">王先生</div>
          <div class="points">3,760分</div>
        </div>
      </div>

      <div class="rank-item third-place">
        <div class="rank-number">3</div>
        <div class="avatar">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
            alt="李先生"
          />
        </div>
        <div class="user-info">
          <div class="name">李先生</div>
          <div class="points">3,020分</div>
        </div>
      </div>
    </div>

    <!-- 排行榜标签和列表 -->
    <div class="ranking-container">
      <div class="ranking-tabs">
        <div class="tab-item active">
          <span>我的周围伙伴</span>
        </div>
      </div>

      <div class="ranking-list">
        <div
          v-for="user in rankingUsers"
          :key="user.id"
          class="ranking-item"
          :class="{ 'current-user': user.isCurrent }"
        >
          <div class="rank-number" :class="{ 'current-rank': user.isCurrent }">
            {{ user.rank }}
          </div>
          <div class="user-avatar">
            <img
              v-if="user.avatar && !user.avatarError"
              :src="user.avatar"
              :alt="user.name"
              :data-user-id="user.id"
              @error="handleImageError"
              @load="handleImageLoad"
            />
            <div v-else class="avatar-placeholder-small">
              <span>头像缺失</span>
            </div>
          </div>
          <div class="user-details">
            <div class="user-name">
              {{ user.name }}
              <span v-if="user.isCurrent" class="current-label">当前</span>
            </div>
            <div class="user-location">{{ user.location }}</div>
          </div>
          <div class="user-points">{{ user.points }}分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/");
};

const rankingUsers = ref([
  {
    id: 18,
    rank: 18,
    name: "赵女士",
    location: "湖南区、四星文化官",
    points: "1,630",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    isCurrent: false,
    avatarError: false,
  },
  {
    id: 19,
    rank: 19,
    name: "钱先生",
    location: "杭州区,四星文化官",
    points: "1,580",
    avatar: null, // 头像缺失
    isCurrent: false,
    avatarError: false,
  },
  {
    id: 20,
    rank: 20,
    name: "我",
    location: "深圳区,四星文化官",
    points: "1,240",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    isCurrent: true,
    avatarError: false,
  },
  {
    id: 21,
    rank: 21,
    name: "孙先生",
    location: "天津区,四星文化官",
    points: "1,050",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    isCurrent: false,
    avatarError: false,
  },
  {
    id: 22,
    rank: 22,
    name: "周女士",
    location: "深圳区,四星文化官",
    points: "1,010",
    avatar: "https://invalid-url-that-will-fail.com/avatar.jpg", // 模拟404图片
    isCurrent: false,
    avatarError: false,
  },
]);

// 图片加载错误处理
const handleImageError = (event) => {
  const userId = event.target.dataset.userId;
  const user = rankingUsers.value.find((u) => u.id == userId);
  if (user) {
    user.avatarError = true;
  }
};

// 图片加载成功处理
const handleImageLoad = (event) => {
  const userId = event.target.dataset.userId;
  const user = rankingUsers.value.find((u) => u.id == userId);
  if (user) {
    user.avatarError = false;
  }
};
</script>

<style scoped>
.ranking-page {
  background: #f5f5f5;
  min-height: 100vh;
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

.top-three {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: white;
  margin: 12px 16px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  gap: 20px;
}

.rank-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.first-place {
  order: 2;
}

.second-place {
  order: 1;
}

.third-place {
  order: 3;
}

.crown {
  position: absolute;
  top: -10px;
  z-index: 10;
}

.rank-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #999;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
}

.first-place .rank-number {
  background: #ffd700;
  color: #333;
}

.second-place .rank-number {
  background: #c0c0c0;
}

.third-place .rank-number {
  background: #cd7f32;
}

.avatar {
  margin-bottom: 8px;
}

.avatar img {
  border-radius: 50%;
  border: 3px solid transparent;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
  border: 3px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 10px;
  text-align: center;
  line-height: 1.2;
}

.first-place .avatar img {
  border-color: #2196f3;
  width: 80px;
  height: 80px;
}

.first-place .avatar-placeholder {
  width: 80px;
  height: 80px;
  font-size: 12px;
}

.second-place .avatar img,
.third-place .avatar img {
  width: 60px;
  height: 60px;
}

.user-info {
  text-align: center;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.points {
  font-size: 12px;
  color: #666;
}

.ranking-container {
  background: white;
  margin: 0 16px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.ranking-tabs {
  padding: 16px 16px 0;
}

.tab-item {
  font-size: 16px;
  font-weight: 600;
  color: #999;
  position: relative;
  padding-bottom: 4px;
}

.tab-item.active {
  color: #2196f3;
  width: 120px;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #2196f3;
  border-radius: 1px;
}

.ranking-list {
  padding: 0 16px 16px;
}

.ranking-item {
  display: flex;
  align-items: center;
  background: white;
  margin-bottom: 8px;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ranking-item.current-user {
  background: #e3f2fd;
  border: 1px solid #2196f3;
}

.rank-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #999;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.rank-number.current-rank {
  background: #2196f3;
}

.user-avatar {
  margin-right: 12px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.avatar-placeholder-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 8px;
  text-align: center;
  line-height: 1.2;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-label {
  font-size: 12px;
  color: #2196f3;
  background: rgba(33, 150, 243, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.user-location {
  font-size: 12px;
  color: #999;
  text-align: left;
}

.user-points {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
</style> 