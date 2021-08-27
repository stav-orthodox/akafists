<template>
   <div class="col s12 m6">
      <div>
         <div class="page-subtitle">
            <h4>Редактировать</h4>
         </div>

         <form @submit.prevent="submitHandler">
            <div class="input-field">
               <select ref="select" v-model="current">
                  <option v-for="c of categories" :key="c.id" :value="c.id">
                     {{ c.title }}
                  </option>
               </select>
               <label>Выберите категорию</label>
            </div>

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
                  >Пусто</span
               >
            </div>

            <button class="btn waves-effect waves-light" type="submit">
               Обновить
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
   props: {
      categories: {
         type: Array,
         required: true,
      },
   },
   data: () => ({
      v$: useVuelidate(),
      select: null,
      title: '',
      current: null,
   }),
   validations() {
      return {
         title: { required },
      };
   },
   watch: {
      current(catId) {
         const { title } = this.categories.find((c) => c.id === catId);
         this.title = title;
      },
   },
   created() {
      const { id, title } = this.categories[0];
      this.current = id;
      this.title = title;
   },
   mounted() {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
   },
   unmounted() {
      if (this.select && this.select.destroy) {
         this.select.destroy();
      }
   },

   methods: {
      async submitHandler() {
         this.v$.$validate();
         if (this.v$.$invalid) {
            this.v$.$touch();
            return;
         }

         try {
            const categoryData = {
               id: this.current,
               title: this.title,
            };
            await this.$store.dispatch('updateCategory', categoryData);

            this.$message('Обновлено');
            this.$emit('updated', categoryData);
         } catch (e) {
            throw `${e}`;
         }
      },
   },
};
</script>
