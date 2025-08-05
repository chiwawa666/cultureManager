import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "./assets/fonts.css"; // 导入字体配置
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";

createApp(App).use(router).use(Vant).mount("#app");
