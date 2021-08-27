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
      </div>
      <div class="card-action">
         <div>
            <button
               class="btn waves-effect waves-light auth-submit"
               type="submit"
            >
               Войти
               <i class="material-icons right">send</i>
            </button>
         </div>

         <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
         </p>
      </div>
   </form>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';

export default {
   // setup: () => ({ v$: useVuelidate() }),
   name: 'login',
   data() {
      return {
         v$: useVuelidate(),
         email: '',
         password: '',
      };
   },

   validations() {
      return {
         email: { email, required },
         password: { required, minLength: minLength(6) },
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
         };

         try {
            await this.$store.dispatch('login', formData);
            this.$router.push('/?message=login');
         } catch (e) {
            throw `${e}`;
         }
      },
   },
};
</script>
