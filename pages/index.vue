<template>
  <main class="leading-normal tracking-normal">
    <!-- Container -->
    <div class="container w-full max-w-4xl mx-auto pt-10">
      <ul v-if="contents.length" class="flex flex-wrap justify-around">
        <li
          v-for="content in contents"
          :key="content.id"
          class="p-4 mb-10 bg-gray-50 rounded-lg w-11/12 sm:w-5/12 relative mx-auto"
        >
          <nuxt-link
            :to="`/${content.id}`"
            class="text-lg font-semibold block break-all mb-10"
          >
            <div
              class="w-full flex justify-center items-center h-40 text-4xl bg-blue-50 rounded-md"
            >
              {{ content.emoji }}
            </div>
            {{ content.title }}
          </nuxt-link>

          <!-- publish date & category -->
          <div class="flex-row item-center absolute right-4 bottom-4">
            <small class="text-sm mr-3">
              <div class="w-3.5 h-3.5 inline-block pt-0.5 mr-1">
                <clockIcon />
              </div>

              {{ new Date(content.publishedAt).toLocaleDateString() }}
            </small>

            <nuxt-link
              :to="`/category/${content.category.id}/page/1`"
              class="text-sm border px-2 py-1 rounded text-blue-500 hover:text-blue-600 border-blue-500 hover:border-blue-600"
            >
              {{ content.category.id }}
            </nuxt-link>
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
}
</script>
