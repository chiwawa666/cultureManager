<template>
  <div class="points-page">
    <!-- 顶部导航 -->
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span class="title">积分明细</span>
      <van-icon name="info-o" @click="goToRules" />
    </div>

    <!-- 积分统计卡片 -->
    <div class="points-summary">
      <div class="summary-item">
        <div class="points-number">1240</div>
        <div class="points-label">总积分</div>
      </div>
      <div class="summary-item">
        <div class="points-number gained">+130</div>
        <div class="points-label">本月获得</div>
      </div>
      <div class="summary-item">
        <div class="points-number consumed">-80</div>
        <div class="points-label">本月消耗</div>
      </div>
    </div>

    <!-- 筛选标签 -->
    <div class="filter-tabs">
      <div class="tabs-container">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.name }}
        </div>
      </div>
      <van-icon
        name="arrow-down"
        class="filter-icon"
        @click="showFilterDialog = true"
      />
    </div>

    <!-- 日期筛选弹框 -->
    <van-popup v-model:show="showFilterDialog" position="bottom" round>
      <div class="filter-dialog">
        <div class="dialog-header">
          <span class="dialog-title">筛选积分明细</span>
          <van-icon name="cross" @click="showFilterDialog = false" />
        </div>

        <div class="dialog-content">
          <!-- 日期范围选择 -->
          <div class="date-range-section">
            <div class="section-title">日期范围</div>
            <div class="date-inputs">
              <van-field
                :model-value="startDateDisplay"
                placeholder="yyyy/mm/日"
                readonly
                @click="showStartDatePicker = true"
              >
                <template #right-icon>
                  <van-icon name="calendar-o" />
                </template>
              </van-field>
              <span class="date-separator">至</span>
              <van-field
                :model-value="endDateDisplay"
                placeholder="yyyy/mm/日"
                readonly
                @click="showEndDatePicker = true"
              >
                <template #right-icon>
                  <van-icon name="calendar-o" />
                </template>
              </van-field>
            </div>
          </div>

          <!-- 快速选择 -->
          <div class="quick-select-section">
            <div class="section-title">快速选择</div>
            <div class="quick-select-buttons">
              <van-button
                v-for="option in quickOptions"
                :key="option.key"
                :class="[
                  'quick-btn',
                  { active: selectedQuickOption === option.key },
                ]"
                @click="selectQuickOption(option.key)"
              >
                {{ option.name }}
              </van-button>
            </div>
          </div>
        </div>

        <div class="dialog-actions">
          <van-button class="reset-btn" @click="resetFilter">重置</van-button>
          <van-button type="primary" class="apply-btn" @click="applyFilter"
            >应用</van-button
          >
        </div>
      </div>
    </van-popup>

    <!-- 开始日期选择器 -->
    <van-popup v-model:show="showStartDatePicker" position="bottom">
      <van-date-picker
        v-model="startDateValue"
        title="选择开始日期"
        @confirm="onStartDateConfirm"
        @cancel="showStartDatePicker = false"
      />
    </van-popup>

    <!-- 结束日期选择器 -->
    <van-popup v-model:show="showEndDatePicker" position="bottom">
      <van-date-picker
        v-model="endDateValue"
        title="选择结束日期"
        @confirm="onEndDateConfirm"
        @cancel="showEndDatePicker = false"
      />
    </van-popup>

    <!-- 积分记录列表 -->
    <div class="points-list">
      <div v-for="group in pointsGroups" :key="group.month" class="month-group">
        <div class="month-title">{{ group.month }}</div>
        <div class="records">
          <div
            v-for="record in group.records"
            :key="record.id"
            class="record-item"
          >
            <div class="record-icon">
              <van-icon :name="record.icon" :color="record.iconColor" />
            </div>
            <div class="record-content">
              <div class="record-title">{{ record.title }}</div>
              <div class="record-time">{{ record.time }}</div>
            </div>
            <div class="record-points" :class="record.pointsClass">
              {{ record.points }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/");
};

const goToRules = () => {
  router.push("/points-rules");
};

const activeTab = ref("all");

// 筛选弹框相关数据
const showFilterDialog = ref(false);
const showStartDatePicker = ref(false);
const showEndDatePicker = ref(false);
const startDate = ref("");
const endDate = ref("");
const startDateValue = ref([
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  new Date().getDate(),
]);
const endDateValue = ref([
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  new Date().getDate(),
]);
const selectedQuickOption = ref("");

// 初始化当前日期
const now = new Date();
const currentDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(
  2,
  "0"
)}/${String(now.getDate()).padStart(2, "0")}`;
startDate.value = currentDate;
endDate.value = currentDate;

// 计算属性确保响应式更新
const startDateDisplay = computed(() => {
  console.log("startDateDisplay computed:", startDate.value);
  return startDate.value || "";
});
const endDateDisplay = computed(() => {
  console.log("endDateDisplay computed:", endDate.value);
  return endDate.value || "";
});

const tabs = [
  { key: "all", name: "全部" },
  { key: "acquired", name: "获取记录" },
  { key: "consumed", name: "消费记录" },
  { key: "expired", name: "过期记录" },
];

const quickOptions = [
  { key: "thisMonth", name: "本月" },
  { key: "last30Days", name: "最近30天" },
  { key: "last3Months", name: "最近3个月" },
  { key: "last6Months", name: "最近6个月" },
];

// 筛选相关方法
const selectQuickOption = (key) => {
  selectedQuickOption.value = key;
  // 根据快速选择设置日期范围
  const now = new Date();
  switch (key) {
    case "thisMonth":
      startDate.value = `${now.getFullYear()}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/01`;
      endDate.value = `${now.getFullYear()}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
      break;
    case "last30Days":
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      startDate.value = `${thirtyDaysAgo.getFullYear()}/${String(
        thirtyDaysAgo.getMonth() + 1
      ).padStart(2, "0")}/${String(thirtyDaysAgo.getDate()).padStart(2, "0")}`;
      endDate.value = `${now.getFullYear()}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
      break;
    case "last3Months":
      const threeMonthsAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 3,
        now.getDate()
      );
      startDate.value = `${threeMonthsAgo.getFullYear()}/${String(
        threeMonthsAgo.getMonth() + 1
      ).padStart(2, "0")}/${String(threeMonthsAgo.getDate()).padStart(2, "0")}`;
      endDate.value = `${now.getFullYear()}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
      break;
    case "last6Months":
      const sixMonthsAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 6,
        now.getDate()
      );
      startDate.value = `${sixMonthsAgo.getFullYear()}/${String(
        sixMonthsAgo.getMonth() + 1
      ).padStart(2, "0")}/${String(sixMonthsAgo.getDate()).padStart(2, "0")}`;
      endDate.value = `${now.getFullYear()}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
      break;
  }
  console.log(
    "快速选择:",
    key,
    "开始日期:",
    startDate.value,
    "结束日期:",
    endDate.value
  );
};

const onStartDateConfirm = async (value) => {
  console.log("开始日期选择:", value);
  if (
    value &&
    value.selectedValues &&
    Array.isArray(value.selectedValues) &&
    value.selectedValues.length === 3
  ) {
    const newDate = `${value.selectedValues[0]}/${String(
      value.selectedValues[1]
    ).padStart(2, "0")}/${String(value.selectedValues[2]).padStart(2, "0")}`;
    console.log("设置开始日期:", newDate);
    startDate.value = newDate;
    // 强制触发响应式更新
    await nextTick();
    console.log("开始日期更新后:", startDate.value);
  }
  showStartDatePicker.value = false;
};

const onEndDateConfirm = async (value) => {
  console.log("结束日期选择:", value);
  if (
    value &&
    value.selectedValues &&
    Array.isArray(value.selectedValues) &&
    value.selectedValues.length === 3
  ) {
    const newDate = `${value.selectedValues[0]}/${String(
      value.selectedValues[1]
    ).padStart(2, "0")}/${String(value.selectedValues[2]).padStart(2, "0")}`;
    console.log("设置结束日期:", newDate);
    endDate.value = newDate;
    // 强制触发响应式更新
    await nextTick();
    console.log("结束日期更新后:", endDate.value);
  }
  showEndDatePicker.value = false;
};

const resetFilter = () => {
  startDate.value = "";
  endDate.value = "";
  selectedQuickOption.value = "";
};

const applyFilter = () => {
  // 应用筛选条件
  console.log("应用筛选:", {
    startDate: startDate.value,
    endDate: endDate.value,
    quickOption: selectedQuickOption.value,
    startDateDisplay: startDateDisplay.value,
    endDateDisplay: endDateDisplay.value,
  });
  showFilterDialog.value = false;
  // 这里可以调用API获取筛选后的数据
};

const pointsGroups = ref([
  {
    month: "2026年1月",
    records: [
      {
        id: 1,
        title: "完成优秀短视频",
        time: "2025-11-15 14:30",
        points: "+10",
        pointsClass: "gained",
        icon: "video-o",
        iconColor: "#2196F3",
      },
      {
        id: 2,
        title: "兑换咖啡券",
        time: "2025-11-10 09:45",
        points: "-80",
        pointsClass: "consumed",
        icon: "gift-o",
        iconColor: "#FF9800",
      },
      {
        id: 3,
        title: '获得"元气满满"勋章',
        time: "2025-11-08 15:20",
        points: "+2",
        pointsClass: "gained",
        icon: "medal-o",
        iconColor: "#2196F3",
      },
    ],
  },
  {
    month: "2025年12月",
    records: [
      {
        id: 4,
        title: "积分到期",
        time: "2025-12-31 00:00",
        points: "-200",
        pointsClass: "expired",
        icon: "clock-o",
        iconColor: "#F44336",
      },
      {
        id: 5,
        title: "完成优秀投稿,且阅读量超过1000",
        time: "2025-12-25 16:30",
        points: "+20",
        pointsClass: "gained",
        icon: "like-o",
        iconColor: "#2196F3",
      },
    ],
  },
]);
</script>

<style scoped>
.points-page {
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

.points-summary {
  display: flex;
  background: white;
  margin: 12px 16px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-item {
  flex: 1;
  text-align: center;
}

.points-number {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.points-number.gained {
  color: #4caf50;
}

.points-number.consumed {
  color: #f44336;
}

.points-label {
  font-size: 12px;
  color: #999;
}

.filter-tabs {
  display: flex;
  align-items: center;
  background: white;
  margin: 0 16px 12px;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tabs-container {
  display: flex;
  flex: 1;
  gap: 24px;
}

.tab-item {
  font-size: 14px;
  color: #999;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
}

.tab-item.active {
  color: #2196f3;
  font-weight: 600;
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

.filter-icon {
  color: #999;
  font-size: 16px;
}

.points-list {
  padding: 0 16px;
}

.month-group {
  margin-bottom: 20px;
}

.month-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding: 0 4px;
  text-align: left;
}

.records {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.record-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f5f5f5;
}

.record-item:last-child {
  border-bottom: none;
}

.record-icon {
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.record-content {
  flex: 1;
}

.record-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.4;
  text-align: left;
}

.record-time {
  font-size: 12px;
  color: #999;
  text-align: left;
}

.record-points {
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
}

.record-points.gained {
  color: #4caf50;
}

.record-points.consumed {
  color: #f44336;
}

.record-points.expired {
  color: #f44336;
}

/* 筛选弹框样式 */
.filter-dialog {
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.dialog-content {
  margin-bottom: 20px;
}

.date-range-section,
.quick-select-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-separator {
  color: #999;
  font-size: 14px;
}

.quick-select-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.quick-btn {
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.quick-btn.active {
  color: #2196f3;
  background: #e3f2fd;
  border-color: #2196f3;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.reset-btn {
  flex: 1;
  height: 44px;
  border-radius: 8px;
  color: #666;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.apply-btn {
  flex: 1;
  height: 44px;
  border-radius: 8px;
  background: #2196f3;
  border: none;
}

.notification-content {
  flex: 1;
  text-align: left;
}

.notification-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  flex: 1;
  text-align: left;
}

.notification-time {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  white-space: nowrap;
  min-width: 60px;
  text-align: right;
}
</style> 