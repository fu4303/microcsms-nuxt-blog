<template>
  <div>
    <transition>
      <a
        v-show="btnActive"
        v-scroll-to="'body'"
        class="p-2 bg-gray-100 rounded-full block fixed bottom-20 right-3"
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
  </div>
</template>

<script>
import { mdiChevronUp } from '@mdi/js'
export default {
  data() {
    return {
      btnActive: true,
      scroll: 0,
      iconChevronUp: mdiChevronUp,
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
