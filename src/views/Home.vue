<template>
   <div>
      <div class="page-title">
         <h3>Храм великомученика и целителя Пантелеимона</h3>
      </div>

      <div class="row">
         <loader v-if="loading" />
         <p v-else-if="!records.length" class="center">Записей пока нет</p>
         <section v-else>
            <p class="center text-bolder">Реестр Акафистов</p>
            <form class="">
               <div class="input-field">
                  <i class="material-icons prefix">search</i>
                  <input
                     v-model="search"
                     id="icon_prefix"
                     type="text"
                     class="validate"
                  />
                  <label for="icon_prefix">Поиск</label>
               </div>
            </form>
            <akafist-table :records="items" />
            <hr />
            <Paginate
               v-model="page"
               :pages="pageCount"
               :range-size="1"
               active-color="#e57373"
               @update:modelValue="pageChangeHandler"
            />
         </section>
      </div>
   </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import AkafistTable from '@/components/AkafistTable.vue';

export default {
   name: 'Home',
   mixins: [paginationMixin],
   data: () => ({
      search: '',
      loading: true,
      records: [],
      categories: [],
   }),

   async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      this.categories = await this.$store.dispatch('fetchCategories');
      const categories = this.categories;
      const records = this.records;
      this.setup(categories, records);
      this.loading = false;
   },

   computed: {
      filteredRecords() {
         return this.records.filter((record) =>
            record.title.toLowerCase().includes(this.search.toLowerCase()),
         );
      },
   },

   watch: {
      search() {
         const records = this.filteredRecords.length
            ? this.filteredRecords
            : this.records;
         const categories = this.categories;
         this.setup(categories, records);
      },
   },

   methods: {
      setup(categories, records) {
         this.setupPagination(
            records.map((record) => {
               return {
                  ...record,

                  categoryName: categories.find(
                     (c) => c.id === record.selectCat,
                  ).title,

                  categoryId: categories.find((c) => c.id === record.selectCat)
                     .id,

                  color:
                     record.selectCat === '-MhVklXSmUaFsYb3aSlw'
                        ? 'blue'
                        : record.selectCat === '-MhW3M9STTZWYsLiTZL_'
                        ? 'green'
                        : record.selectCat === '-MhW3WyBORHjYcCgdvwv'
                        ? 'red'
                        : record.selectCat === '-MhYwlvq1LIp7iQ3J6VZ'
                        ? 'purple'
                        : record.selectCat === '-Mi43aC5AotvF82glRF9'
                        ? 'grey'
                        : 'amber',
               };
            }),
         );
      },
   },
   components: { AkafistTable },
};
</script>
