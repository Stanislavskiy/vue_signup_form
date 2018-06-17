const actions = {
  clearRegistrationData({ commit }) {
    /* 
      Для очистки формы после отправки 
      данных на сервер
    */
    commit("updateLogin", null);
    commit("updatePassword", null);
    commit("updateEmail", null);
    commit("updateFirstName", null);
    commit("updateLastName", null);
    commit("updateCountry", null);
    commit("updateCity", null);
    commit("updateBirthDate", null);
    commit("updateZipCode", null);
  },

  confirmRegistrationData({ commit }) {
    /* 
      Симулирует обработку данных регистрации
      (отправка на сервер и т.д). Возвращает 
      промис c задержкой
    */
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  }
};

export default actions;
