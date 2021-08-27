<template>
   <div>
      <div class="page-title">
         <h3>Новая запись</h3>
      </div>

      <section>
         <Loader v-if="loading" />
         <div v-else class="row">
            <RecordCreate @created="addNewRecord" :categories="categories" />
         </div>
      </section>
   </div>
</template>

<script>
import RecordCreate from '@/components/RecordCreate';
import Loader from '../components/app/Loader.vue';

export default {
   name: 'record',
   data: () => ({ categories: [], records: [], loading: true, updateCount: 0 }),

   async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.records = await this.$store.dispatch('fetchRecords');
      // console.log(this.categories);
      this.loading = false;
   },

   components: { RecordCreate, Loader },

   methods: {
      addNewRecord(record) {
         this.records.push(record);
      },
   },
};
</script>
