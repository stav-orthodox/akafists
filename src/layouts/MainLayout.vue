<template>
   <div class="app-main-layout">
      <Navbar @my-click="isOpen = !isOpen" />

      <Sidebar @my-click="isOpen = !isOpen" :isOpen="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
         <div class="app-page">
            <router-view />
         </div>
      </main>

      <div class="fixed-action-btn">
         <router-link class="btn-floating btn-large blue" to="/record">
            <i class="large material-icons">add</i>
         </router-link>
      </div>
   </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar';
import Navbar from '@/components/app/Navbar';
import messages from '@/utils/messages';

export default {
   name: 'main-layout',
   data: () => ({ isOpen: false }),
   components: {
      Sidebar,
      Navbar,
   },
   mounted() {
      if (messages[this.$route.query.message]) {
         this.$message(messages[this.$route.query.message]);
      }
   },
};
</script>
