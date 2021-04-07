<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <!-- eslint-disable vue/no-v-html -->
    <div class="post" v-html="body"></div>
    <!-- eslint-enable -->
  </main>
</template>

<script>
import axios from 'axios'
import Prism from '~/plugins/prism'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://shunyadezain.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e' },
      }
    )
    return data
  },
  mounted() {
    Prism.highlightAll()
  },
}
</script>
