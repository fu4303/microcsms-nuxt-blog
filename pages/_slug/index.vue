<template>
  <main class="leading-relaxed tracking-normal">
    <!-- Container -->
    <div class="container w-full md:max-w-3xl mx-auto mt-32 bg-white relative">
      <!--Title-->
      <div class="pt-10">
        <h1 class="text-center font-medium break-normal pb-28 pt-20 text-xl">
          <small class="text-xs tracking-wider text-gray-400 block">
            {{ new Date(publishedAt).toLocaleDateString() }}
          </small>
          {{ title }}
        </h1>
        <nuxt-link
          :to="`/category/${category.id}/page/1`"
          class="text-xs tracking-wider text-gray-400text-xs border px-2 pt-0.5 pb-1 bg-gray-200 absolute top-3 right-3"
        >
          {{ category && category.name }}
        </nuxt-link>

        <img :src="`${thumbnail.url}`" :alt="`${id}_thumbnail`" />
      </div>

      <!-- Contents -->
      <!-- eslint-disable vue/no-v-html -->
      <div
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

    $('pre').each((_, elm) => {
      $(elm).addClass('my-6')
    })

    $('code').each((_, elm) => {
      $(elm).addClass('border-b border-black mr-1')
    })

    // imgにborder-radius
    $('p img').each((_, elm) => {
      $(elm).addClass('my-6')
    })

    // heading
    $('h2').each((_, elm) => {
      $(elm).addClass(
        'text-2xl text-center font-bold border-t-4 border-b-4 border-black p-3 my-6'
      )
    })

    $('h3').each((_, elm) => {
      $(elm).addClass('text-lg font-bold border-t-4 border-black pt-4')
    })

    $('h4').each((_, elm) => {
      $(elm).addClass('text-base font-bold border-gray-400')
    })

    $('h5').each((_, elm) => {
      $(elm).addClass('text-base font-bold')
    })

    $('blockquote').each((_, elm) => {
      $(elm).addClass('text-normal bg-gray-50 py-7 px-5 mb-5 rounded-lg')
    })

    $('ol').each((_, elm) => {
      $(elm).addClass('py-4')
    })

    $('li').each((_, elm) => {
      $(elm).addClass('text-sm font-medium ml-3 list-decimal list-inside')
    })

    $('a').each((_, elm) => {
      $(elm).addClass('text-blue-500 hover:text-blue-200')
    })

    return {
      ...data,
      body: $.html(),
    }
  },
}
</script>
