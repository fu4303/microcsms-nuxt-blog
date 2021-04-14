<template>
  <transition>
    <div v-show="isMenuOpen" class="w-full h-full fixed bottom-0">
      <div class="w-full h-full fixed bottom-0" @click="toggleMenu"></div>

      <div class="w-full fixed bottom-0 bg-white">
        <TableOfContents :toc="toc" />
      </div>
    </div>
  </transition>
</template>

<script>
import TableOfContents from '~/components/TableOfContents'
export default {
  components: {
    TableOfContents,
  },
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
    }
  },
  mounted() {
    // BlogButtonからemitをうける
    this.$nuxt.$on('menuClick', this.toggleMenu)
  },
  beforeDestroy() {
    this.$nuxt.$off('menuClick')
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
  },
}
</script>

<style lang="postcss" scoped>
/* アニメーション中のスタイル */
.v-leave-active,
.v-enter-active {
  transition: opacity 0.3s;
}

/* 表示アニメーション */
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}

/* 非表示アニメーション */
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>
