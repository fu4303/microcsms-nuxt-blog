import axios from 'axios'

export const state = () => ({
  items: [],
})

export const getters = () => ({
  items: (state) => state.items,
})

export const mutations = () => ({
  setItems(state, { items }) {
    state.items = items
  },
})

export const actions = () => ({
  async fetchItems({ $config, commit }) {
    await axios
      .get('https://shunyadezain.microcms.io/api/v1/blog', {
        headers: { 'X-API-KEY': $config.apiKey },
      })
      .then((res) => {
        commit('setItems', { items: res.data })
      })
  },
})
