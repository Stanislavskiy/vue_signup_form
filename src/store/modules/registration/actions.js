const actions = {
  clearRegistrationData({ commit }) {
    /* 
      Для очистки данных регистрации 
      после их обработки
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
      Симулирует обработку данных регистрации. 
      Возвращает промис c задержкой
    */
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  }
};

export default actions;
