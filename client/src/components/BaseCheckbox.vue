<template>
  <label v-if="label"
    >{{ label }}

    <input
      type="checkbox"
      :checked="modelValue"
      v-model="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
