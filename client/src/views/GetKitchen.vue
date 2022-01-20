<template>
  <div>
    <div class="bg-gray-200 h-full w-full">
      <h1>This is the Get Kitchen page..</h1>
      <!-- <button @click="handleGetKitchens">getKitchens</button> -->
    </div>



     <Search/>
      <Calendar2/>

    </div>

</template>

<script>
import Search from '../../src/components/Search'
import Calendar2 from '../../src/components/Calendar2'
import { useCalendar } from '../composables/calendar.js'
import { ref } from 'vue'

export default {
  setup() {
    let calendar = useCalendar()
    let calendarKey = ref(0)
    calendarKey = calendar.calendarKeyGetter

    return {
      calendarKey
    }

  },

  name: "GetKitchen",
  components: {
    Search,
    Calendar2
  },
  // data() {
  //   return {
  //     kitchen: {
  //       name: "",
  //       address: "",
  //       knives: false,
  //       walkin: false,
  //       utensils: false
  //     }
  //   };
  // },
  // ** USE ROUTER PARAMS (:id) TO GET FROM THIS
  // ** COMPONENT TO KITCHEN DETAILS AND ITS CALENDAR.
  methods: {

  },

};
</script>

<style>
.modal-view {
  @apply relative flex flex-row  bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
    // var payload = {
    //       kitchen: this.selectedKitchen._id,
    //       dates: [this.selectedDate],
    //       meals: [this.selectedMeal],
    //       user: this.user._id,
    //       details: [this.details]
    //     }

    // const showMeal = computed(() => {
    //   debugger
    //   alert (meal.showMeal)
    //   return meal.showMeal
    // })
