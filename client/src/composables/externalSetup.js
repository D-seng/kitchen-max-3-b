import { ref, reactive, toRefs, watch } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import getCurrentUserFromToken from '../graphql/getCurrentUserFromToken.query.gql'
import getKitchens from '../graphql/getKitchens.query.gql'
import { userState } from './userCentral.js'

export default function externalSetup() {
    // const token = window.localStorage.getItem('token')
    const state = reactive({
        my_thing: null
    })

    const validateByToken = () => {
        const promise = new Promise(function (resolve, reject) {
            const variables = ref({
                token: window.localStorage.getItem('token')
            })
            const options = ref({
                fetchPolicy: 'network-only'
            })
            const { onResult } = useQuery(
                getCurrentUserFromToken,
                variables,
                options
            )

            onResult((queryResult) => {
                if ('error' in queryResult) {
                    reject(
                        new Error('prog err--Could not get the queryResult!')
                    )
                } else {
                    console.log('returnValue', queryResult.data)
                    userState.userId =
                        queryResult.data.getCurrentUserFromToken.userId
                    resolve(queryResult.data)
                }
            })
        })
        return promise
    }
    const fetchSomething = async (token) => {
        debugger
        const { result, loading, error } = useQuery(getKitchens, null, {
            fetchPolicy: 'network-only' // check for other available options
        })
        // const { result, loading, error } = useQuery(getKitchens)
        debugger
        // Set up your state
        // console.log(result)
        console.log(result)
        state.my_thing = useResult(result, null, (data) => data.getKitchens) // 'data.my_thing' can be whatever the node is named in your api gql
        debugger
        console.log(state.my_thing)
        const mt = state.my_thing
        // return { mt, loading, error }
        return { mt }
    }

    // return a reactive state and the fetch async method
    return { ...toRefs(state), validateByToken, fetchSomething }
}
