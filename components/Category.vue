<template>
  <ul class="flex pb-5">
    <li class="mr-3">
      <nuxt-link
        to="/"
        class="category text-xs tracking-wider font-normal px-2 pt-0.5 pb-1 bg-gray-200"
        >All</nuxt-link
      >
    </li>
    <li v-for="item in category" :key="item.id" class="mr-3">
      <nuxt-link
        :to="`/category/${item.id}/page/1`"
        class="category text-xs tracking-wider font-normal px-2 pt-0.5 pb-1 bg-gray-200"
        >{{ item.name }}</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      requred: true,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss">
.category.nuxt-link-exact-active.nuxt-link-active {
  @apply bg-gray-800 pointer-events-none text-white;
}
</style>
