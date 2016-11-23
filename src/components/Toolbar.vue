<template>
  <div class="toolbar">
    <button class="material-icons" @click="togglePlayPause">{{ playStateText }}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    playStateText () {
      return this.isPlaying ? 'pause' : 'play_arrow'
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
