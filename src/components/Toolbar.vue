<template>
  <div class="toolbar">
    <button class="material-icons" @click="togglePlayPause">{{ isPlaying ? 'pause' :'play_arrow' }}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
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
