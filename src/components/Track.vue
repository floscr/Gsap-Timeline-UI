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
  <div
    v-on:mousedown='handleMouseDown'
    class="container"
    >
    <div
      class="track"
      v-bind:style="{ transform: trackScaleX }"
      >
      {{ value }}
    </div>
    <div class="cursor"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import round from 'lodash/round'

export default {

  data () {
    return {
      isMouseDown: false,
      initialMouse: null,
      value: 0
    }
  },

  mounted () {
    this.elements.timeline.addEventListener('mouseover', () => { this.mouseIsOver = true; });
    this.elements.timeline.addEventListener('mousemove', evt => { this.currentX = evt.clientX; });
  },

  methods: {

    handleMouseDown (event) {
      this.mousedown = true

      // remember the initial mouse position when the scubbing started
      this.initialMouse = {
        x: event.clientX,
        y: event.clientY
      }

      // remember the initial value
      this.initialValue = this.value;

      // register global event handlers because now we are not bound to the component anymore
      document.addEventListener('mousemove', this.handleMouseMove)

      // global mouse up listener
      document.addEventListener('mouseup', this.handleMouseUp)
    },

    handleMouseUp (event) {
      // disable scrubbing
      this.mouseDown = false;

      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    },


    // the actual translation of mouse movement to value change…
    handleMouseMove (event) {
      if (this.mouseDown) {
        var newValue = this.initialValue + ((event.clientX - this.initialMouse.x) * this.steps)

        // constrain the value to the min/max
        this.value = this.constrain(newValue, this.min, this.max, this.decimals);
      }
    },

  },

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
