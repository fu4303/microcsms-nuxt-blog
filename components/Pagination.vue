<template v-if="length > 0">
  <ul
    class="max-w-lg mx-auto flex justify-center py-5 my-10 bg-white rounded-md"
  >
    <li class="mr-4">
      <nuxt-link
        :to="getPageLink + '/page/1'"
        class="px-3 py-2 rounded bg-gray-100"
        :class="{
          active: $route.params.p === 1 || $route.params.p === undefined,
        }"
        >1</nuxt-link
      >
    </li>
    <template v-if="length >= 10">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/2'"
          class="px-3 py-2 rounded bg-gray-100"
          >2</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 20">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/3'"
          class="px-3 py-2 rounded bg-gray-100"
          >3</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 40">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/4'"
          class="px-3 py-2 rounded bg-gray-100"
          >4</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 50">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/5'"
          class="px-3 py-2 rounded bg-gray-100"
          >5</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 60">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/6'"
          class="px-3 py-2 rounded bg-gray-100"
          >6</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 70">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/7'"
          class="px-3 py-2 rounded bg-gray-100"
          >7</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 80">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/8'"
          class="px-3 py-2 rounded bg-gray-100"
          >8</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 90">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/9'"
          class="px-3 py-2 rounded bg-gray-100"
          >9</nuxt-link
        >
      </li>
    </template>

    <template v-if="length >= 100">
      <li class="mr-4">
        <nuxt-link
          :to="getPageLink + '/page/10'"
          class="px-3 py-2 rounded bg-gray-100"
          >10</nuxt-link
        >
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: false,
      default: '',
    },
    length: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getPageLink() {
      let link = ''
      if (this.category) {
        link = '/category/' + this.category
      } else {
        link = ''
      }
      return link
    },
  },
}
</script>

<style lang="postcss" scoped>
.active,
a.nuxt-link-active {
  @apply bg-gray-800 pointer-events-none text-white;
}
</style>
