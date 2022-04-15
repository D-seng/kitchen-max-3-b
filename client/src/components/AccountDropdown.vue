<template>
    <div class="relative">
        <button
            @click="isOpen = !isOpen"
            class="relative z-10 block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none hover:border-white focus:border-yellow"
        >
            <cld-image :publicId="user.avatar">
                <cld-transformation
                    width="100"
                    height="100"
                    gravity="face"
                    crop="thumb"
                />
                <cld-transformation width="100" gravity="face" crop="thumb" />
            </cld-image>
        </button>

        <button
            v-if="isOpen"
            @click="isOpen = false"
            class="fixed inset-0 h-full w-full cursor-default"
            tabindex="-1"
        ></button>

        <div
            v-if="isOpen"
            class="absolute right-0 mt-2 w-48 bg-gray-200 text-gray-900 rounded-lg shadow-lg"
        >
            <router-link
                @click.native="isOpen = false"
                class="block px-4 py-2 hover:bg-red-800 hover:text-white hover:font-bold overflow-auto"
                to="/settings"
                >Settings</router-link
            >
            <router-link
                @click.native="isOpen = false"
                class="block px-4 py-2 hover:bg-red-800 hover:text-white hover:font-bold overflow-auto"
                to="/support"
                >Support</router-link
            >
            <!-- <div@click="handleLogout"> -->
            <router-link
                class="block px-4 py-2 hover:bg-red-800 hover:text-white hover:font-bold overflow-auto"
                @click.native="handleLogout"
                to="/login"
                >Log Out</router-link
            >

            <!-- </div> -->
        </div>
    </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import { authComputed } from '../store/helpers';
export default {
    name: 'AccountDropdown',
    components: {},
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        //   window.cloudinary.setCloudName('dcrqh7va2ct')

        handleLogout() {
            this.isOpen = false
            this.$store.dispatch('logoutUser')
            location.reload()
        }
    },
    computed: {
        // ...authComputed,
    },
    watch: {
        //     user(value) {
        //       if (value) {
        //       window.cloudinary.setCloudName('dcrqh7va2ct')
        // const im = `https://res.cloudinary.com/dcrqh7va2ct/image/fetch/`
        //       } else {
        //         // this.$router.push('/login')
        //       }
        // }
    },
    created() {
        const handleEscape = (e) => {
            if (e.key === 'Esc' || e.key === 'Escape') {
                this.isOpen = false
            }
        }
        document.addEventListener('keydown', handleEscape)
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', handleEscape)
        })
    }
}
</script>
