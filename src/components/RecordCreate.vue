<template>
   <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
         <select
            ref="select"
            v-model="selectCat"
            :class="{
               invalid: v$.selectCat.$dirty && v$.selectCat.required.$invalid,
            }"
         >
            <option v-for="c of categories" :key="c.id" :value="c.id">
               {{ c.title }}
            </option>
         </select>
         <label>Категория акафиста</label>
         <span
            v-if="v$.selectCat.$dirty && v$.selectCat.required.$invalid"
            class="helper-text invalid"
            >Не выбрана категория
         </span>
      </div>

      <div class="input-field">
         <textarea
            v-model.trim="title"
            :class="{
               invalid: v$.title.$dirty && v$.title.required.$invalid,
            }"
            class="materialize-textarea"
            id="name"
            type="text"
         ></textarea>
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
         <label for="limit">Кол-во</label>
         <span
            v-if="v$.qty.$dirty && v$.qty.minValue.$invalid"
            class="helper-text invalid"
            >Минимальное значение {{ v$.qty.minValue.$params.min }}</span
         >
      </div>

      <div class="input-field">
         <input
            :class="{
               invalid: v$.pubDate.$dirty && v$.pubDate.required.$invalid,
            }"
            v-model="pubDate"
            id="pubDate"
            type="date"
         />
         <label for="pubDate">Дата издания</label>
         <span
            v-if="v$.pubDate.$dirty && v$.pubDate.required.$invalid"
            class="helper-text invalid"
            >Пусто</span
         >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
         Создать
         <i class="material-icons right">send</i>
      </button>
   </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
export default {
   name: 'record',
   props: {
      categories: {
         type: Array,
         required: true,
      },
   },

   data() {
      return {
         v$: useVuelidate(),
         selectCat: null,
         select: null,
         qty: 0,
         title: 'Акафист ',
         pubDate: null,
         addDate: null,
      };
   },

   computed: {
      formatDate() {
         var dd = new Date().getDate();
         if (dd < 10) dd = '0' + dd;
         var mm = new Date().getMonth() + 1;
         if (mm < 10) mm = '0' + mm;
         var yyyy = new Date().getFullYear();
         return yyyy + '-' + mm + '-' + dd;
      },
   },

   validations() {
      return {
         selectCat: { required },
         title: { required },
         pubDate: { required },
         qty: { minValue: minValue(1) },
      };
   },

   methods: {
      async submitHandler() {
         this.v$.$validate();
         if (this.v$.$invalid) {
            this.v$.$touch();
            return;
         }

         try {
            console.log(this.selectCat);
            const record = await this.$store.dispatch('createRecord', {
               selectCat: this.selectCat,
               qty: this.qty,
               title: this.title,
               pubDate: this.pubDate,
               addDate: this.formatDate,
            });
            this.loading = true;
            this.$message('Создано');
            console.log(record);
            this.$emit('created', record);
            this.$router.push('/');
         } catch (e) {
            throw `${e}`;
         }
      },

      // dateFilter(value, format = 'date') {
      //    const options = {};

      //    if (format.includes('date')) {
      //       options.year = 'numeric';
      //       options.month = '2-digit';
      //       options.day = '2-digit';
      //    }

      //    return new Intl.DateTimeFormat('ru-RU', options).format(value);
      // },
   },
   mounted() {
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
};
</script>
