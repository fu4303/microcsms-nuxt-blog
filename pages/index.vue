<template>
  <main class="leading-relaxed tracking-normal">
    <!-- Container -->
    <div class="container w-full md:max-w-3xl mx-auto pt-40 p-3">
      <div
        class="text-lg font-semibold text-center mb-5 pb-20 border-b-2 border-gray-900"
      >
        {{ pageName }}
      </div>

      <!-- Category -->
      <Category />
    </div>
    <div class="bg-white w-full">
      <!-- Contents -->
      <Articles :contents="contents" />
    </div>
    <div class="w-full md:max-w-3xl mx-auto p-3">
      <Pagination :category="$route.params.categoryId" :length="totalCount" />
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Pagination from '~/components/Pagination.vue'
import Articles from '~/components/Articles.vue'
import Category from '~/components/Category.vue'

export default {
  components: {
    Pagination,
    Articles,
    Category,
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
