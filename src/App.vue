<style scoped>
  .duration {
    display: block;
  }
</style>

<template>
  <div id="gsapui">
    Hello world
    <div class="duration">{{ niceProgress }} / {{ duration }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'duration',
      'niceProgress',
      'activeTimeline'
    ]),
  },
}
</script>
