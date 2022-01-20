<template>

  <!-- <div class="relative flex flex-col justify-start lg:flex-row h-auto bg-white rounded-lg shadow-lg m-3 cursor-pointer" :key="forceRerender"> -->
    <!-- <div class="w-2/5"> -->
    <!-- <div v-for="dayDetail in dayDetails" :key="dayDetail"> -->
<!-- <p>{{dayDetail}}</p> -->
<!-- <p>{{dayDetails}}</p> -->
<!-- <p @click.prevent="">{{dayDetails}}</p> -->

   <button @click="showDetails(dayDetails)">{{dayDetails}}</button>
        <!-- <button  v-for="dayDetail in dayDetails" :key="dayDetail" @click="showDetails(dayDetails)">
        <p>{{dayDetail}}</p>
        </button> -->

    <!-- </div> -->

    <!-- <p>{{mealState}}</p>
      <p>{{mainCourse}}</p> -->
    <!-- </div> -->

  <!-- </div> -->

</template>

<script>
import router from '@/router'
import { ref } from 'vue'
import { useMealSelection } from '../../src/composables/meal.js'
import { useCalendar } from '../../src/composables/calendar.js'

export default {
  setup(dayDetails) {

    let mealSelection = useMealSelection()
    let calendar = useCalendar()


    const showDetails = (dayDetails) => {
      // debugger
      // alert(dayDetails)
      // mealSelection.setModMode('edit')
      mealSelection.setMeal(dayDetails)
      // debugger
    }

    return {
      showDetails
      // forceRerender: calendar.forceRerender()

    }
},
  props: {
    dayDetails: {
      type: Object,
      required: true
    }
  },

  name: "CardDay",
  components: {

  }

};
</script>
