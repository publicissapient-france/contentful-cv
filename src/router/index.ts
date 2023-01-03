import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CvView from "@/views/CvView.vue";
import MiniCvView from "@/views/MiniCvView.vue";
import LoginView from "@/views/LoginView.vue";
import LoginPendingView from "@/views/LoginPendingView.vue";

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
      component: MiniCvView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/login-pending",
      name: "loginPending",
      component: LoginPendingView,
    },
  ],
});

export default router;
