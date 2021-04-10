<template>
  <div>
    <Header class="absolute top-0 z-100" />
    <transition name="page">
      <Nuxt />
    </transition>

    <Footer />
    <!-- <Overlay class="fixed top-0 right-0 z-200" /> -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import Overlay from '@/components/Overlay.vue'
export default {
  components: {
    Header,
    Footer,
    // Overlay,
  },
  scrollToTop: true,
}
</script>

<style>
.page-enter,
.page-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.page-enter-active {
  transition: all 0.5s ease;
}
.page-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
