import Vue from "vue";
import Vuex from "vuex";
import registration from "./modules/registration";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    registration
  }
});

export default store;
