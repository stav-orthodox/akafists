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

            <div class="input-field">
               <input
                  v-model.number="limit"
                  :class="{
                     invalid: v$.limit.$dirty && v$.limit.minValue.$invalid,
                  }"
                  id="limit"
                  type="number"
               />
               <label for="limit">Лимит</label>
               <span
                  v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
                  class="helper-text invalid"
                  >Минимальное значение
                  {{ v$.limit.minValue.$params.min }}</span
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
import { required, minValue } from '@vuelidate/validators';
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
      limit: 100,
      current: null,
   }),
   validations() {
      return {
         title: { required },
         limit: { minValue: minValue(100) },
      };
   },
   watch: {
      current(catId) {
         const { title, limit } = this.categories.find((c) => c.id === catId);
         this.title = title;
         this.limit = limit;
      },
   },
   created() {
      const { id, title, limit } = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit;
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
               limit: this.limit,
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
