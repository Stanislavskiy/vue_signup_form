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
      @submit.prevent="submitForm()"
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
        :clearSearchOnSelect="false"
        label="countryName"
      />

      <label for="citySelect" class="form__label">
        City
      </label>

      <!-- Select -->
      <v-select
        id="citySelect"
        placeholder="Select"
        v-model="city"
        label="name"
        :options="cities"
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
      <button class="form__button" type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import countries from "../../assets/data/countries.json";
import cities from "../../assets/data/cities.json";

export default {
  data() {
    return {
      /* 
        Список стран (countries) и городов (cities) 
        для отображения в select
      */
      country_list: countries,
      city_list: [],

      /* Массив для хранения ошибок формы */
      errors: []
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
    },

    cities: function() {
      /* 
        Список городов выбранной страны. 
        Служит для отображения в select
      */
      if (this.country) {
        return cities.filter(city => {
          return city.country === this.country.countryCode;
        });
      } else {
        return [];
      }
    }
  },
  watch: {
    country: function() {
      /* 
        Следим за изменением значения страны.
        Очищаем значение города если страна не указана
      */
      if (!this.country) {
        this.updateCity(null);
      }
    }
  },
  methods: {
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
      this.errors = [];

      if (this.login && this.email && this.password) {
        this.$notify({
          group: "app",
          type: "success",
          title: "Success!",
          text: "All changes saved"
        });
      } else {
        this.errors.push(
          `
          Fields marked with "*" should not be empty
          `
        );
      }
    }
  }
};
</script>
