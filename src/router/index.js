import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Points from "../views/Points.vue";
import Ranking from "../views/Ranking.vue";
import PointsRules from "../views/PointsRules.vue";
import LevelSystem from "../views/LevelSystem.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/points", component: Points },
  { path: "/ranking", component: Ranking },
  { path: "/points-rules", component: PointsRules },
  { path: "/level-system", component: LevelSystem },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
