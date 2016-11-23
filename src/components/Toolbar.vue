<template>
  <div class="toolbar">
    <div class="duration">{{ niceProgress }} / {{ duration }}</div>
    <button @click="togglePlayPause">PlayPause</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

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
  }

}
</script>
