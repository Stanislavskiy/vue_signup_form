/* 
  Мутации модуля регистрации 
*/

const mutations = {
  updateLogin(state, login) {
    state.login = login;
  },

  updatePassword(state, password) {
    state.password = password;
  },

  updateEmail(state, email) {
    state.email = email;
  },

  updateFirstName(state, firstName) {
    state.firstName = firstName;
  },

  updateLastName(state, lastName) {
    state.lastName = lastName;
  },

  updateCountry(state, country) {
    state.country = country;
  },

  updateCity(state, city) {
    state.city = city;
  },

  updateBirthDate(state, birthDate) {
    state.birthDate = birthDate;
  },

  updateZipCode(state, zipCode) {
    state.zipCode = zipCode;
  }
};

export default mutations;
