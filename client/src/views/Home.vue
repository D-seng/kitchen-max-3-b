<template>
    <div class="home">
        <h1 class="text-red-500">Home page</h1>

        <p>{{ message }}</p>
        <p>{{ kitchens }}</p>
        <!-- <p>{{user}}</p> -->
        <ul>
            <li v-for="k in kitchens" :key="k._id">
                <button @click="deleteAndUpdateCache(k._id)">
                    Delete this kitchen
                </button>
                {{ k.name }}<span class="ml-2"> </span>{{ k._id }}
            </li>
            <!-- <cld-image :publicId="xhv9plkl4sy5fvfrmlk2"></cld-image> -->
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import getKitchens from '../graphql/getKitchens.query.gql'

import getCurrentUserFromToken from '../graphql/getCurrentUserFromToken.query.gql'
import externalSetup from '../composables/externalSetup.js'
import deleteKitchenMutation from '../graphql/deleteKitchen.mutation.gql'
// import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
// import { debugPort } from 'process'

export default {
    name: 'Home',
    components: {},
    setup() {
        const {
            my_thing,
            fetchSomething,
            validateUserByToken,
            addKitchenGuard,
            loading,
            error
        } = externalSetup()
        const message = ref('hello there')
        const { result } = useQuery(getKitchens)
        // debugger
        console.log('result', result)
        const kitchens = useResult(result, null, (data) => data.getKitchens)
        console.log('kitchens')
        console.log(kitchens)

        // update is an Apollo hook made available on mutate by useMutation?

        //****WATCH VIDEO ON APOLLO CLIENT WITH NATALIA TEPLUNIHA AGAIN*******
        // function deleteAndUpdateCache (id) {
        //   deleteKitchen({id}, {
        //   update: (store, {}) => {
        //     const data = store.readQuery({query: getKitchens})
        //     console.log('data', data)
        //     const updatedData = data.getKitchens.filter(k => k._id !== id)
        //     console.log('updatedData', updatedData)
        //     store.writeQuery({query: getKitchens, data: { getKitchens: updatedData}})
        //   }
        // })
        // }

        return {
            message,
            kitchens
            // deleteAndUpdateCache
        }
    }
}
</script>
<style></style>
