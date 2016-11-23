<template>
  <div class="toolbar">
    <div class="duration">{{ niceProgress }} / {{ duration }}</div>
    <button @click="togglePlayPause">{{ playStateText }}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    playStateText () {
      return this.isPlaying ? 'Pause' : 'Play'
    },
    ...mapGetters([
      'isPlaying',
      'duration',
      'niceProgress',
      'activeTimeline'
    ]),
  },

  methods: {
    ...mapActions([
      'togglePlayPause'
    ]),
  }

}
</script>
