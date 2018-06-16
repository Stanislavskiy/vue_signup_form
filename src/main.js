import Vue from "vue";
import store from "./store";
import router from "./router";
import Notifications from "vue-notification";
import App from "./App";

Vue.use(Notifications);

new Vue({
  el: "#app",
  components: { App },
  store,
  router,
  template: "<App />"
});
