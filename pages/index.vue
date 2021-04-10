<template>
  <main class="leading-relaxed tracking-normal">
    <!-- Container -->
    <div class="container w-full w-full md:max-w-3xl mx-auto pt-40 p-3">
      <div
        class="text-lg font-semibold text-center mb-10 pb-20 border-b-2 border-gray-900"
      >
        {{ pageName }}
      </div>
      <ul
        v-if="contents.length"
        id="list"
        class="w-12/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2 gap-5"
      >
        <li v-for="content in contents" :key="content.id" class="mb-5 relative">
          <nuxt-link
            :to="`/${content.id}`"
            class="font-normal break-all mb-0 sm:mb-10 grid grid-cols-2 sm:grid-cols-1"
          >
            <div class="w-full flex justify-center items-center">
              <img
                :src="`${content.thumbnail.url}`"
                :alt="`${content.id}_thumbnail`"
              />
            </div>

            <div>
              <small class="ml-2 md:ml-0 text-xs tracking-wider text-gray-400">
                {{ new Date(content.publishedAt).toLocaleDateString() }}
              </small>

              <div class="text-sm ml-2 md:ml-0">{{ content.title }}</div>
            </div>
          </nuxt-link>

          <div
            class="text-xs border px-2 pt-0.5 pb-1 bg-gray-200 absolute -top-2 right-3"
          >
            {{ content.category.id.toUpperCase() }}
          </div>
        </li>
      </ul>
      <ul v-else>
        <li>no posts</li>
      </ul>
      <Pagination :category="$route.params.categoryId" :length="totalCount" />
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Pagination from '~/components/Pagination.vue'

export default {
  components: {
    Pagination,
  },
  scrollToTop: true,
  async asyncData({ params }) {
    const page = params.p || '1'
    const categoryId = params.categoryId
    const limit = 9
    const { data } = await axios.get(
      `https://shunyadezain.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        headers: { 'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e' },
      }
    )

    return {
      ...data,
    }
  },
  data() {
    return {
      pageName: 'ALL',
    }
  },
  mounted() {
    if (this.$route.params.categoryId) {
      this.pageName = `CATEGORY: ` + this.$route.params.categoryId.toUpperCase()
    } else {
      this.pageName = 'ALL'
    }
  },
}
</script>
