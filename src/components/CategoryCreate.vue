<template>
   <div class="col s12 m6">
      <div>
         <div class="page-subtitle">
            <h4>Создать</h4>
         </div>

         <form @submit.prevent="submitHandler">
            <div class="input-field">
               <input
                  v-model="title"
                  :class="{
                     invalid: v$.title.$dirty && v$.title.required.$invalid,
                  }"
                  id="name"
                  type="text"
               />
               <label for="name">Название</label>
               <span
                  v-if="v$.title.$dirty && v$.title.required.$invalid"
                  class="helper-text invalid"
                  >Введите название категории</span
               >
            </div>

            <button class="btn waves-effect waves-light" type="submit">
               Создать
               <i class="material-icons right">send</i>
            </button>
         </form>
      </div>
   </div>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
   data() {
      return { v$: useVuelidate(), title: '' };
   },

   validations() {
      return {
         title: { required },
      };
   },

   mounted() {
      window.M.updateTextFields();
   },

   methods: {
      async submitHandler() {
         this.v$.$validate();
         if (this.v$.$invalid) {
            this.v$.$touch();
            return;
         }

         try {
            const category = await this.$store.dispatch('createCategory', {
               title: this.title,
            });
            this.title = '';

            this.v$.$reset();
            this.$message('Создано');
            this.$emit('created', category);
            // console.log(category);
         } catch (e) {
            throw `${e}`;
         }
      },
   },
};
</script>
