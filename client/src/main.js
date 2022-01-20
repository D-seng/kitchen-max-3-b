import { createApp, provide, h } from 'vue'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
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
const typeDefs = gql`
  type Appointment {
    _id: ID!
    date: String!
    meal: String!
    details: String!
    kitchen: ID!
    user: ID!
  }

 type Mutation {
   modifyAppt(id: ID!, meal: String, details: String): Item,
   moveApptDate(id: ID!, date: String!): Meal
 }

  type Query {
    getAppointments(date: [String!]): Appointment
  }`

const mealFieldsQuery = gql`
   {
     mealFields @client {
       id
       details
       meal
       date
     }
   }
 `
const getAppointments = gql`
query getAppointments ($date: [String!]) {
  getAppointments @client (date: $date)
    {
        _id
        kitchen
        user
        date
        meal
        details
      }
}`

const resolvers = {
  Mutation: {
    moveApptDate: (_, { id }, { cache }) => {
      debugger
      const data = cache.readQuery({ query: mealFieldsQuery })
      const currentMeal = data.mealFields.find(item => item.id === id)
      currentMeal.date = '2021-10-31'
      cache.writeQuery({ query: mealFieldsQuery, data })
      return currentMeal.date
    }
  }
}

export const apolloClient = new ApolloClient({
  cache,
  resolvers: {},
  link: httpLink,
  typeDefs,
  getAppointments
})

const app = createApp({
  setup () {
    provideApolloClient(apolloClient)
  },
  render: () => h(App)
})

app.use(router).mount('#app')
