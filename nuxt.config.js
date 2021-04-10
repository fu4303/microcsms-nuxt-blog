import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'codenote',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'copyright', content: '2021 codenote.com' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'page',
      })
      routes.push({
        path: '/category/:categoryId/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'category',
      })
    },
  },

  tailwindcss: {
    // cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    jit: false,
    exposeConfig: false,
    config: {},
  },

  // Google Tag Maneger
  gtm: {
    id: 'GTM-XXXXXXX',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/styles/tailwind.css',
    '~/node_modules/highlight.js/styles/dark.css', // hilight theme
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-svg-loader', '@nuxtjs/pwa', '@nuxtjs/gtm'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    async routes() {
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧のページング
      const pages = await axios
        .get(`https://shunyadezain.microcms.io/api/v1/blog?limit=0`, {
          headers: { 'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e' },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

      const categories = await axios
        .get(`https://shunyadezain.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e' },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id)
        })

      // カテゴリーページのページング
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios
            .get(
              `https://shunyadezain.microcms.io/api/v1/blog?limit=0&filters=category[equals]${category}`,
              {
                headers: {
                  'X-API-KEY': 'b710df0b-9a63-4cd7-aed4-48a7ac8b766e',
                },
              }
            )
            .then((res) =>
              range(1, Math.ceil(res.data.totalCount / 9)).map((p) => ({
                route: `/category/${category}/page/${p}`,
              }))
            )
        )
      )

      // 2次元配列になってるのでフラットにする
      const flattenCategoryPages = [].concat.apply([], categoryPages)
      return [...pages, ...flattenCategoryPages]
    },
  },
}
