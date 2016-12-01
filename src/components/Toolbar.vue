<style scoped>
  .toolbar {
    width: 100%;
    display: flex;
  }
</style>

<template>
  <div class="toolbar">

    <ui-button :click="rewind" text="skip_previous"></ui-button>
    <ui-button :click="skipBackward" text="fast_rewind"></ui-button>
    <ui-button :click="togglePlayPause" :text="isPlaying ? 'pause' :'play_arrow'"></ui-button>
    <ui-button :click="skipForward" text="fast_forward"></ui-button>

    <ui-button
      :click="toggleRestoreTimelineOption"
      :active="restoreTimelineIsEnabled"
      text="restore">
    </ui-button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Button from './Toolbar/Button.vue'

export default {

  computed: {
    ...mapGetters([
      'restoreTimelineIsEnabled',
      'isPlaying',
    ]),
  },

  methods: {
    ...mapActions([
      // Option Actions
      'toggleRestoreTimelineOption',

      // Timeline Actions
      'togglePlayPause',
      'skipForward',
      'skipBackward',
      'rewind',
    ]),
  },

  components: {
    'ui-button': Button,
  },

}
</script>
