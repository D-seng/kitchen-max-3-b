<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{user}}
  </div>
</template>
<script>
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import getKitchens from '../graphql/getKitchens.query.gql'
import getCurrentUserFromToken from '../graphql/getCurrentUserFromToken.query.gql'
import gql from 'graphql-tag'
import { ref, reactive } from 'vue'
import { logErrorMessages } from '@vue/apollo-util'

export default {
  setup() {
      // debugger
      console.log(getCurrentUserFromToken)
      const t = window.localStorage.getItem('token')
      const { result, onError } = useQuery(getCurrentUserFromToken,
        {token: t}
      )
      onError(error => {
        logErrorMessages(error)
      })

  const user = useResult(result, null, data => data.getCurrentUserFromToken)
  console.log('user from About.vue', user)


// debugger
//   console.log('result')
//   console.log(result)
//   const user = useResult(result, null, data => data.getKitchens)
// console.log('user')
// console.log(user)
return {
  user
}
  }

}
</script>
