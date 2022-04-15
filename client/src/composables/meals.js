import { ref, computed } from 'vue'

const state = ref({ meal: {} })

function setMeal(meal) {
    state.value.meal = meal
}

async function loadMeals(id) {
    // const post = await fetchPost(id)
    const meal = null
    setMeal(meal)
}

const getMeal = computed(() => state.value.meal)

export { loadMeals, getMeal }
