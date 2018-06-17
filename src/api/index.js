import axios from "axios";

export function getCities(countryCode) {
  /* 
    API для получения списка городов по коду страны
  */
  if (countryCode) {
    const CITIES_URL = `http://api.geonames.org/searchJSON?username=example.name&country=${countryCode}&style=SHORT`;

    return axios
      .get(CITIES_URL)
      .then(response => {
        // Возвращаем данные
        return response.data.geonames;
      })
      .catch(error => {
        console.log(`GET_CITIES: FAILED-->${error}`);
      });
  } else {
    return error;
  }
}

export function getCountries() {
  /* 
    API для получения списка стран
  */
  const COUNTRIES_URL =
    "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code";

  return axios
    .get(COUNTRIES_URL)
    .then(response => {
      // Возвращаем данные
      return response.data;
    })
    .catch(error => {
      console.log(`GET_CITIES: FAILED-->${error}`);
    });
}
