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
    <form class="form form-registration__form">
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

      <!-- Select1 -->
      <!-- Select2 -->
      <!-- Datepicker -->

      <label class="form__label">
        Zip code
        <input 
          type="text" 
          class="form__input"
          v-model="zipCode"
        >
      </label>

      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    /* 
      Двунаправленные вычисляемые свойства.
      Служат для привязки v-model к данным 
      во Vuex
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
        return this.$store.getters.country;
      },
      set(value) {
        return this.updateCity(value);
      }
    },

    birthDate: {
      get() {
        return this.$store.getters.country;
      },
      set(value) {
        return this.updateBirthDate(value);
      }
    },

    zipCode: {
      get() {
        return this.$store.getters.country;
      },
      set(value) {
        return this.updateZipCode(value);
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
      "updateBirthDate",
      "updateZipCode"
    ])
  }
};
</script>
