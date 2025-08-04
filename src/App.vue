<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="app-container">
    <div class="page-content">
      <router-view />
    </div>
    <div class="tabbar-container">
      <van-tabbar route class="bottom-tabbar">
        <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item to="/points" icon="chart-trending-o"
          >积分</van-tabbar-item
        >
        <van-tabbar-item to="/ranking" icon="award">排行</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  /* 移除padding-bottom，让各页面自己控制底部间距 */
}

.tabbar-container {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.bottom-tabbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 100%;
  z-index: 1000;
  background: white;
  border-top: 1px solid #f0f0f0;
  height: 50px; /* 明确指定高度 */
}

/* 覆盖Vant Tabbar的默认固定定位样式 */
.bottom-tabbar.van-tabbar--fixed {
  position: fixed !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 100% !important;
  max-width: 100% !important;
}

/* 自定义Tabbar样式 */
.bottom-tabbar :deep(.van-tabbar-item) {
  color: #999;
  font-size: 12px;
}

.bottom-tabbar :deep(.van-tabbar-item--active) {
  color: #2196f3;
}

.bottom-tabbar :deep(.van-tabbar-item__icon) {
  font-size: 20px;
  margin-bottom: 2px;
}

.bottom-tabbar :deep(.van-tabbar-item__text) {
  font-size: 12px;
  line-height: 1;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .bottom-tabbar {
    height: 60px; /* 移动端Tabbar可能更高 */
  }

  .bottom-tabbar.van-tabbar--fixed {
    height: 60px !important;
  }
}

/* 确保Tabbar在安全区域内 */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .bottom-tabbar {
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(50px + env(safe-area-inset-bottom));
  }

  .bottom-tabbar.van-tabbar--fixed {
    padding-bottom: env(safe-area-inset-bottom) !important;
    height: calc(50px + env(safe-area-inset-bottom)) !important;
  }

  @media (max-width: 768px) {
    .bottom-tabbar {
      height: calc(60px + env(safe-area-inset-bottom));
    }

    .bottom-tabbar.van-tabbar--fixed {
      height: calc(60px + env(safe-area-inset-bottom)) !important;
    }
  }
}

/* 防止页面内容被Tabbar遮挡 */
.page-content {
  padding-bottom: 50px;
}

@media (max-width: 768px) {
  .page-content {
    padding-bottom: 60px;
  }
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .page-content {
    padding-bottom: calc(50px + env(safe-area-inset-bottom));
  }

  @media (max-width: 768px) {
    .page-content {
      padding-bottom: calc(60px + env(safe-area-inset-bottom));
    }
  }
}
</style>
