<template>
  <div>
    <div>カテゴリー</div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
}
</script>
