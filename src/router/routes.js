const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("layouts/MainLayoutHome.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/IndexPage.vue"),
        meta: {
          requireAuth: false,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/auth/AuthLogin.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/auth/AuthRegister.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/sysadmin",
    name: "sysadmin",
    component: () => import("../pages/sysadmin/SysAdmin.vue"),
    meta: {
      requireAuth: true, //debe ser true
    },
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: () => import("../components/generalComponents/maintenance.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/termsofservice",
    name: "termsofservice",
    component: () => import("../components/generalComponents/termsOfService.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: () => import("../components/generalComponents/aboutUs.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/contactus",
    name: "Contactus",
    component: () => import("../components/generalComponents/contactUs.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import("../pages/schedule/Schedule.vue"),
    meta: {
      requireAuth: true, // solo acceso a los usuarios registrados?
    },
  },
  {
    path: "/memberships",
    name: "memberships",
    component: () => import("../components/memberships/memberships.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/membershipsdetail",
    name: "membershipsDetail",
    component: () => import("../components/memberships/membershipsDetail.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/packages/:package",
    name: "Package",
    component: () => import("../components/packages/PackageDetail.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/train",
    name: "train",
    component: () => import("../pages/train/AllExcercises.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/train/:excercise",
    name: "excercise",
    component: () => import("../pages/train/ClassExcercises.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/train/:excercise/:excercises",
    name: "excercises",
    component: () => import("../pages/train/excercise.vue"),
    meta: {
      requireAuth: false,
    },
  },
  
 
  
  {
    path: "/profile/:name",
    name: "profile",
    component: () => import("../components/user/userProfile.vue"),
    meta: {
      requireAuth: true, // debe ser true
    },
  },
  
  {
    path: "/shop",
    name: "shop",
    component: () => import("layouts/MainLayoutShop.vue"),
    children: [
      {
        path: "",
        name: "shop",
        component: () => import("../pages/shop/IndexPageShop.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/shop/packages",
        name: "packages",
        component: () => import("../components/packages/Packages.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/shop/sportwear",
        name: "sportwear",
        component: () => import("../components/shop/product/sportwear.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/shop/nutrition",
        name: "nutrition",
        component: () => import("../components/shop/product/nutrition.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "/shop/equipment",
        name: "equipment",
        component: () => import("../components/shop/product/equipment.vue"),
        meta: {
          requireAuth: false,
        },
      },
      
      // {
      //   path: "product",
      //   name: "Product",
      //   component: () => import("../components/shop/product/Product.vue"),
      //   meta: {
      //     requireAuth: false,
      //   },
      // },
      {
        path: "/cartresume",
        name: "CartResume",
        component: () => import("../pages/shop/CartResume.vue"),
        meta: {
          requireAuth: false,
        },
      },
      // {
      //   path: "/shop/:category",
      //   name: "Category",
      //   component: () => import("../pages/shop/IndexPageShop.vue"),
      //   meta: {
      //     requireAuth: false,
      //   },
      // },
      {
        path: "/shop/:product",
        name: "product",
        component: () => import("../pages/shop/productDetail.vue"),
        meta: {
          requireAuth: false,
        },
      },
    ],
  },
  {
    path: "/quiz/stepone",
    name: "stepone",
    component: () => import("../components/quiz/QuizStepOne.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/steptwo",
    name: "steptwo",
    component: () => import("../components/quiz/QuizStepTwo.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/stepthree",
    name: "stepthree",
    component: () => import("../components/quiz/QuizStepThree.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/stepfour",
    name: "stepfour",
    component: () => import("../components/quiz/QuizStepFour.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/stepfive",
    name: "stepfive",
    component: () => import("../components/quiz/QuizStepFive.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/resume",
    name: "quizresume",
    component: () => import("../components/quiz/QuizResume.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/recommended",
    name: "quizrecommended",
    component: () => import("../components/quiz/QuizRecommended.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/quiz/buyprogram",
    name: "quizbuyprogram",
    component: () => import("../components/quiz/QuizBuyProgram.vue"),
    meta: {
      requireAuth: false,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
