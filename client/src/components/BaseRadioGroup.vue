<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      'mr-4': !vertical
    }"
  >
    <BaseRadio
      class="ml-1"
      :label="option.label"
      :value="option.value"
      :name="groupName"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    groupName: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    vertical: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
