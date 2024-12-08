import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import "./style.scss";
import EkaTheme from "./theme";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: EkaTheme,
    options: {
      prefix: "eka",
    },
  },
});

app.mount("#app");
