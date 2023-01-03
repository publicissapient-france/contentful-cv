import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CvView from "@/views/CvView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cv",
      name: "cv",
      component: CvView,
    },
    {
      path: "/mini-cv",
      name: "mini-cv",
      component: () => import("../views/MiniCvView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/login-pending",
      name: "loginPending",
      component: () => import("../views/LoginPendingView.vue"),
    },
  ],
});

export default router;
