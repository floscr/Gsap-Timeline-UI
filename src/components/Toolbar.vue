<template>
  <div class="toolbar">
    <ui-button :click="togglePlayPause" :text="isPlaying ? 'pause' :'play_arrow'" ></ui-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Button from './Toolbar/Button.vue'

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
  },

  components: {
    'ui-button': Button,
  },

}
</script>
