<template>
  <div 
    id="FormRegistration"
    class="form-registration"
  >
    <!-- User card -->
    <div class="form-registration__card">
        <h2 class="form-registration__header">
          New user
        </h2>
        <div class="form-registration__content">
          {{firstName || "First name"}} 
          {{lastName || "Last name"}} / 
          <span class="form-registration_color_light">
            {{login || "Login"}}
          </span>
          {{email || "E-mail"}}     
        </div>
    </div>
    
    <!-- Sign up form -->
    <form 
      class="form form-registration__form"
      
    >
      <h2 class="form-registration__header">
        Sign Up
      </h2>
      <label class="form__label">
          Login
          <input 
            type="text" 
            class="form__input"
            v-model="login"
          >
      </label>
      <label class="form__label">
          E-mail
          <input 
            type="email" 
            class="form__input"
            v-model="email"
          >
      </label>
      <label class="form__label">
          Password
          <input 
            type="password" 
            class="form__input"
            v-model="password"
          >
      </label>
      <label class="form__label">
        First name
        <input 
          type="text" 
          class="form__input"
          v-model="firstName"
        >
      </label>
      <label class="form__label">
        Last name
        <input 
          type="text" 
          class="form__input"
          v-model="lastName"
        >
      </label>
      <label for="countrySelect" class="form__label">
        Country
      </label>

      <!-- Select -->
      <v-select 
        id="countrySelect"
        placeholder="Select"
        v-model="country"             
        :options="country_list"
        label="name"
        :clearSearchOnSelect="false"
        @input="updateCityList"
      />

      <label for="citySelect" class="form__label">
        City
      </label>

      <!-- Select -->
      <v-select
        id="citySelect"
        placeholder="Select"
        v-model="city"
        :options="city_list"
        :disabled="!country"
        :clearSearchOnSelect="false"
      />

      <label class="form__label">
        Birth date
        <!-- Datepicker -->
        <datepicker 
          v-model="birthDate"
          format="dd MMM yyyy"
        />
      </label>

      <label class="form__label">
        Zip code
        <input 
          type="text" 
          class="form__input"
          v-model="zipCode"
        >
      </label>
      <div v-if="errors.length" class="form__errors">
        <div v-for="error in errors" :key="error">
          {{error}}
        </div>  
      </div>
      <div v-if="success" class="form__success">
        <div class="form__success-title">Success!</div>
        <div class="form__success-content">
          All changes saved.
        </div>
      </div>
      <button class="form__button" @click.prevent="getCountries()" type="submit">
        Sign up
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { getCountries, getCities } from "../../api";
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";

export default {
  data() {
    return {
      /* 
        Список стран (country_list) и городов 
        (city_list) для отображения в select
      */
      country_list: [],
      city_list: [],
      /* Массив для хранения ошибок формы */
      errors: [],
      /* 
        Индикатор успешного выполнения всех 
        операций 
      */
      success: false
    };
  },

  components: {
    vSelect,
    Datepicker
  },

  computed: {
    /* 
      Двунаправленные вычисляемые свойства.
      Служат для связывания данных формы (v-model) 
      с данными во Vuex
    */

    login: {
      get() {
        return this.$store.getters.login;
      },
      set(value) {
        return this.updateLogin(value);
      }
    },

    email: {
      get() {
        return this.$store.getters.email;
      },
      set(value) {
        return this.updateEmail(value);
      }
    },

    password: {
      get() {
        return this.$store.getters.password;
      },
      set(value) {
        return this.updatePassword(value);
      }
    },

    firstName: {
      get() {
        return this.$store.getters.firstName;
      },
      set(value) {
        return this.updateFirstName(value);
      }
    },

    lastName: {
      get() {
        return this.$store.getters.lastName;
      },
      set(value) {
        return this.updateLastName(value);
      }
    },

    country: {
      get() {
        return this.$store.getters.country;
      },
      set(value) {
        return this.updateCountry(value);
      }
    },

    city: {
      get() {
        return this.$store.getters.city;
      },
      set(value) {
        return this.updateCity(value);
      }
    },

    birthDate: {
      get() {
        return this.$store.getters.birthDate;
      },
      set(value) {
        return this.updateBirthDate(value);
      }
    },

    zipCode: {
      get() {
        return this.$store.getters.zipCode;
      },
      set(value) {
        return this.updateZipCode(value);
      }
    }
  },

  watch: {
    country: function() {
      /* 
        Следим за изменением значения страны.
        Очищаем значение города если значение 
        страны неизвестно
      */
      if (!this.country) {
        this.updateCity(null);
      }
    }
  },

  methods: {
    ...mapActions(["clearRegistrationData", "confirmRegistrationData"]),
    ...mapMutations([
      "updateLogin",
      "updatePassword",
      "updateEmail",
      "updateFirstName",
      "updateLastName",
      "updateCountry",
      "updateCity",
      "updateBirthDate",
      "updateZipCode"
    ]),

    submitForm() {
      /* 
        Вызывается в момент подтверждения формы.
      */
      this.errors = [];

      // Проверяем поля помеченные *
      if (this.login && this.email && this.password) {
        // Вызываем обработчик данных формы
        this.confirmRegistrationData()
          .then(() => {
            // Очищаем поля
            this.clearRegistrationData();
            // Выводим сообщение об успешной регистрации
            this.displaySuccess();
          })
          .catch(e => {
            // выводим ошибку
            this.errors.push(e);
          });
      } else {
        // Выводим ошибку
        this.errors.push(`
          Fields marked with * should not be empty
          `);
      }
    },

    updateCityList() {
      /*
        Загружает список городов выбранной страны в 
        city_list. вызывается в момент выбора страны
      */
      if (this.country) {
        // Загружаем список городов по коду текущей страны
        getCities(this.country.alpha2Code).then(cities => {
          this.city_list = cities.map(city => {
            // Формируем массив из имён полученных городов
            return city.name;
          });
        });
      } else {
        this.city_list = [];
      }
    },

    displaySuccess() {
      /* 
        Делаем значение success=true на несколько 
        секунд для отображения сообщения об успешной 
        регистрации
      */
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }
  },

  mounted() {
    // Загружаем список всех стран в country_list
    getCountries().then(result => {
      this.country_list = result;
    });
  }
};
</script>
