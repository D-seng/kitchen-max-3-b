<template>
  <label class="text-left" v-if="label">{{ label }}</label>
  <input
    :placeholder="label"
    class="bg-gray-200 border-solid border-1 border-gray-900 shadow-inner"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
