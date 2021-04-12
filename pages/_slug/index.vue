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
          width="800px"
          height="600px"
          :src="`${thumbnail.url}`"
          :alt="`${id}_thumbnail`"
        />
      </div>

      <TableOfContents :toc="toc" />

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
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import TableOfContents from '~/components/TableOfContents'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)

export default {
  components: {
    TableOfContents,
  },

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

    const headings = $('h2, h3, h4').toArray()
    const toc = headings.map((data) => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name,
    }))

    return {
      ...data,
      body: $.html(),
      toc,
    }
  },
}
</script>

<style lang="postcss" scoped>
#content_body {
  >>> h1 {
    @apply text-2xl text-center font-semibold p-3 my-6;
  }

  >>> h2 {
    @apply text-xl text-center font-semibold border-t-4 border-b-4 border-black p-3 my-6;
  }

  >>> h3 {
    @apply text-lg font-semibold border-t-4 border-black pt-4;
  }

  >>> h4 {
    @apply text-base font-semibold border-gray-400;
  }

  >>> h5 {
    @apply text-base font-semibold;
  }

  >>> blockquote {
    @apply bg-gray-100 py-7 px-5 mb-5 rounded-lg;
  }
  >>> ol {
    @apply py-4;
  }

  >>> li {
    @apply text-sm font-medium ml-3 list-decimal list-inside;
  }

  >>> a {
    @apply text-blue-500 hover:text-blue-200;
  }

  >>> p img {
    @apply my-6;
  }

  >>> code {
    @apply border-b border-black mr-1;
  }

  >>> pre {
    @apply border-b my-6;
  }
}
</style>
