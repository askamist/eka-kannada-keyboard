import { createMemoryHistory, createRouter } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import DocumentationPage from "./pages/DocumentationPage.vue";
import DownloadsPage from "./pages/DownloadsPage.vue";

const routes = [
  { name: "Home", path: "/", component: HomePage },
  {
    name: "Documentation",
    path: "/documentation",
    component: DocumentationPage,
  },
  { name: "Downloads", path: "/downloads", component: DownloadsPage },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
