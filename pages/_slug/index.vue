<template>
  <main class="leading-relaxed tracking-normal">
    <!-- Container -->
    <div
      class="container w-full md:max-w-3xl mx-auto mt-32 pb-12 bg-white relative"
    >
      <!--Title-->
      <div class="pt-10">
        <h1 class="text-center font-medium break-normal pb-28 pt-20 text-xl">
          <small class="text-xs tracking-wider text-gray-400 block pb-5">
            {{ new Date(publishedAt).toLocaleDateString() }}
          </small>
          {{ title }}
        </h1>
        <nuxt-link
          :to="`/category/${category.id}/page/1`"
          class="text-xs tracking-wider px-2 pt-0.5 pb-1 bg-gray-200 absolute top-3 right-3"
        >
          {{ category && category.name }}
        </nuxt-link>

        <img
          class="w-full mb-5"
          :src="`${thumbnail.url}`"
          :alt="`${id}_thumbnail`"
        />
      </div>

      <!-- Contents -->
      <!-- eslint-disable vue/no-v-html -->
      <div
        id="content_body"
        class="w-full md:w-10/12 p-3 md:p-3 leading-relaxed text-sm mx-auto"
        v-html="body"
      ></div>
      <!-- eslint-enable -->
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'
import hljs from 'highlight.js'

export default {
  scrollToTop: true,
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://shunyadezain.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e' },
      }
    )
    // pre codeにhljsをつける
    const $ = cheerio.load(data.body)
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass('hljs rounded-lg')
    })

    return {
      ...data,
      body: $.html(),
    }
  },
}
</script>

<style lang="postcss" scoped>
#content_body >>> h1 {
  @apply text-2xl text-center font-semibold p-3 my-6;
}
#content_body >>> h2 {
  @apply text-xl text-center font-semibold border-t-4 border-b-4 border-black p-3 my-6;
}
#content_body >>> h3 {
  @apply text-lg font-semibold border-t-4 border-black pt-4;
}
#content_body >>> h4 {
  @apply text-base font-semibold border-gray-400;
}
#content_body >>> h5 {
  @apply text-base font-semibold;
}
#content_body >>> blockquote {
  @apply bg-gray-50 py-7 px-5 mb-5 rounded-lg;
}
#content_body >>> ol {
  @apply py-4;
}
#content_body >>> li {
  @apply text-sm font-medium ml-3 list-decimal list-inside;
}
#content_body >>> a {
  @apply text-blue-500 hover:text-blue-200;
}
#content_body >>> p img {
  @apply my-6;
}
#content_body >>> code {
  @apply border-b border-black mr-1;
}
#content_body >>> pre {
  @apply border-b my-6;
}
#content_body >>> p img {
  @apply my-6;
}
</style>
