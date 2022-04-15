import { createApp, provide, h } from 'vue'
import {
    DefaultApolloClient,
    provideApolloClient
} from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client/core'
import './index.css'
import gql from 'graphql-tag'

//  HTTP connection to the API
const httpLink = createHttpLink({
    //  You should use an absolute URL here
    uri: 'http:localhost:4000/graphql'
})

//  Cache implementation
const cache = new InMemoryCache()

console.log(cache)

const apolloClient = new ApolloClient({
    cache,
    resolvers: {},
    link: httpLink
})

const app = createApp({
    setup() {
        provideApolloClient(apolloClient)
    },
    render: () => h(App)
})

app.use(router).mount('#app')

cache.writeQuery({
    query: gql`
        query writeAppt($id: ID!) {
            appt(_id: $id) {
                _id
                date
                meal
                details
                kitchen
                user
            }
        }
    `,
    data: {
        appt: {
            _id: '1',
            date: '2021-10-05',
            meal: 'lunch',
            details: 'Meatloaf and gravy',
            kitchen: '123',
            user: '456'
        }
    }
})
