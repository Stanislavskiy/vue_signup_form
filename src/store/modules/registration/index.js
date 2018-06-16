/* 

ХРАНИЛИЩЕ МОДУЛЯ РЕГИСТРАЦИИ 

*/

import mutations from "./mutations";
import actions from "./actions";

const state = {
  login: null,
  email: null,
  password: null,
  firstName: null,
  lastName: null,
  country: null,
  city: null,
  birthDate: null,
  zipCode: null
};

const getters = {
  login: state => state.login,
  email: state => state.email,
  password: state => state.password,
  firstName: state => state.firstName,
  lastName: state => state.lastName,
  country: state => state.lastName,
  city: state => state.city,
  birthDate: state => state.birthDate,
  zipCode: state => state.zipCode
};

export default {
  state,
  getters,
  actions,
  mutations
};
