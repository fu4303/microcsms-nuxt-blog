<template>
  <div class="w-full md:max-w-3xl mx-auto pt-16 pb-16 p-3">
    <ul
      v-if="contents.length"
      id="list"
      class="w-12/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2 gap-5"
    >
      <li v-for="content in contents" :key="content.id" class="mb-5 relative">
        <nuxt-link
          :to="`/${content.id}`"
          class="font-normal break-all grid grid-cols-2 sm:grid-cols-1"
        >
          <div class="w-full flex justify-center items-center overflow-hidden">
            <picture v-if="content.thumbnail">
              <source
                media="(min-width: 375px)"
                type="image/webp"
                :srcset="`${content.thumbnail.url}?w=350&fm=webp, ${content.thumbnail.url}?w=700&fm=webp 2x`"
              />
              <source
                media="(max-width: 375px)"
                type="image/webp"
                :srcset="`${content.thumbnail.url}?w=350&fm=webp, ${content.thumbnail.url}?w=700&fm=webp 2x`"
              />
              <img
                ref="ogimage"
                :src="content.thumbnail.url + '?w=500&q=100'"
                class="ogimage"
                alt
              />
            </picture>
          </div>

          <div>
            <small class="ml-3 md:ml-1 text-xs tracking-wider text-gray-400">
              {{ new Date(content.publishedAt).toLocaleDateString() }}
            </small>

            <div class="text-sm ml-2 md:ml-0">{{ content.title }}</div>
          </div>
        </nuxt-link>

        <div
          class="text-xs border px-2 pt-0.5 pb-1 bg-gray-200 absolute -top-2 left-3 md:left-3"
        >
          <nuxt-link :to="`/category/${content.category.id}/page/1`">
            {{ content.category.id.toUpperCase() }}
          </nuxt-link>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li>no posts</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: true,
    },
  },
}
</script>
