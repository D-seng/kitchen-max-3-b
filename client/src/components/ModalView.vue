<template>

  <div class="fixed top-0 left-0 w-auto h-auto bg-black opacity-25 inset-0 z-2"></div>
    <div class="absolute inset-0 flex justify-center items-center" @click="closeModal()">
      <div class="absolute bg-white p-8 rounded-md opacity-100" @click.stop>
        <button @click.stop="closeModal()" class="bg-red-500 p-8 inset-0 rounded-md">Cancel</button>

        <div>
          <slot />
        </div>
      </div>
    </div>

</template>

<script>
  // import { useKeydown } from '../composition/useKeydown';
import { ref } from 'vue'
import { useMealSelection } from '../../src/composables/meal.js'

  export default {
    setup(){
      let mealSelection = useMealSelection()
      const closeModal =  mealSelection.closeModal
      // const mealState = mealSelection.mealState

      const submit = function() {
        alert('submit')
      }
      // let meal = useMeal()
      // debugger
      // console.log(meal)
      // const closeMeal = () => meal.closeMeal()

      return {
        closeModal,
        submit
      }
    },
    components: {

    },
    props: {
      // closeModal: {
      //   type: Function,
      //   required: true
      // }
    }
  }
</script>

<style scoped>

</style>
