<template>
   <table class="highlight">
      <thead>
         <tr>
            <!-- <th>#</th> -->
            <th>Название</th>
            <th>Кол-во</th>
            <!-- <th>Дата издания</th> -->
            <!-- <th>Добавлено</th> -->
            <th>
               <i style="color: green" class="material-icons green-color"
                  >edit</i
               >
            </th>
         </tr>
      </thead>

      <tbody>
         <tr v-for="record in records" :key="record.id">
            <!-- <td>{{ idx + 1 }}</td> -->
            <td>
               <i :class="record.color + '-text'">{{ record.title }}</i>
            </td>
            <td>{{ record.qty }}</td>
            <!-- <td>{{ record.pubDate }}</td> -->
            <!-- <td>{{ record.addDate }}</td> -->

            <td>
               <button
                  class="btn"
                  @click="
                     $router.push(
                        '/edit-record/' +
                           record.id +
                           '?page=' +
                           this.$route.query.page,
                     )
                  "
               >
                  <i
                     style="color: lightgreen"
                     class="material-icons green-color"
                     >edit</i
                  >
               </button>
            </td>
         </tr>
      </tbody>
   </table>
</template>
<script>
export default {
   props: {
      records: {
         required: true,
         type: Array,
      },
   },
};
</script>
<style lang="css" scoped>
.btn {
   padding: 0, 1px, 0, 1px;
}
</style>
