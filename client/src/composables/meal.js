import { ref, computed } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import updateAppointment from '../graphql/updateAppointment.mutation.gql'
import createAppointments from '../graphql/createAppointments.mutation.gql'
import getAppointments from '../graphql/getAppointments.query.gql'

// wrap everything in a function to make scope work.

const state = ref({
  meal: { _id: 1 },
  newMeal: {},
  modalVisible: false,
  modMode: '',
  date: '',
  year: '',
  month: ''
})

export const useMealSelection = function () {
  const getModalVisibility = computed(() => state.value.modalVisible)
  const getMeal = computed(() => state.value.meal)
  const getModMode = computed(() => state.value.modMode)
  const getDate = computed(() => state.value.date)

  const setYear = (yr) => {
    state.value.year = yr
  }
  const setMonth = (mo) => {
    state.value.month = mo
  }
  const setDay = (day) => {
    state.value.day = day
  }

  const setDate = () => {
    state.value.date = `${state.value.year}-${state.value.month}-${state.value.day}`
  }
  const setMeal = (obj) => {
    // debugger
    state.value.meal = JSON.stringify(obj)
    setDate()
    state.value.modMode = 'edit'
    state.value.modalVisible = true

    return state.value.meal
  }

  const makeModalVisible = () => {
    state.value.modalVisible = true
  }
  const setModMode = (mode) => {
    // debugger
    state.value.modMode = mode
  }
  const setNewMeal = (obj) => {
    state.value.newMeal = JSON.stringify(obj)
    return state.value.meal
  }

  function closeModal () {
    state.value.modalVisible = false
  }

  const calDays = []

  return {
    getModalVisibility,
    getModMode,
    closeModal,
    setMeal,
    getMeal,
    setNewMeal,
    calDays,
    setModMode,
    makeModalVisible,
    setDay,
    getDate,
    setYear,
    setMonth,
    setDate
  }
}

export default useMealSelection
