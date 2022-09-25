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
