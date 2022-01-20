<template>

<button @click.stop="submitApptW()" class="bg-gray-500 p-8 inset-0 rounded-md">OK</button>
  <div class="text-gray-800">
  <form action="">

    <h4 v-if="modMode === 'add'">{{dateAdd}}</h4>

  <input v-else type = "text" v-model="date"/>

    <select v-model="meal">
      <option disabled value="">Select One</option>
      <option>Lunch</option>
      <option>Dinner</option>
    </select>
    <input type="text" placeholder="details... (what's being served)" v-model="details"/>
  </form>

  <p>{{_id}}</p>

  </div>
</template>

<script>

import { useMutation } from '@vue/apollo-composable'
import { useMealSelection } from '../../src/composables/meal.js'
import { useCalendar } from '../../src/composables/calendar.js'
import updateAppointment from '../graphql/updateAppointment.mutation.gql'
import getAppointments from '../graphql/getAppointments.query.gql'
import { ref } from 'vue'
import Search from './Search.vue'

  export default {
    setup() {
      let mealSelection = useMealSelection()
      let mealDetails = mealSelection.getMeal
      // debugger
      let modMode = mealSelection.getModMode
      const calendar = useCalendar()
      let meal = ref('')
      let date = ref('')
      let dateAdd = ref(mealSelection.getDate)
      let details = ref('')
      let _id = ref ('')
      let opts = ref('')
      // debugger
      if (modMode.value !== 'add') {
        // debugger
      let md = JSON.parse(mealDetails.value)
      meal = ref(md.meal)
      date = ref(md.date)
      details = ref(md.details)
      _id = ref(md._id)
      }

      // let submitAppt = mealSelection.submitAppt

      function submitApptW() {
        debugger
        if (modMode.value === 'add') {
            console.log('add appt')
            const newAppt = {
              date: dateAdd.value,
              meal: meal.value,
              details: details.value,
              kitchen: '5f431a40ad55d84d8ce55bff',
              user: '5f8127479347aa10f632b87e'
            }

          calendar.createAppt(newAppt)
        }
        else {
        // debugger

        const myAppt = {
          _id: _id.value,
          date: date.value,
          meal:  meal.value,
          details: details.value,
          kitchen: '5f431a40ad55d84d8ce55bff',
          user: '5f8127479347aa10f632b87e'
        }

      calendar.updateAppt(myAppt)
      // debugger
      // alert(date.value)
        }


        // calendar.submitAppt(myAppt)
      }

        return {
          submitApptW,
          meal,
          dateAdd: mealSelection.getDate,
          date,
          details,
          _id,
          opts,
          modMode
      }
    },
    components: {
      // Search
    }
  }
</script>

<style lang="scss" scoped>

</style>
