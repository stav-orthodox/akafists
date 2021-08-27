<template>
   <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
         <span class="card-title">Домашняя бухгалтерия</span>
         <div class="input-field">
            <input
               v-model.trim="email"
               id="email"
               type="text"
               :class="{
                  invalid:
                     (v$.email.$dirty && v$.email.required.$invalid) ||
                     (v$.email.$dirty && v$.email.email.$invalid),
               }"
            />
            <label for="email">Email</label>
            <small
               v-if="v$.email.$dirty && v$.email.required.$invalid"
               class="helper-text invalid"
               >Пусто
            </small>
            <small
               v-else-if="v$.email.$dirty && v$.email.email.$invalid"
               class="helper-text invalid"
            >
               Некорректно
            </small>
         </div>
         <div class="input-field">
            <input
               v-model.trim="password"
               id="password"
               type="password"
               :class="{
                  invalid:
                     (v$.password.$dirty && v$.password.required.$invalid) ||
                     (v$.password.$dirty && v$.password.minLength.$invalid),
               }"
            />
            <label for="password">Пароль</label>
            <small
               v-if="v$.password.$dirty && v$.password.required.$invalid"
               class="helper-text invalid"
            >
               Пусто
            </small>
            <small
               v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
               class="helper-text invalid"
               >Пароль должен состоять из
               {{ v$.password.minLength.$params.min }} символов -
               {{ password.length }}
            </small>
         </div>
         <div class="input-field">
            <input
               id="name"
               type="text"
               :class="{ invalid: v$.name.$dirty && v$.name.required.$invalid }"
               v-model.trim="name"
            />
            <label for="name">Имя</label>
            <small
               v-if="v$.name.$dirty && v$.name.required.$invalid"
               class="helper-text invalid"
               >Введите имя
            </small>
         </div>
         <p>
            <label>
               <input type="checkbox" v-model="agree" />
               <span>С правилами согласен</span>
            </label>
         </p>
      </div>
      <div class="card-action">
         <div>
            <button
               class="btn waves-effect waves-light auth-submit"
               type="submit"
            >
               Зарегистрироваться
               <i class="material-icons right">send</i>
            </button>
         </div>

         <p class="center">
            Уже есть аккаунт?
            <router-link to="/login">Войти!</router-link>
         </p>
      </div>
   </form>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';

export default {
   name: 'register',
   data() {
      return {
         v$: useVuelidate(),
         email: '',
         password: '',
         name: '',
         agree: false,
      };
   },

   validations() {
      return {
         email: { email, required },
         password: { required, minLength: minLength(6) },
         name: { required },
         agree: { checked: (v) => v },
      };
   },

   methods: {
      async submitHandler() {
         this.v$.$validate();
         if (this.v$.$invalid) {
            this.v$.$touch();
            return;
         }
         const formData = {
            email: this.email,
            password: this.password,
            name: this.name,
         };

         try {
            await this.$store.dispatch('register', formData);
            this.$router.push('/');
         } catch (e) {
            throw `${e}`;
         }
      },
   },
};
</script>
