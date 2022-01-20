<template>
<h1>{{mText}} {{yr}}</h1>
<p>----appointments----</p>
<br>
<p>{{appointments}}</p>
<br>
<p>sa{{showAppointments}}</p>
    <p>{{modalVisible}}</p>
    <button @click="switchMo('prev')">Prev</button>
    <button @click="switchMo('next')">Next</button>
        <button @click="readCache()">readCache</button>
        <p>{{cachedAppts}}</p>


     <div class="grid grid-flow-row grid-cols-7 grid-rows-7 gap-4"
     :key="calendarKey">
      <div class="bg-white rounded-lg shadow-lg"
      v-for="calDay in calDays" :key="calDay.day">
        <button @click ="addAppt(calDay.day)">{{calDay.day}}</button>
            <div v-if="showAppointments">
            <!-- <div v-for="appt in result.getAppointments.filter(item => item.date === `${yr}-${mo}-${calDay.day}`)" :key="appt._id"> -->
            <div v-for="appt in appointments.filter(item => item.date === `${yr}-${mo}-${calDay.day}`)" :key="appt._id">
              <CardDay v-bind:dayDetails="appt"/>
              <!-- <p>{{appt}}</p> -->
            </div>
        </div>

      </div>
  </div>

    <div v-if="modalVisible ===  true">
    <ModalView>
      <Meal class="z-50"/>
    </ModalView>
      </div>
</template>

<script>
import Meal from '../../src/components/Meal'
import ModalView from '../../src/components/ModalView.vue'
import CardDay from '../../src/components/CardDay'
import { ref, onServerFetch, computed, watchEffect, watch } from 'vue'
import { useMealSelection } from '../../src/composables/meal.js'
import { useCalendar } from '../../src/composables/calendar.js'
import { result, useQuery } from '@vue/apollo-composable'
import getAppointments from '../graphql/getAppointments.query.gql'
import gql from 'graphql-tag'
import  { apolloClient } from '../main.js'
export default {
setup(props, context) {
  let calendar = useCalendar()
  // let appts = ref([])
  const mealSelection = useMealSelection()
  calendar.setInitialMo()
  calendar.setInitialYr()
  // let yr = ref('')
  let reload = false
  let cardDayKey = ref(0)
  let calendarKey = ref(0)
  let yr = ref(calendar.yrGetter)
  let mo = ref(calendar.moGetter)
  let apptsFrUseResult = ref(null)
  let calDays = ref({})
   let appointments = ref([])
   let showAppointments = ref(false)
const fetchPolicy = ref('cache-first')
let datesArr = calendar.createQueryDatesArr(mo.value, yr.value)
let mosSearched = new Set()

    const addAppt = (day) => {
      // debugger
      mealSelection.setYear(calendar.yrGetter)
      mealSelection.setMonth(calendar.moGetter)
      mealSelection.setDay(day)
      mealSelection.setDate()
      mealSelection.setModMode('add')
      // const dummyAppt = {appt: {date: "d date", meal: "d meal", details: "d details", kitchen: "d kitchen", user: "d user" }}
      // const m = mealSelection.setMeal(dummyAppt)
    mealSelection.makeModalVisible()
      // console.log(m)
      let mm = mealSelection.getModMode
      console.log(mm)
    }

  const hideModal = function () {
    mealSelection.hideModal()
  }
  calendar.setUpCalendarSquares()


    const READ_APPTS_CACHE_ID = gql`
  query readApptsCacheId ($id: ID!) {
    appts @client (_id: $id) {
        _id
        meal
        details
    }
  }
  `

  const readApptsQuery = gql `
    {
      Appointments @client {
        date
        meal
        details
      }
    }
  `

  let cachedAppts = ref('initial value')

  const READ_APPTS_CACHE_DATE = gql`
query getAppointments($date: [String!]) {
  getAppointments @client (date: $date)
    {
        _id
        kitchen
        user
        date
        meal
        details
      }
}
  `
  const readCache = () => {
    debugger
    console.dir(apolloClient)
    console.dir(Object.entries(apolloClient.cache.data.data))
    const entries = Object.entries(apolloClient.cache.data.data)
    const fe = entries.filter(k => k[0].substring(0,11) === 'Appointment')
    console.log(fe)
    const fem = fe.filter(i => i.substring(5,8) === mo.value)
    console.log(fem)
    // const updatedAppts = apolloClient.cache.data.filter(a => a.Appointment)
//     datesArr = calendar.createQueryDatesArr('01', '2022')
//     cachedAppts.value  = apolloClient.cache.readQuery({
//       query: READ_APPTS_CACHE_ID,
//       variables: {
//         _id: "61d28e88227ace4a474e8640"
//       }
//     })
// debugger

  }

  const switchMo = (direction) => {
    // debugger
    calendar.diffMo(direction)
    datesArr = calendar.createQueryDatesArr(mo.value, yr.value)
    runQuery()
  }

calendar.setUpCalendarSquares()

const runQuery = () => {
// debugger
const { result, variables, onResult } = useQuery(getAppointments,
      { date: datesArr },
      { fetchPolicy: 'cache-first' },
      { options: {
          resultCaching: false
        }
      }
    )


// appointments.value = useResult(result)
watchEffect(()  => {
  // debugger

  console.log(result.value)
  if (result.value) {
    // debugger
    showAppointments.value = true
    appointments.value = result.value.getAppointments
  }
})
}

runQuery()



// const appointments = computed(() =>result)

// watch(result, () => {
//   if (!result){
//   return;
// }
//   appointments.value = result
//   console.log(appointments.value)
// }, {
//   immediate: true
// }
// )


    return {
      calDays: calendar.calDaysGetter,
      yr,
      mo,
      mText: calendar.moTextGetter,
      modalVisible: mealSelection.getModalVisibility,
      hideModal,
      cardDayKey,
      calendarKey,
      addAppt,
      switchMo,
      apptsFrUseResult,
      result,
      appointments,
      showAppointments,
      forceRerender: calendar.forceRerenderGetter,
      readCache,
      cachedAppts
    }
},
  name: "GetKitchen",
  components: {
    CardDay,
    ModalView,
    Meal
  },
  methods: {
    update() {
      debugger
      this.$forceUpdate()
    },

  readCache2() {
    const READ_APPTS_CACHE_DATE = gql`
    query readApptsCacheDate($date: String!) {
    appts(date: $date) {
        date
        meal
        details
    }

  }
  `

    const READ_APPTS_CACHE_ID = gql`
      query readApptsCacheId($id: ID!) {
      appts(_id: $id) {
        _id
        meal
        details
    }

  }
  `
    debugger
    console.dir(apolloClient)

    let cachedAppts2  = apolloClient.readQuery({
      query: READ_APPTS_CACHE_ID,
      variables: {
        _id: "61d28e88227ace4a474e8640"
      }
    })

    console.log(cachedAppts2)
  }
  }

  }
</script>

<style lang="scss" scoped>

</style>
