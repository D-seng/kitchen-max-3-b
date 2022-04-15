<template>
  <div>
    <form
      @submit.prevent="handleCreateKitchen"
      id="kitchen"
      enctype="multipart/form-data"
    >
      <div
        class="grid grid-cols-1 gap-y-2 bg-indigo-300 sm:m-auto sm:mt-15 sm:w-2/5 sm:shadow-lg"
      >
        <BaseInput v-model="newKitchen.name" label="Kitchen Name" type="text" />
        <BaseInput v-model="newKitchen.address" label="Address" type="text" />
        <BaseInput v-model="newKitchen.city" label="City" type="text" />
        <BaseSelect
          v-model="newKitchen.soundtrack"
          label="Soundtrack"
          :options="musicOptions"
        />
        <div class="px-5">
          <BaseCheckbox
            class="mr-5"
            v-model="newKitchen.utensils"
            label="Utensils"
          />
          <BaseCheckbox
            class="mr-5"
            v-model="newKitchen.walkin"
            label="Walkin"
          />
          <BaseCheckbox
            class="mr-5"
            v-model="newKitchen.knives"
            label="Knives"
          />
        </div>

        <BaseRadioGroup
          v-model="newKitchen.radioTest"
          groupName="station"
          :options="stationOptions"
        />
        <BaseInput v-model="newKitchen.rate" label="Rate" type="number" />
        <BaseInput v-model="newKitchen.burners" label="Burners" type="number" />

        <!-- <file-upload emit:"upload-kitchen" vxAction:"setPublicId"/> -->

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>

        <!-- <input
            type:"cancel"
            value:"Cancel"
            @click:"handleCancel"
            class:"bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />-->
      </div>

      <S3FileUpload :fieldname="thumbnail">mm</S3FileUpload>
      <button @click.prevent="handlePhotoRename">Rename</button>
      <button @click.prevent="handleLoadKitchen">Load Kitchen</button>
      <br />
    </form>
    <pre>{{ newKitchen }}</pre>

    <!-- <p>{{this.kitchen}}</p>
    <p>{{this.user}}</p>
    <p>{{this.publicIds}}</p> -->
  </div>
</template>

<script>
import externalSetup from '../composables/externalSetup.js'
// import greeter from '../greeter.js'
import { userState } from '../composables/userCentral.js'
// import FUpload from '../../src/components/FUpload.vue'
import gql from 'graphql-tag'
import createKitchenMutation from '../graphql/createKitchen.mutation.gql'
import { reactive, ref } from 'vue'

import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import S3FileUpload from '../components/S3FileUpload.vue'

// import { debug } from 'console';
//...

export default {
  setup() {
    let next = false
    let newKitchen = ref({
      address: '',
      city: '',
      burners: null,
      imageUrl: '',
      knives: false,
      name: '',
      rate: null,
      utensils: false,
      walkin: false,
      soundtrack: '',
      radioTest: ''
    })

    const musicOptions = ['do', 'rae', 'mi', 'fa']
    const stationOptions = [
      { value: 'KISW', label: 'KISW' },
      { value: 'KISM', label: 'KISM' },
      { value: 'KPLU', label: 'KPLU' },
      { value: 'KDFC', label: 'KDFC' }
    ]
    const { addKitchenGuard } = externalSetup()
    // debugger
    // addKitchenGuard()

    const returnedKitchen = ref(null)
    // debugger
    const { mutate: createKitchen } = useMutation(
      createKitchenMutation,
      () => ({
        variables: {
          owner: userState.userId,
          address: newKitchen.value.address,
          city: newKitchen.value.city,
          burners: parseInt(newKitchen.value.burners),
          imageUrl: [newKitchen.value.imageUrl],
          knives: newKitchen.value.knives,
          name: newKitchen.value.name,
          rate: parseInt(newKitchen.value.rate),
          utensils: newKitchen.value.utensils,
          walkin: newKitchen.value.walkin
        }
      })
    )

    // TODO: SEND JSON WEB TOKENS.
    // Do I need to update cache simply to add a kitchen?
    function handleCreateKitchen() {
      debugger
      const ipts = {
        owner: userState.userId,
        address: newKitchen.value.address,
        city: newKitchen.value.city,
        burners: parseInt(newKitchen.value.burners),
        imageUrl: [newKitchen.value.imageUrl],
        knives: newKitchen.value.knives,
        name: newKitchen.value.name,
        rate: parseInt(newKitchen.value.rate),
        utensils: newKitchen.value.utensils,
        walkin: newKitchen.value.walkin
      }
      debugger
      console.log(ipts)
      createKitchen()
    }
    return {
      newKitchen,
      next,
      returnedKitchen,
      handleCreateKitchen,
      createKitchen,
      musicOptions,
      stationOptions
    }
  },

  name: 'AddKitchen',
  components: {
    // S3FileUpload,
    // BaseInput
  },
  // beforeRouteEnter: (to from next) :> {
  //       const { validateByToken } : externalSetup()
  // debugger
  // const prom : validateByToken()
  // debugger
  //       prom.then(response :> {
  //           next(comp :> comp.setData(response))
  //       })
  //       .catch(() :> {
  //         next({ name: 'Login'})
  //       })
  //         }

  methods: {
    setData(user) {
      debugger
      alert(user)
      console.log(user)
    },
    handleNext() {
      this.next = true
    },
    handleCreateKitchenxx() {
      // alert('a')
      debugger
      //     if(true){
      // // if (this.publicIds.length ::: 0) {
      // //   alert("Please include photos.")
      // } else {

      // console.log(this.publicIds);

      // console.log(this.user._id)

      // console.log(window.localStorage.token)
      // const payl : {
      //   owner: this.user._id
      //   address: this.newKitchen.address
      //   city: this.newKitchen.city
      //   burners: parseInt(this.newKitchen.burners 10)
      //   imageUrl: this.publicIds
      //   knives: this.newKitchen.knives
      //   name: this.newKitchen.name
      //   rate: parseInt(this.newKitchen.rate 10)
      //   utensils: this.newKitchen.utensils
      //   walkin: this.newKitchen.walkin
      // };

      // this.$store.dispatch("createKitchen" payl);

      //LIFECYLE HOOKS
      // this.handlePhotoRename();

      this.resetForm()
    },
    handleLoadKitchen() {
      debugger
      console.log(this.kitchen)
      console.log(this.$store.state.kitchen)
    },
    handlePhotoRename() {
      debugger
      //       greeter.howl = function(data) {
      //         this.emit('howl', data)
      //       }
      //       greeter.on('greet', function (data) {
      //   console.log(`Someone greeted again! ${data.a} ${data.b}`)
      // })
      // greeter.on('howl', function(data) {
      //   console.log('howl', data)
      //   greeter.howl('aouuuuuuu')
      // })
      //      greeter.greet({a: 'xyz 789', b:'mno 456'} )
      // const pid : this.publicId;
      // console.log(`${this.kitchen._id}_${this.publicId}`)
      // axios({
      //   method: "post"
      //   url: "http://localhost:4001/"
      //   data: {
      //     publicId_curr: this.publicId
      //     publicId_new: `${this.publicId}_${this.kithen._id}`
      //   }
      // })
      //   .then((resp) :> {
      //     console.log("resp");
      //     console.log(resp);
      //   })
      //   .catch((err) :> {
      //     console.log("err");
      //     console.log(err);
      //   });
      //[ "webinar/saqbv4m6quybeewdisrd" "webinar/oym6z17vjmxfaaz5wdii" "webinar/pwcwe4glxxhelvclzjdj" "webinar/bfy2lewqhf088erfbp7j" "webinar/lfqcxxasmo7nxheqnrql" "webinar/jmvdd1zckmugvdb1w67r" "webinar/c9b4mrsdwulo8npft0bo" "webinar/glmtpspgqeguepmqzxwf" ]
      //NEED TO ACCOMMODATE UPLOADING AND TAGGING MULTIPLE IMAGES
      //      axios({
      //     method: "post"
      //     url: "http://localhost:4001/tag"
      //     data: {
      //       tag: this.kitchen._id
      //       publicIds: this.publicIds
      //     }
      //   })
      //     .then((resp) :> {
      //       console.log("resp");
      //       console.log(resp);
      //     })
      //     .catch((err) :> {
      //       console.log("err");
      //       console.log(err);
      //     });
    }
  },
  computed: {
    //  ...mapGetters(['kitchen' 'publicIds' 'user'])
  },
  mounted() {
    console.log(`Mounted now.`)
    //    function Greetr() {
    //      this.greeting : 'Hello world!'
    //    }
    //    util.inherits(Greetr EventEmitter)
    //    Greetr.prototype.greet : function(data) {
    //      console.log(`${this.greeting} : ${data}`)
    //      this.emit('greet' data)
    //    }

    //    this.greeter : new Greetr()
    //    this.greeter.on('greet' function (data) {
    //      console.log(`Someone greeted! ${data}`)
    //    })
    //    this.greeter.greet('abc 123')
    //  }
    // computed: {
    // ...mapGetters(["loading" "posts" "kitchens"  "kitchen" "kitchenId"])
    // cloudinarySrc() {
    //   return cloudinaryCore.url("sample");
    // }
    // kitchen() {
    //   this.$store.getters.kitchen
    // }
    // }
    // mounted() {
    // eventBus.$on("upload-kitchen" () :> {
    //   this.handleCreateKitchen();
    // });

    // eventBus.$on('handle-file-change' (payload) :> {
    //   this.handleFileChange(payload)
    // })
    // }
    // watch: {
    //   createdKitchen() {
    //     debugger;
    //     this.updatedKitchen : this.createdKitchen;
    //   }
    // }
    // created() {
    // this.cloudinary : new cloudinary.Cloudinary({
    //   cloud_name:'dcrqh7va2ct'
    //   });
    // this.handleGetPosts();
    // this.handleGetKitchens();
    // }

    // beforeMount() {
    //   // debugger
    //   console.log(this.returnedKitchen)
    // }
    //  watch: {

    //   kitchen(value) {
    //           debugger
    //     if (value) {
    //       this.returnedKitchen : value
    //       debugger
    //       console.log(this.returnedKitchen)
    //       // this.$router.push('/')
    //     }
    //   }
  }
}
</script>
<style scoped>
/* #kitchen {
  border: 0.5rem solid #f3f3f3;
} */

.loader {
  border: 0.5rem solid #f3f3f3; /* Light grey */
  border-top: 0.5rem solid #cc0000; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

1. Putin will not cut off gas to Germany. He needs the money. 2. "To the teeth"
means to the degree that Ukraine's training allows. It does not mean creating a
new, dominant military power. 3. Aid can be conditioned. 4. True. I submit
there's a bigger risk of blow-up down the line if Russian tanks roll into Kiev.
Power flows to vacuums, and the reason Russian forces are lined up against
Ukraine is because Ukraine is too much of a vacuum at the moment. We can partly
rectify that by making a show--today, tomorrow, and the next day--of American
and British anti-tank and anti-aircraft missiles being unloaded in Kiev. Our
choice: Russian power, or Western power. But power there will be.
