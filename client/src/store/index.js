// import { createStore } from 'vuex'
// import { defaultClient as apolloClient } from '../main.js'
// import getCurrentUserFromToken from '../graphql/getKitchens.query.gql'

// // Create a new store instance.
// export const store = createStore({
//   state () {
//     return {
//       count: 0,
//       testVar: 'testVar'
//     }
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//       console.log(state.count)
//     }
//   },
//   actions: {
//     increment ({ context }, payload) {
//       // const client = this.app.apolloProvider.defaultClient
//       // context.commit('increment')
//       apolloClient.query({
//         query: getCurrentUserFromToken,
//         variables: payload
//       }).then(({ data }) => {
//         console.log('data.getCurrentUserFromToken', data.getCurrentUserFromToken)
//       })
//     }
//   }
// })
