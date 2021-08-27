<template>
   <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
      <li v-for="link in links" :key="link.url" :exact="link.exact">
         <router-link
            @click.prevent="$emit('my-click')"
            class="waves-effect waves-orange pointer"
            active-class="active"
            :to="link.url"
         >
            {{ link.title }}
         </router-link>
      </li>
   </ul>
</template>

<script>
export default {
   props: ['isOpen'],
   data: () => ({
      links: [
         { title: 'Главная', url: '/', exact: true },
         { title: 'Категории', url: '/categories' },
         { title: 'Новая запись', url: '/record' },
         { title: 'История', url: '/history' },
      ],
   }),
};
</script>

<style lang="css" scoped>
.app-sidenav {
   width: max-content;
}
</style>
