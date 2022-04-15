<template>
    <header class="bg-gray-900 sm:flex sm:justify-between">
        <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-baseline">
                <!-- <img class="h-12 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" />
        <img class="h-10 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" />
        <img class="h-8 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" />
        <img class="h-6 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" />
        <img class="h-4 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" />
        <img class="h-4 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" />
        <img class="h-4 w-auto inline-block" src="../assets/stove-kitchen.svg" alt="logo" /> -->
            </div>
            <div>
                <div class="sm:hidden">
                    <button
                        @click="isOpen = !isOpen"
                        type="button"
                        class="block text-gray-500 focus:outline-none"
                    >
                        <svg
                            class="h-6 w-6 fill-current hover:text-white focus:text-white"
                            viewBox="0 0 36 36"
                        >
                            <path
                                v-if="!isOpen"
                                fill-rule="evenodd"
                                d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
                            />
                            <line
                                v-if="isOpen"
                                x1="0"
                                y1="25"
                                x2="25"
                                y2="0"
                                style="
                                    stroke: rgb(255, 255, 255);
                                    stroke-width: 4;
                                "
                            />
                            <line
                                v-if="isOpen"
                                x1="0"
                                y1="0"
                                x2="25"
                                y2="25"
                                style="
                                    stroke: rgb(255, 255, 255);
                                    stroke-width: 4;
                                "
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="px-2 pt-2 pb-4 sm:flex items-center">
            <router-link
                to="/"
                class="px-2 py-1 ml-2 block font-semibold text-gray-400 hover:bg-gray-700 rounded"
                >Home</router-link
            >
            <router-link
                to="/about"
                class="px-2 py-1 ml-2 block font-semibold text-gray-400 hover:bg-gray-700 rounded"
                >About</router-link
            >
            <router-link
                to="/add-kitchen"
                class="px-2 py-1 ml-2 block font-semibold text-gray-400 hover:bg-gray-700 rounded"
                >Add Kitchen</router-link
            >
            <router-link
                to="/get-kitchen"
                class="px-2 py-1 ml-2 block font-semibold text-gray-400 hover:bg-gray-700 rounded"
                >Get Kitchen</router-link
            >
            <router-link
                to="/"
                class="px-2 py-1 ml-2 block font-semibold text-gray-400 hover:bg-gray-700 rounded"
                >Sign Up</router-link
            >
            <router-link
                to="/login"
                class="px-2 py-1 ml-2 block font-semibold text-gray-400 hover:bg-gray-700 rounded"
                >Sign In</router-link
            >
            <div></div>
        </div>
    </header>
</template>

<script>
// import AccountDropdown from "./AccountDropdown";
// import { authComputed, utilComputed } from "../store/helpers.js";
// import { mapGetters } from 'vuex'
// import FUpload from "../../src/components/FUpload";
// import Thumbnail from "./Thumbnail"

export default {
    name: 'Navbar',
    components: {
        // AccountDropdown,
        // Thumbnail
    },

    data() {
        return {
            title: 'Navbar',
            isOpen: true,
            username: null,
            loggedIn: true
        }
    },
    methods: {},
    computed: {
        // ...mapGetters(['user', 'loggedIn'])
        // ...authComputed,
        // ...utilComputed
        // imageSource() {
        //   return user.avatar
        // return "webinar/g0jsipgaygh88s66ozv1"
    }
    // userAvatar() {
    //   return user.avatar
    // }
    // },
    // watch: {
    //     user(val) {
    //     debugger
    //   if(val){
    //       console.log(val)
    //       console.log(val.isCook)
    //       this.loggedIn = true
    //       this.isCook = val.isCook
    //       this.isKitchenOwner = val.isKitchenOwner
    //   } else {
    //     this.isCook = false
    //     this.isKitchenOwner = false
    //     this.loggedIn = false
    //   }

    //   },
    //   token(value) {
    //     // debugger
    //     if (value) {

    //       // this.both = this.cook && this.kitchenOwner
    //       this.loggedIn = true;

    //       // this.$store.dispatch('getCurrentUser')

    //       // this.isCook = user.isCook
    //     } else {
    //       this.loggedIn = false;
    //     }
    //   }

    // }
}
</script>

<style></style>
