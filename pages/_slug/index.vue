<template>
  <main class="leading-normal tracking-normal">
    <!-- Container -->
    <div class="container w-full md:max-w-3xl mx-auto pt-20">
      <div class="w-full px-2 md:px-2 text-md text-gray-800 leading-normal">
        <!--Title-->
        <div class="pl-3 pb-3">
          <h1
            class="font-bold font-sans break-normal pt-6 pb-2 text-2xl md:text-2xl"
          >
            {{ emoji }} {{ title }}
          </h1>
          <p class="text-xs font-normal text-gray-600">
            更新日: {{ new Date(publishedAt).toLocaleDateString() }}
          </p>
          <p class="text-blue-400">{{ category && category.name }}</p>
        </div>

        <!-- Contents -->
        <!-- eslint-disable vue/no-v-html -->
        <div class="p-3 text-sm bg-white rounded-xl" v-html="body"></div>
        <!-- eslint-enable -->
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'
import hljs from 'highlight.js'

export default {
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
      $(elm).addClass('hljs rounded-lg text-sm')
    })

    $('pre').each((_, elm) => {
      $(elm).addClass('my-6')
    })

    // imgにborder-radius
    $('p img').each((_, elm) => {
      $(elm).addClass('rounded-lg my-6')
    })

    // heading
    $('h1').each((_, elm) => {
      $(elm).addClass('text-2xl font-bold bg-gray-200 p-3 rounded-lg my-6')
    })

    $('h2').each((_, elm) => {
      $(elm).addClass('text-xl font-bold border-l-4 border-blue-400 pl-2')
    })

    $('h3').each((_, elm) => {
      $(elm).addClass('text-lg font-bold border-gray-400')
    })

    $('h4').each((_, elm) => {
      $(elm).addClass('text-base font-bold')
    })

    return {
      ...data,
      body: $.html(),
    }
  },
}
</script>
