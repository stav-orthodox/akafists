<template>
   <div class="col s12 m6">
      <div>
         <div class="page-subtitle">
            <h4>Редактировать</h4>
         </div>
         <loader v-if="loading" />

         <form v-else @submit.prevent="submitHandler">
            <div class="input-field">
               <select ref="select" v-model="category">
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
                  id="title"
                  type="text"
               />
               <label for="name">Название</label>
               <span
                  v-if="v$.title.$dirty && v$.title.required.$invalid"
                  class="helper-text invalid"
                  >Пусто
               </span>
            </div>

            <div class="input-field">
               <input
                  v-model.number="qty"
                  :class="{
                     invalid: v$.qty.$dirty && v$.qty.minValue.$invalid,
                  }"
                  id="qty"
                  type="number"
               />
               <label for="qty">Количество</label>
               <span
                  v-if="v$.qty.$dirty && v$.qty.minValue.$invalid"
                  class="helper-text invalid"
                  >Минимальное значение
                  {{ v$.qty.minValue.$params.min }}
               </span>
            </div>

            <div class="input-field">
               <input
                  v-model="pubDate"
                  :class="{
                     invalid: v$.pubDate.$dirty && v$.pubDate.required.$invalid,
                  }"
                  id="pubDate"
                  type="date"
               />
               <label for="pubDate">Дата публикации</label>
               <span
                  v-if="v$.pubDate.$dirty && v$.pubDate.required.$invalid"
                  class="helper-text invalid"
                  >Пусто
               </span>
            </div>

            <!-- <div class="input-field">
               <input
                  v-model="addDate"
                  :class="{
                     invalid: v$.pubDate.$dirty && v$.pubDate.required.$invalid,
                  }"
                  id="pubDate"
                  type="date"
               />
               <label for="pubDate">Дата публикации</label>
               <span
                  v-if="v$.pubDate.$dirty && v$.pubDate.required.$invalid"
                  class="helper-text invalid"
                  >Пусто
               </span>
            </div> -->

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
import Loader from '../components/app/Loader.vue';
export default {
   components: { Loader },
   data: () => ({
      v$: useVuelidate(),
      select: null,
      title: '',
      qty: null,
      current: null,
      categories: [],
      category: null,
      akafist: [],
      pubDate: '',
      addDate: '',
      id: null,
      selectCat: null,
      loading: true,
   }),
   validations() {
      return {
         title: { required },
         pubDate: { required },
         qty: { minValue: minValue(1) },
      };
   },

   async mounted() {
      this.id = this.$router.currentRoute.value.params.id;
      this.akafist = await this.$store.dispatch('fetchRecord', this.id);
      this.selectCat = this.akafist.selectCat;

      this.categories = await this.$store.dispatch('fetchCategories');

      this.pubDate = this.akafist.pubDate;
      this.addDate = this.akafist.addDate;
      this.title = this.akafist.title;
      this.qty = this.akafist.qty;

      this.loading = false;

      if (this.categories.length && this.selectCat) {
         this.category = this.categories.find(
            (c) => c.id === this.selectCat,
         ).id;
      } else {
         this.category = '-Mi1cs9HZcCc7DxX9o5D';
      }

      setTimeout(() => {
         this.select = window.M.FormSelect.init(this.$refs.select);
         window.M.updateTextFields();
      }, 0);
   },
   unmounted() {
      if (this.select && this.select.destroy) {
         this.select.destroy();
      }
   },

   methods: {
      async submitHandler() {
         this.loading = true;
         this.v$.$validate();
         if (this.v$.$invalid) {
            this.v$.$touch();
            return;
         }

         try {
            const recordData = {
               id: this.id,
               title: this.title,
               qty: this.qty,
               pubDate: this.pubDate,
               addDate: this.addDate,
               selectCat: this.category,
            };

            await this.$store.dispatch('updateRecord', recordData);
            this.loading = true;

            this.$message('Обновлено');
            this.$router.push('/?page=' + this.$route.query.page);
         } catch (e) {
            throw `${e}`;
         }
      },
   },
};
</script>
