<template>
    <router-link to="/kitchendetail">
        <div
            @click="handleKitchenDetail"
            class="relative flex flex-col lg:flex-row h-auto bg-white rounded-lg shadow-lg m-3 cursor-pointer"
        >
            <div class="w-2/5">
                <p
                    v-if="kitchen.new"
                    class="absolute m-1 p-1 z-10 text-gray-900 text-xs font-semibold uppercase bg-yellow-300 rounded shadow-xl"
                >
                    NEW!
                </p>
                <cld-image :publicId="kitchen.imageUrl[1]">
                    <cld-transformation
                        width="400"
                        height="400"
                        gravity="face"
                        crop="thumb"
                    />
                    <cld-transformation
                        width="200"
                        gravity="face"
                        crop="thumb"
                    />
                </cld-image>
            </div>

            <div class="p-2">
                <!-- <p>{{this.searchCity}}</p> -->
                <h2
                    class="text-gray-600 text-sm lg:text-base uppercase font-semibold tracking-wide"
                >
                    {{ kitchen.name }}
                </h2>
                <h4
                    class="font-semibold text-lg lg:text-xl leading-tight truncate"
                >
                    {{ kitchen.address }}
                </h4>
                <h4
                    class="font-semibold text-lg lg:text-xl leading-tight truncate"
                >
                    {{ kitchen.city }}
                </h4>

                <h2
                    class="mt-2 text-gray-600 text-sm lg:text-base font-semibold tracking-wide"
                >
                    {{ kitchen.burners }} burners
                </h2>
                <h2
                    class="text-gray-600 text-sm lg:text-base font-semibold tracking-wide"
                >
                    {{ rate }}/hr
                </h2>
            </div>
        </div>
    </router-link>
</template>

<script>
import Dinero from '../../node_modules/dinero.js'
// import { utilComputed } from '../store/helpers.js';

// burners: 8,
//         counterspace: 25,
//         imageUrl: require('@/assets/chef.png'),
//         imageAlt: 'alternate kitchen image',
//         rate: 100,
//         name: 'Ollie\'s Place',
//         address: '4544 Wakasha Blvd., Los Angles',
//         reviewCount: 5,
//         rating: 2,
//         equipment: ['mixers', 'limited walk-in', 'utensils'],
//         dishwasherAvailable: true
export default {
    props: {
        kitchen: {
            type: Object,
            required: true
        },
        searchCity: {
            type: String,
            required: false
        }
        // image: {
        //   type: String,
        //   default: "@/assets/chef.png",
        //   validator: propValue => {
        //     const hasAssetsDirectory = propValue.indexOf("/assets") > -1;
        //     return hasAssetsDirectory;
        //   }
        // }
    },
    data() {
        return {
            title: 'This is the card title',
            imageLink: '../assets/chef.jpg'
        }
    },

    name: 'Card',
    methods: {
        handleKitchenDetail() {
            // debugger
            // alert(this.activeKitchen.burners)

            this.$store.dispatch('selectedKitchen', this.activeKitchen)
            //  debugger
            const s = this.selectedKitchen
            console.log(s)
        }
    },
    computed: {
        // ...utilComputed,
        activeKitchen() {
            return this.kitchen
        },
        rate() {
            return Dinero({
                amount: this.kitchen.rate * 100,
                currency: 'USD'
            }).toFormat('$0,0.00')
        }
    }
}
</script>
