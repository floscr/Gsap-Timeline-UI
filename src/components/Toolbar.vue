<template>
  <div class="toolbar">
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
    ]),
  },

  methods: {
    ...mapActions([
      'togglePlayPause'
    ]),
  }

}
</script>
