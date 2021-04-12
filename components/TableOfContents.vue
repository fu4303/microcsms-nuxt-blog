<template>
  <ul
    class="lists w-10/12 p-3 m-4 leading-relaxed text-sm mx-auto bg-gray-100 rounded-lg"
  >
    <div class="mokuji text-center font-bold border-b-2 border-black pb-2 mb-2">
      目次
    </div>
    <li v-for="item in toc" :key="item.id" :class="`list ${item.name}`">
      <n-link v-scroll-to="`#${item.id}`" to>
        {{ item.text }}
      </n-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.lists {
  li {
    @apply ml-5;
  }

  li:before {
    content: '-';
  }

  .list.h2 a {
    @apply font-medium;
  }

  .list.h3 {
    @apply pl-3;
  }

  .list.h4 {
    @apply pl-6;
  }
}
</style>
