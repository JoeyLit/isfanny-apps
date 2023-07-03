const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        name: "Home",
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "meme-details",
        path: "/memes/:memeId",
        component: () => import("pages/MemeDetails"),
        props: true,
      },
      {
        name: "Search",
        path: "/search",
        component: () => import("pages/MemesSearch"),
      },
      {
        path: "/search-memes/:memeId",
        name: "meme-details-alt",
        component: () => import("pages/MemeDetailsAlt"),
        props: true,
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/LoginPage"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/RegisterPage"),
      },
      {
        path: "/addpost",
        name: "AddPost",
        component: () => import("pages/AddPostPage"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("pages/AboutPage"),
      },
    ],
  },

  {
    path: "/",

    component: () => import("layouts/SecondaryLayout.vue"),

    children: [
      {
        path: "/videos",
        name: "Videos",
        component: () => import("pages/VideosPage"),
      },
      {
        path: "/photos",
        name: "Photos",
        component: () => import("pages/PhotosPage"),
      },
      {
        path: "/gifs",
        name: "Gifs",
        component: () => import("pages/GifsPage"),
      },
      {
        path: "/texts",
        name: "Texts",
        component: () => import("pages/TextsPage"),
      },
    ],
  },

  // {
  //   path: "/videos",
  //   name: "Videos",
  //   component: () => import("pages/VideosPage"),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
