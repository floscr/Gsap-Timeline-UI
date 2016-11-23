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
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: $color-cursor;
}

.value {
  position: fixed;
  top: 0;
  left: 0;
  font-size: 2em;
  color: green;
}

</style>

<template>
  <div
    v-on:mousedown='handleMouseDown'
    @mouseover="mouseOver = true"
    @mouseleave="mouseOver = false"
    class="container"
    >
    <div>{{ value }}</div>
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
import { mapGetters } from 'vuex'
import round from 'lodash/round'

export default {

  data () {
    return {
      cursor: {
        x: 0,
      },
      mouseOver: false,
      isisMouseDown: false,
      initialMouse: null,
      initialValue: 0,
      steps: 1,
      value: 0,
    }
  },

  mounted () {
    document.addEventListener('mousemove', this.handleMouseMove)
  },

  methods: {

    // method to round a number to given decimals
    round (value, decimals) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    },

    constrain (value, min, max, decimals) {
      decimals = typeof decimals !== 'undefined' ? decimals : 0;

      if (min !== undefined && max !== undefined) {
        return this.round(Math.min(Math.max(parseFloat(value), min), max), decimals);
      } else {
        return value;
      }
    },

    handleMouseDown (event) {
      this.isMouseDown = true

      // remember the initial mouse position when the scubbing started
      this.initialMouse = {
        x: event.clientX,
        y: event.clientY
      }

      // remember the initial value
      this.initialValue = this.value;

      // register global event handlers because now we are not bound to the component anymore

      // global mouse up listener
      document.addEventListener('mouseup', this.handleMouseUp)
    },

    handleMouseUp (event) {
      // disable scrubbing
      this.isMouseDown = false

      document.removeEventListener('mouseup', this.handleMouseUp)
    },

    // the actual translation of mouse movement to value change…
    handleMouseMove (event) {
      const mouseX = this.constrain(event.clientX, 0, event.target.offsetWidth, this.decimals);
      if (this.mouseOver) {
        this.cursor.x = mouseX
      }
    },

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
