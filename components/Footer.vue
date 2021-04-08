<template>
  <footer class="py-6 mx-auto">
    <small class="text-center block">© {{ getYear }} codenote</small>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: '',
    }
  },
  computed: {
    getYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
