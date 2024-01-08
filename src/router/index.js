import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/week1",
      name: "week1",
      component: () => import("../views/Week1View.vue"),
    },
    {
      path: "/week2",
      name: "week2",
      component: () => import("../views/Week2View.vue"),
    },
    {
      path: "/Week2_showPreductView",
      name: "Week2_showPreductView",
      component: () => import("../views/Week2_showPreductView.vue"),
    },
  ],
});

export default router;
