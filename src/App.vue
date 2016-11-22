<style scoped>
  .container {
    bottom: 0;
    left: 0;
    position: absolute;
  }
</style>

<template>
  <div class="container" id="gsapui">
    <div class="duration">{{ niceProgress }} / {{ duration }}</div>
    <button @click="togglePlayPause">PlayPause</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',

  computed: {
    ...mapGetters([
      'duration',
      'niceProgress',
      'activeTimeline'
    ]),
  },

  methods: {
    ...mapActions([
      'togglePlayPause'
    ]),
  },

}
</script>
