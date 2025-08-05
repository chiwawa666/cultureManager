<template>
  <div class="font-demo">
    <h1 class="title">字体演示</h1>

    <!-- PingFang 字体演示 -->
    <section class="section">
      <h2 class="section-title">PingFang 字体</h2>
      <div class="font-pingfang demo-text">
        <p>这是 PingFang HK 字体的演示文本</p>
        <p>PingFang SC 简体中文显示效果</p>
        <p>PingFang TC 繁體中文顯示效果</p>
        <p class="small-text">
          PingFang 是苹果公司设计的中文字体，具有优秀的可读性和美观性
        </p>
      </div>
    </section>

    <!-- 不同字体粗细演示 -->
    <section class="section">
      <h2 class="section-title">字体粗细</h2>
      <div class="font-weights">
        <p class="font-thin">Thin (100) - 极细字体</p>
        <p class="font-light">Light (300) - 细体字体</p>
        <p class="font-normal">Normal (400) - 常规字体</p>
        <p class="font-medium">Medium (500) - 中等字体</p>
        <p class="font-semibold">Semibold (600) - 半粗体</p>
        <p class="font-bold">Bold (700) - 粗体</p>
        <p class="font-black">Black (900) - 特粗体</p>
      </div>
    </section>

    <!-- 字体大小演示 -->
    <section class="section">
      <h2 class="section-title">字体大小</h2>
      <div class="font-sizes">
        <p class="text-xs">Extra Small (12px) - 极小字体</p>
        <p class="text-sm">Small (14px) - 小字体</p>
        <p class="text-base">Base (16px) - 基础字体</p>
        <p class="text-lg">Large (18px) - 大字体</p>
        <p class="text-xl">Extra Large (20px) - 特大字体</p>
        <p class="text-2xl">2XL (24px) - 二级标题</p>
        <p class="text-3xl">3XL (30px) - 一级标题</p>
        <p class="text-4xl">4XL (36px) - 超大标题</p>
      </div>
    </section>

    <!-- 英文字体演示 -->
    <section class="section">
      <h2 class="section-title">英文字体 (Inter)</h2>
      <div class="font-en demo-text">
        <p>This is Inter font demonstration</p>
        <p>Inter is a variable font family designed for computer screens</p>
        <p>
          It features a tall x-height to aid in readability of mixed-case and
          lower-case text
        </p>
        <p class="small-text">
          Inter is designed and maintained by Rasmus Andersson
        </p>
      </div>
    </section>

    <!-- 数字字体演示 -->
    <section class="section">
      <h2 class="section-title">数字字体 (Monospace)</h2>
      <div class="font-number demo-text">
        <p>1234567890 - 数字显示</p>
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ - 大写字母</p>
        <p>abcdefghijklmnopqrstuvwxyz - 小写字母</p>
        <p>!@#$%^&*()_+-=[]{}|;':",./&lt;&gt;? - 特殊字符</p>
        <p class="small-text">等宽字体适合显示代码、数字表格等</p>
      </div>
    </section>

    <!-- 混合字体演示 -->
    <section class="section">
      <h2 class="section-title">混合字体使用</h2>
      <div class="mixed-fonts">
        <div class="demo-card">
          <h3 class="card-title">标题使用 PingFang</h3>
          <p class="font-cn">正文内容使用中文字体，确保中文显示效果最佳</p>
          <p class="font-en">
            English text uses Inter font for better readability
          </p>
          <p class="font-number">代码: const number = 123456;</p>
        </div>

        <div class="demo-card blue-card">
          <h3 class="card-title">响应式字体</h3>
          <p class="responsive-text">这个文本会根据屏幕大小自动调整字体大小</p>
        </div>
      </div>
    </section>

    <!-- 字体工具类演示 -->
    <section class="section">
      <h2 class="section-title">字体工具类</h2>
      <div class="tool-demo">
        <div class="demo-card">
          <h4 class="card-subtitle">文本对齐</h4>
          <p class="text-left">左对齐文本</p>
          <p class="text-center">居中对齐文本</p>
          <p class="text-right">右对齐文本</p>
        </div>

        <div class="demo-card">
          <h4 class="card-subtitle">文本装饰</h4>
          <p class="underline">下划线文本</p>
          <p class="line-through">删除线文本</p>
          <p class="uppercase">大写文本</p>
          <p class="capitalize">首字母大写文本</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.font-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-text {
  font-size: 1.125rem;
  line-height: 1.75;
}

.demo-text p {
  margin-bottom: 0.5rem;
}

.small-text {
  font-size: 0.875rem;
  color: #6b7280;
}

.font-weights p {
  margin-bottom: 0.5rem;
}

.font-sizes p {
  margin-bottom: 0.5rem;
}

.mixed-fonts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.demo-card {
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

.blue-card {
  background-color: #eff6ff;
}

.card-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.responsive-text {
  font-size: 1rem;
}

.tool-demo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .tool-demo {
    grid-template-columns: 1fr 1fr;
  }

  .responsive-text {
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .responsive-text {
    font-size: 1.25rem;
  }
}

/* 字体工具类样式 */
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.underline {
  text-decoration: underline;
}
.line-through {
  text-decoration: line-through;
}
.uppercase {
  text-transform: uppercase;
}
.capitalize {
  text-transform: capitalize;
}
</style> 