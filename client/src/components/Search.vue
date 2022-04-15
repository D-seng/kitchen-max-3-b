<template>
    <div>
        <button
            v-if="searchVisibleCity || searchVisibleKitchen"
            @click.prevent="handleHideSearchDrops"
            class="fixed h-full w-full top-0 right-0 bottom-0 left-0 opacity-50 cursor-auto"
        ></button>
        <button @click="handleK">kitchens</button>
        <!-- <p>{{result}}</p> -->
        <!-- <p>{{this.kitchens}}</p> -->
        <!-- <p>{{this.cities}}</p> -->
        <!-- <button @click.prevent="handleLogKitchens">log kitchens</button> -->
        <form class="flex flex-col lg:flex-row">
            <label>
                City
                <select multiple v-model="selectedCities"
                    class="shadow block bg-yellow-100 border-gray-400 border-2 rounded-lg"
                >
                    <option v-for="c in cities" :key="c" :value="c">
                        {{ c }}
                    </option>
                </select>
            </label>

            <!-- <label>
        City
        <input
          class="shadow block z-10"
          type="search"
          placeholder="City name"
          v-model="searchStringCity"
          @click.prevent="handleSearchVisibleCity"
          v-on:keydown.tab="handleTabCity"
          v-on:keydown.down="handleDownCity"

        />

         <div class="" v-if="this.searchVisibleCity"
          :class="{ 'bg-yellow-100 border-gray-400 border-2 rounded-lg': filteredKitchens }"
        >
          <ul class="list-reset">
            <li v-for="c in this.filteredCities" :key="c">{{c}}</li>
          </ul>
        </div>
  </label> -->

            <label>
                Minimum burners
                <select v-model="burners" class="shadow block">
                    <option v-for="n in 50" :key="n" :value="n">{{ n }}</option>
                </select>
            </label>
            <label class="block">
                When

                <br />
                <!-- <v-date-picker
        class="z-10"
          mode="multiple"
          :value="null"
          v-model="dates"
          color="red"
        ></v-date-picker> -->
                <!-- <DateTimePicker/> -->
            </label>
            <!-- <p>{{searchVisibleKitchen}}</p>
        <p>{{filteredKitchens}}</p> -->
            <label>
                Kitchens

                <div class="shadow block z-10">
                    <input
                        type="text"
                        placeholder="Kitchen name"
                        v-model="searchQuery"
                        @click.prevent="selectQuery"
                    />
                    <button @click.prevent="clearSearchQuery">X</button>
                </div>

                <div v-if="searchQuery && unselectedQuery === true">
                    <ul class="list-reset">
                        <li v-for="k in kitchens" :key="k._id">
                            <button
                                class="hover:bg-yellow-200"
                                v-if="
                                    searchQuery.toLowerCase() ===
                                    k.name
                                        .toLowerCase()
                                        .substring(0, searchQuery.length)
                                "
                                @click.prevent="selectKitchen(k.name)"
                            >
                                {{ k.name }}
                            </button>
                        </li>
                    </ul>
                </div>
            </label>

            <!-- <ul class="w-1/4">
        <div v-for="k in filteredKitchens" :key="k._id">
          <div v-if="k.city === city" >
          <p>{{k.city}}{{city}}</p>

           <Card :kitchen="k"/>


          </div>
        </div>
      </ul> -->
            <button @click.prevent="handleSearch">Search</button>
        </form>

        <!-- <ul class="grid grid-flow-row grid-cols-3 gap-1"> -->
        <button @click.prevent="showDates">show dates</button>
    </div>
</template>

<script>
// import { utilComputed } from '@/store/helpers';
// import { mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
import { isNullableType } from 'graphql'
import useKitchens from '../composables/kitchens'
import { ref, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable'
// import GetKitchens from '../graphql/getKitchens.query.gql'
// import DateTimePicker from '@/components/DateTimePicker.vue'
const GET_ALL_KITCHENS = gql`
    query GetKitchens {
        getKitchens {
            _id
            name
            address
            knives
            walkin
            utensils
            rate
            imageUrl
            burners
            city
        }
    }`

export default {
    setup() {
        let burners = ''
        let searchStringKitchen = ref('')
        let searchStringCity = ''
        let searchVisibleKitchen = ref(false)
        let searchVisibleCity = false
        let calVisible = false
        let k = ''
        let city = ''
        let dates = []
        let searchQuery = ref('')
        let kitchens = ref([])

        let showCal = false
        let cities = ref([])
        let selectedKitchen = ref('')
        let selectedCities = ref([])
        let unselectedQuery = ref(true)

        const { result, onResult } = useQuery(GET_ALL_KITCHENS)

         onResult(queryResult => {
           console.log(queryResult.data)
           debugger
           kitchens.value = queryResult.data.getKitchens
           const arrCities  = kitchens.value.map(k => k.city)
           cities.value = new Set(arrCities)
         })
        const handleTabKitchen = () => {
            // alert('tab')
            searchString = filteredKitchens.value[0].name
            searchVisibleKitchen = false
        }

        const handleSearchVisibleCity = () => {
            searchVisibleCity = true
        }

        const handleHideSearchDrops = () => {
            searchVisibleCity = false
            searchVisibleKitchen = false
        }
        const handleLogKitchens = () => {
            console.log(kitchens)
        }

        const handleShowCal = () => {
            // alert('aas')
            showCal = true
        }
        const handleHideCal = () => {
            // alert('aas')
            showCal = false
        }

        const handleSearchVisibleKitchen = () => {
            searchVisibleKitchen.value = true
        }

        const selectKitchen = (kname) => {
            searchQuery.value = kname
            unselectedQuery.value = false
        }

        const selectQuery = () => {
            unselectedQuery.value = true
        }

        const clearSearchQuery = () => {
            searchQuery.value = ''
        }
        //   const filteredKitchens  = computed(() => {
        //     let fk = kitchens.value.filter((kitchen) => {
        //       // debugger
        //       let ss = searchQuery.value.toLowerCase()
        //       let incl =  kitchen.name.toLowerCase().substring(0, ss.length) === ss
        //       return incl
        // })
        // return fk})

        return {
            cities,
            searchQuery,
            kitchens,
            selectKitchen,
            unselectedQuery,
            selectQuery,
            clearSearchQuery,
            selectedCities
        }
    },
    components: {
        // Card,
        // DateTimePicker
    },

    mounted() {
        // this.$store.dispatch("getKitchens");
    }
}
</script>

<style lang="scss" scoped></style>

// @input.prevent="handleSearchVisibleKitchen" // v-on:keydown.tab="handleTab"
// v-on:keydown.down="handleDown"
