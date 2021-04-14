<template>
  <div>
    <transition name="button">
      <a
        v-show="btnActive"
        v-scroll-to="'body'"
        class="p-2 bg-gray-100 rounded-full block fixed bottom-24 right-3"
      >
        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          class="w-100 h-100"
        >
          <path fill="black" :d="iconChevronUp" />
        </svg>
      </a>
    </transition>
    <transition name="button">
      <button
        v-show="btnActive"
        class="p-2 bg-gray-100 rounded-full block fixed bottom-10 right-3"
      >
        <svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          class="w-100 h-100"
        >
          <path fill="black" :d="iconMenu" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script>
import { mdiChevronUp, mdiMenu } from '@mdi/js'
export default {
  transition: 'button',
  data() {
    return {
      btnActive: true,
      scroll: 0,
      iconChevronUp: mdiChevronUp,
      iconMenu: mdiMenu,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollWindow)
  },
  methods: {
    scrollWindow() {
      const top = 100
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.btnActive = true
      } else {
        this.btnActive = false
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
/* アニメーション中のスタイル */
.button-leave-active,
.button-enter-active {
  transition: opacity 0.3s;
}

/* 表示アニメーション */
.button-enter {
  opacity: 0;
}
.button-enter-to {
  opacity: 1;
}

/* 非表示アニメーション */
.button-leave {
  opacity: 1;
}
.button-leave-to {
  opacity: 0;
}
</style>
