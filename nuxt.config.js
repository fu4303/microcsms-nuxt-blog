import axios from 'axios'
require('dotenv').config()
const { GOOGLE_ANALYTICS_ID, GTM_ID, X_API_KEY } = process.env

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    X_API_KEY,
    GOOGLE_ANALYTICS_ID,
    GTM_ID,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'codenote',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'copyright', content: '2021 codenote.com' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** @nuxtjs/pwa Configuration
   ** https://github.com/nuxt-community/pwa-module
   */
  manifest: {
    name: 'codenote',
    lang: 'ja',
    short_name: 'codenote',
    title: 'codenote',
    'og:title': 'codenote',
    description: '日々学んだことを書き留めるCodenoteです。',
    'og:description': '日々学んだことを書き留めるCodenoteです。',
    theme_color: '#272727',
    background_color: '#ffffff',
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

  optimizedImages: {
    optimizeImages: true,
    // optimizeImagesInDev: true, // 開発環境でも画像圧縮
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
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/pwa', '@nuxtjs/gtm'],

  // Google Tag Maneger
  gtm: {
    id: process.env.GTM_ID,
    pageTracking: true,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    debug: true, // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
    gtm: {
      id: process.env.GTM_ID,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { analyze: false },

  generate: {
    async routes() {
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧のページング
      const pages = await axios
        .get(`https://shunyadezain.microcms.io/api/v1/blog?limit=0`, {
          headers: { 'X-API-KEY': process.env.X_API_KEY },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

      const categories = await axios
        .get(`https://shunyadezain.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': process.env.X_API_KEY },
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
                  'X-API-KEY': process.env.X_API_KEY,
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
