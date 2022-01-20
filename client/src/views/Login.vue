<template>
<div class="w-full max-w-xs">
<!-- <form-alert v-if="error" :message="error.message"></form-alert> -->
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-3 mb-4">
     <p class="text-3xl font-extrabold mb-4">Sign In</p>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input v-model="uname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
      @keyup.prevent.enter="">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input v-model="pword"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"
       @keyup.prevent.enter=""
      >


    </div>
    <div class="flex items-center justify-between">
      <button

        @click="loginUserAndMore"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
    <div class="text-right">
         <router-link class="text-xs italic text-blue-500 hover:text-blue-800" to='/'>
        No account?  Sign up!
      </router-link>
    </div>

  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Kitchen Corp. All rights reserved.
  </p>

</div>
</template>

<script>
// @ is an alias to /src
// import { mapGetters } from "vuex";
// import { authComputed } from "../store/helpers.js";

import { ref } from 'vue'
import { useMutation, useQuery, onDone } from '@vue/apollo-composable'
import loginUserMutation from '../graphql/loginUser.mutation.gql'
import getKitchensQuery from '../graphql/getKitchens.query.gql'

import router from '../router/index'

export default {
  setup() {
    const uname = ref('')
    const pword = ref('')

    const { mutate: loginUser, onDone } = useMutation(loginUserMutation,
        () => ({
        variables: {
            username: uname.value,
            password: pword.value
          },
          update: (cache, {data: { loginUser}}) => {
            console.log('cache')
            console.log(cache)
          }})
    )

    function loginUserAndMore() {
      try{
      loginUser()
        onDone(result => {
          window.localStorage.setItem('token', result.data.loginUser.token)
          router.push('/')
        })
      }
      catch {
        err => {
          console.log(err)
        }
      }
    }

    return {
      loginUserAndMore,
      loginUser,
      uname,
      pword
    }

  },
  name: "Login",
  components: {

  },
  data() {
    return {
      isButtonDisabled: false
    }
  },

  methods: {
    clicked() {
      alert('clicked')
      debugger
    },

  handleLogin() {
    // debugger
  // this.$store.dispatch('loginUser',
  //       {
  //         username: this.username,
  //         password: this.password
  //       }
  //     )
  }
  },
    // computed: {
    // ...authComputed,
    // errorText() {
    //   this.error.substr(13, 19)
    // }
  // }
};
</script>