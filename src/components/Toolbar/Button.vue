<style lang="scss" scoped>
@import '../../assets/scss/Colors.scss';
.button {
  display: block;
  padding: 0.5em 0.8em;
  height: 100%;
  margin: 0;

  border: none;
  background-color: transparent;
  color: $color-ui-font-color;
  outline: none;

  &--is-active {
    color: $color-icon;
    background-color: rgba(white, 0.05);
  }

  &:hover {
    background-color: $color-ui-btn-hover;
    cursor: pointer;
  }

  &:active {
    background-color: $color-ui-btn-focus;
    cursor: pointer;
  }
}
</style>

<template>
  <button
    @click="click"
    :class="{ 'button--is-active': active }"
    class="button material-icons">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
      required: true,
    },
    active: Boolean,
    text: String,
  },
}
</script>
