<template>
  <div 
    id="FormRegistration"
    class="form flex flex_column flex_align_center"
  >
    <!-- User card -->
    <div class="form__body form__body_border-radius_2">
        <h2 class="form__header font font_l">
          New user
        </h2>
        <div class="form__content">
          <div class="form__group font font_sb">
            {{firstName || "First name"}} 
            {{lastName || "Last name"}} / 
            <span class="form__group form__group_color_light">
              {{login || "Login"}}
            </span>
          </div>
          <div class="form__group form__group_margin_top font font_sb">
            {{email || "E-mail"}}     
          </div>
        </div>
    </div>
    
    <!-- Sign up form -->
    <form 
      class="form__body form__body_margin_top form__body_border-radius_4"
      @submit.prevent="submitForm()"
    >
      <h2 class="form__header font font_l">
        Sign Up
      </h2>
      <div class="form__group flex flex_wrap flex_justify_between">
        <label class="form__label form__label_width_wide font font_b">
            Login 
            <span class="form__group form__group_color_accent ">
              *
            </span>
            <input 
              type="text" 
              class="form__input form__input_padding font font_sb"
              v-model="login"
            >
        </label>
        <label class="form__label form__label_width_wide font font_b">
            E-mail 
            <span class="form__group form__group_color_accent">
              *
            </span>
            <input 
              type="email" 
              class="form__input form__input_padding font font_sb"
              v-model="email"
            >
        </label>
        <label class="form__label form__label_width_wide font font_b">
            Password 
            <span class="form__group form__group_color_accent">
              *
            </span>
            <input 
              type="password" 
              class="form__input form__input_padding font font_sb"
              v-model="password"
            >
        </label>
        <label class="form__label form__label_width_normal font font_b">
          First name
          <input 
            type="text" 
            class="form__input form__input_padding font font_sb"
            v-model="firstName"
          >
        </label>
        <label class="form__label form__label_width_normal font font_b">
          Last name
          <input 
            type="text" 
            class="form__input form__input_padding font font_sb"
            v-model="lastName"
          >
        </label>
        <label 
          for="countrySelect" 
          class="form__label form__label_width_normal font font_b"
        >
          Country

          <!-- Select -->
          <v-select 
            id="countrySelect"
            class="form__input font font_sb"
            placeholder="Select"
            v-model="country"             
            :options="country_list"
            label="name"
            :clearSearchOnSelect="false"
            @input="updateCityList"
          />
        </label>

        <label 
          for="citySelect" 
          class="form__label form__label_width_normal font font_b"
        >
          City

          <!-- Select -->
          <v-select
            id="citySelect"
            class="form__input font font_sb"
            :placeholder="cityPlaceholder"
            v-model="city"
            :options="city_list"
            :clearSearchOnSelect="false"
            :disabled="!country"
          />
        </label>

        <label class="form__label form__label_width_normal font font_b">
          Birth date

          <!-- Datepicker -->
          <flat-pickr 
            v-model="birthDate"
            :wrap="true"
            class="form__input form__input_padding font font_sb form__input_background_calendar"
          />
        </label>

        <label class="form__label form__label_width_normal font font_b">
          Zip code
          <input 
            type="text" 
            class="form__input form__input_padding font font_sb"
            v-model="zipCode"
          >
        </label>
      </div>
      <div class="form__info flex flex_column flex_align_center flex_justify_around font font_r">
        <pulse-loader v-if="loading" />
        <transition name="fade">
          <div v-if="errors.length" class="form__error">
              <span v-for="error in errors" :key="error">
                {{error}}
              </span>  
          </div>
          <div v-if="success" class="form__success">
              Success! All changes saved.
          </div>
        </transition>
      </div>
        <button 
          class="form__button font font_b" 
          type="submit"
        >
          Sign up
        </button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { getCountries, getCities } from "../../api";
// Сторонние компоненты
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
// Стили сторонних компонентов
import "../../styles/select.scss";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/airbnb.css";
/* 
  Переходы для компонентов-обёрток: transition, 
  transition-group 
*/   
import "../../styles/transition.scss";

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
      success: false,
      loading: false
    };
  },

  components: {
    // Select
    vSelect,
    // Datepicker
    flatPickr,
    // Spinner
    PulseLoader 
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
    },

    // Для отображения статуса загрузки списка городов 
    cityPlaceholder: function() {
      if (this.country && this.city_list.length === 0) return "Loading...";
      else return "Select";
    }
  },

  watch: {
    country: function() {
      /* 
        Следим за изменением значения страны.
        Очищаем значение города при изменении
        значения страны
      */
      this.updateCity(null);
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
      // Проверяем поля помеченные *
      if (this.login && this.email && this.password) {
        // включаем индикатор загрузки
        this.loading = true;
        // Вызываем обработчик данных формы
        this.confirmRegistrationData()
          .then(() => {
            // Выключаем индикатор загрузки
            this.loading = false;
            // Очищаем поля
            this.clearRegistrationData();
            // Выводим сообщение об успешной регистрации
            this.displaySuccess();
          })
          .catch(e => {
            // выводим ошибку
            this.displayError(e);
          });
      } else {
        // Выводим ошибку
        this.displayError("Fields marked with * should not be empty.");
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
        Делает значение success=true на несколько 
        секунд для отображения сообщения об успешной 
        регистрации
      */
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 5000);
    },

    displayError(error) {
      /* 
        Отображает текст ошибки на несколько 
        секунд 
      */
      this.errors = [];
      this.errors.push(error);
      setTimeout(() => {
        this.errors = [];
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

<style lang="scss" scoped>
@import "../../styles/form";
@import "../../styles/flex";
@import "../../styles/font";
</style>
