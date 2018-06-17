import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./App";

new Vue({
  el: "#app",
  components: { App },
  store,
  router,
  template: "<App />"
});
