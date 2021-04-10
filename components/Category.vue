<template>
  <ul class="flex mb-10">
    <li class="mr-3">
      <nuxt-link
        to="/"
        class="text-xs tracking-wider font-normal px-2 pt-0.5 pb-1 bg-gray-200"
        >All</nuxt-link
      >
    </li>
    <li class="mr-3">
      <nuxt-link
        to="/category/javascript/page/1"
        class="text-xs tracking-wider font-normal px-2 pt-0.5 pb-1 bg-gray-200"
        >Javascript</nuxt-link
      >
    </li>
    <li class="mr-3">
      <nuxt-link
        to="/category/css/page/1"
        class="text-xs tracking-wider font-normal px-2 pt-0.5 pb-1 bg-gray-200"
        >CSS</nuxt-link
      >
    </li>
    <!-- <li><nuxt-link :to="/">All</nuxt-link></li> -->
  </ul>
</template>
