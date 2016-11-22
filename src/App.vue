<style scoped>
  .duration {
    position: absolute;
  }
</style>

<template>
  <div id="gsapui">
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
