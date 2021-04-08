<template v-if="length > 0">
  <ul class="w-full md:max-w-xl mx-auto flex justify-center">
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
    <template v-if="length >= 11">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/2'"
          class="px-3 py-2 rounded bg-gray-100"
          >2</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 21">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/3'"
          class="px-3 py-2 rounded bg-gray-100"
          >3</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 41">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/4'"
          class="px-3 py-2 rounded bg-gray-100"
          >4</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 51">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/5'"
          class="px-3 py-2 rounded bg-gray-100"
          >5</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 61">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/6'"
          class="px-3 py-2 rounded bg-gray-100"
          >6</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 71">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/7'"
          class="px-3 py-2 rounded bg-gray-100"
          >7</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 81">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/8'"
          class="px-3 py-2 rounded bg-gray-100"
          >8</nuxt-link
        >
      </li>
    </template>
    <template v-if="length >= 91">
      <li>
        <nuxt-link
          :to="getPageLink + '/page/9'"
          class="px-3 py-2 rounded bg-gray-100"
          >9</nuxt-link
        >
      </li>
    </template>

    <template v-if="length >= 101">
      <li>
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
  @apply bg-blue-400 pointer-events-none;
}
</style>
