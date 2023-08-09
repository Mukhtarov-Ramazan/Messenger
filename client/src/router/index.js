import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage/index.vue";
import SignIn from "@/views/SignIn/index.vue";
import SignUp from "@/views/SignUp/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomePage,
      meta: {
        auth: true,
      },
    },
    {
      path: "/",
      name: "sign-in",
      component: SignIn,
      meta: {
        auth: false,
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        auth: false,
      },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const userInfo = JSON.parse(localStorage.getItem("userTokens"));
//   if (to.meta.auth && !userInfo?.token) {
//     next("/");
//   } else if (!to.meta.auth && userInfo?.token) {
//     next("/home");
//   } else {
//     next();
//   }
// });

export default router;
