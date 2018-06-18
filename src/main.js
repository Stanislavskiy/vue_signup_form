import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./App";
import "normalize.css";

new Vue({
  el: "#app",
  components: { App },
  store,
  router,
  template: "<App />"
});
