<style lang="scss" scoped>
@import '../assets/scss/Colors.scss';

.container {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: $color-timeline-track-bg;
}

.track {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform-origin: left top;
  pointer-events: none;
  background-color: lighten($color-timeline-track, 5%);
  box-shadow: inset 0 1px 0 0 rgba($bluegrey-90, 0.15);
}

.track {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  &:hover {
    opacity: 1;
  }
}

.cursor {
  opacity: 0;
  background-color: $color-cursor;
}

</style>

<template>
  <div class="container">
    <div class="track" v-bind:style="{ transform: trackScaleX }"></div>
    <div class="cursor"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import round from 'lodash/round'

export default {
  computed: {
    trackScaleX () {
      return `scaleX(${round(this.progress, 3)})`
    },
    ...mapGetters([
      'duration',
      'progress',
    ]),
  },
}
</script>
