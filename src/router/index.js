import Vue from "vue";
import VueRouter from "vue-router";
import FormRegistration from "../components/FormRegistration";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      // Перенаправляем на форму регистрации
      redirect: { name: "registration" }
    },
    {
      path: "/registration",
      name: "registration",
      component: FormRegistration
    }
  ]
});
