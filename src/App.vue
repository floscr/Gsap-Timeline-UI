<style lang="scss" scoped>
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
import Mousetrap from 'mousetrap'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',

  mounted () {
    this.setupShortcuts()
  },

  computed: {
    ...mapGetters([
      'duration',
      'niceProgress',
      'activeTimeline'
    ]),
  },

  methods: {
    setupShortcuts () {
      Mousetrap.bind('space', () => { this.togglePlayPause() })
    },

    ...mapActions([
      'togglePlayPause'
    ]),
  },

}
</script>
