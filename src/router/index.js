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
    {
      path: "/week3",
      name: "week3",
      component: () => import("../views/Week3View.vue"),
    },
    {
      path: "/Week3_showPreductView",
      name: "Week3_showPreductView",
      component: () => import("../views/Week3_showPreductView.vue"),
    },
    {
      path: "/Week3_addPreductView",
      name: "Week3_addPreductView",
      component: () => import("../views/Week3_addPreductView.vue"),
    },
    {
      path: "/week4",
      name: "week4",
      component: () => import("../views/Week4View.vue"),
    },
    {
      path: "/Week4_showPreductView",
      name: "Week4_showPreductView",
      component: () => import("../views/Week4_showPreductView.vue"),
    },
    {
      path: "/week5",
      name: "week5",
      component: () => import("../views/Week5View.vue"),
    },
    {
      path: "/week6",
      name: "week6",
      component: () => import("../views/Week6View.vue"),
    },
  ],
});

export default router;
