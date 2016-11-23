<style lang="scss" scoped>
@import './assets/scss/Colors.scss';
@import './assets/scss/Reset.scss';

.container {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  color: white;
  background: $color-ui-bg;
  font-size: 0.8em;

}
</style>

<style>
  .gsapui {
    ::selection,
    ::moz-selection {
      background: $color-selection;
    }
  }
</style>

<template>
  <div class="gsapui container" id="gsapui">
    <timeline-track></timeline-track>
    <toolbar></toolbar>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'

import { mapGetters, mapActions } from 'vuex'

import Track from './components/Track.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'GsapUi',

  mounted () {
    this.setupShortcuts()
  },

  methods: {
    setupShortcuts () {
      Mousetrap.bind('space', () => { this.togglePlayPause() })
      Mousetrap.bind('right', () => { this.skipForward() })
      Mousetrap.bind('left', () => { this.skipBackward() })
    },

    ...mapActions([
      'togglePlayPause',
      'skipForward',
      'skipBackward',
    ]),
  },

  components: {
    'timeline-track': Track,
    Toolbar,
  },

}
</script>
