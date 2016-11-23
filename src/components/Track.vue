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
}

.cursor {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: $color-cursor;
}

</style>

<template>
  <div
    @mousedown='startScrubbing'
    @mouseover="mouseOver = true"
    @mouseleave="mouseOver = false"
    class="container"
    >
    <div
      class="track"
      v-bind:style="{ transform: trackScaleX }"
      >
    </div>
    <div
    class="cursor"
    v-bind:style="{ transform: cursorX, opacity: mouseOver ? 1 : 0 }"
    >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import round from 'lodash/round'

export default {

  data () {
    return {
      cursor: {
        x: 0,
      },
      mouseOver: false,
      mouseDown: false,
      isisMouseDown: false,
      initialMouse: null,
      initialValue: 0,
      steps: 1,
      value: 0,
      htmlEl: document.getElementsByTagName('html')[0],
    }
  },

  mounted () {
    document.addEventListener('mousemove', this.handleMouseMove)
  },

  methods: {

    constrain (value, min, max, decimals) {
      // decimals = typeof decimals !== 'undefined' ? decimals : 0;
      if (min !== undefined && max !== undefined) {
        return round(Math.min(Math.max(parseFloat(value), min), max), 2);
      } else {
        return value;
      }
    },

    startScrubbing (event) {
      this.scrub(event)
      document.addEventListener('mouseup', this.stopScrubbing)
      this.mouseDown = true
      this.htmlEl.style.cursor = 'col-resize'
    },

    stopScrubbing (event) {
      this.mouseDown = false
      document.removeEventListener('mouseup', this.stopScrubbing)
      this.htmlEl.style.cursor = 'default'
    },

    scrub (event) {
      const progress = round(this.cursor.x / this.$el.offsetWidth, 3)
      this.setTimelineProgress(progress)
    },

    // the actual translation of mouse movement to value change…
    handleMouseMove (event) {
      const mouseX = this.constrain(event.clientX, 0, this.$el.offsetWidth, this.decimals);
      if (this.mouseDown || this.mouseOver) {
        this.cursor.x = mouseX
      }
      if (this.mouseDown) {
        this.scrub(event)
      }
    },

    ...mapActions([
      'setTimelineProgress',
    ]),

  },

  computed: {
    cursorX () {
      return `translateX(${this.cursor.x}px)`
    },

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
