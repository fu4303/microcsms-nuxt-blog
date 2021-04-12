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
      <Category :category="getCategory.contents" />
    </div>
    <div class="bg-white w-full">
      <!-- Contents -->
      <Articles :contents="getContents.contents" />
    </div>
    <div class="w-full md:max-w-3xl mx-auto p-3">
      <Pagination
        :category="$route.params.categoryId"
        :length="getContents.totalCount"
      />
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
  async asyncData({ $config, params }) {
    const page = params.p || '1'
    const categoryId = params.categoryId
    const limit = 9
    const { data: contents } = await axios.get(
      `https://shunyadezain.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    )

    const { data: category } = await axios.get(
      `https://shunyadezain.microcms.io/api/v1/categories`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    )

    return {
      contents,
      category,
    }
  },
  data() {
    return {
      pageName: 'ALL',
    }
  },
  computed: {
    getContents() {
      return this.contents
    },
    getCategory() {
      return this.category
    },
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
