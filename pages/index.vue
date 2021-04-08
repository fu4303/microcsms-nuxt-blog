<template>
  <main class="leading-normal tracking-normal">
    <!-- Container -->
    <div class="container w-full md:max-w-3xl mx-auto pt-20">
      <h1>HOME</h1>
      <ul v-if="contents.length">
        <li
          v-for="content in contents"
          :key="content.id"
          class="p-3 mb-5 bg-gray-100 rounded-lg"
        >
          <nuxt-link
            :to="`/${content.id}`"
            class="text-xl font-semibold block mb-2"
          >
            {{ content.emoji }} {{ content.title }}
          </nuxt-link>

          <!-- publish date & category -->
          <div class="flex-row item-center pl-6">
            <small class="text-xs mr-3">
              <div class="w-3.5 h-3.5 inline-block pt-0.5 mr-1">
                <clockIcon />
              </div>

              {{ new Date(content.publishedAt).toLocaleDateString() }}
            </small>

            <nuxt-link
              :to="`/category/${content.category.id}/page/1`"
              class="text-sm border px-2 py-0.5 rounded text-blue-400 hover:text-blue-500 border-blue-400 hover:border-blue-500"
            >
              {{ content.category.id }}
            </nuxt-link>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li>no posts</li>
      </ul>
    </div>
    <div>
      <Pagination :category="$route.params.categoryId" :length="totalCount" />
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import clockIcon from '~/static/icons/clock-icon.svg'
import Pagination from '~/components/Pagination.vue'

export default {
  components: {
    clockIcon,
    Pagination,
  },
  async asyncData({ params }) {
    const page = params.p || '1'
    const categoryId = params.categoryId
    const limit = 10
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      `https://shunyadezain.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { 'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e' },
      }
    )

    return data
  },
  data() {
    return {
      totalPosts: '',
    }
  },
  computed: {},
}
</script>
