<template>
  <div>
  <br>

  <br>
    <p>uploadUrl</p>
    <p>{{ uploadUrl }}</p>
    <br>
    <p>downloadUrl</p>
    <p>{{ downloadUrl }}</p>

    <br>

<br>
<!-- <form action="" encrypt="multipart/form-data"> -->
  <input type="file" multiple="multiple" @change="setImage($event.target.files)"/>

<!-- </form> -->

    <br>
      <button @click="getUrl">get Url</button>
    <br>
      <button type="submit" @click="simpleCanvasTest">upload</button>
    <br>
      <button @click="handleGetFile">get image</button>
    <br>

  <div class="w-48 h-48">
    <cropper
    ref="cropperRef"
    class="cropper"
    :src="imgBlobUrl"
    :autoZoom="false"
    @change="change"
    :stencil-props="{
      aspectRatio: 16/9 }"/>

  </div>
<br>
<p>******************</p>

  <br>
  <div v-if="imageLoc">
        <p>{{imageLocSubstring}}</p>
        <!-- <p>{{imageLoc}}</p> -->
        <br>
        <div>
          <img :src="imageLoc" alt="imageGoesHere">
        </div>

<br>
  </div>
  <div v-else>
  <p>no image</p>
  </div>

  </div>

</template>

<script>
import axios from 'axios'
import { ref, computed } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import FormData2 from 'form-data'

  export default {
    setup() {
    let imageZ = ref(null)
    let imageText = ref('hh')
    let imageUpload = null
    let imageLoc = ref(null)
    const img = new Image()
    let imageForUpload = ref(null)
    const cropperRef = ref(null)
    let imageStream = ref(null)
    let imgBlobUrl = ref(null)
    let testVar = ref('http://localhost:8080/80bcafeb-612b-4833-9fc9-fe974a3f6199')
    let getImgBlobUrl = ref(null)
    let im = ref(null)
    let uploadUrl = ref(null)
    let imageFile = ref(null)
    let imageUrl = ref('')
    let files2 = []
    let imageName = ref(null)
    let downloadUrl = ref(null)
    let imageLocSubstring = ref(null)

    const change = (e) => {
      // debugger
      console.log(e)
      // alert(e)
    }
      const setImage = (files) => {
        imageFile = files[0]

          // imageLoc.value = "blob:http://localhost:8080/ffdf684c-9b08-490a-bdee-3c8e1f0e2456"

      testVar.value = "bb"
          imgBlobUrl.value = URL.createObjectURL(files[0])
          // debugger
          imageForUpload.value = files[0]
          console.log('imageForUpload before')
          console.log(imageForUpload)
          // debugger

        }

        const getUrl = () => {
          // debugger
        axios({
          method: 'get',
          url:'http://localhost:4001/s3UploadUrl'
        }).then(response => {
          // debugger
          console.log(response)
          uploadUrl.value = response.data.uploadUrl
          imageName.value = response.data.imageName
          console.log(uploadUrl)
      })}

      const simpleCanvasTest = () => {
        const { canvas, coordinates, visibleArea } = cropperRef.value.getResult()
        debugger

    // const formData = new FormData();

      canvas.toBlob(blob => {
        debugger
          axios({
            method: 'put',
            url: uploadUrl.value,
            data: blob
          })
          .then(response => {
            debugger
            console.log('response')
            console.log(response)
          })
          .catch (err => {
          console.log(err)
      })})}

    const handleGetFile = async () => {
      debugger
        axios({
          method: 'get',
          url:'http://localhost:4001/s3DownloadUrl',
          headers: {
            'image-name': imageName.value
          }
        }).then(response => {
          debugger
          console.log(response)
          downloadUrl.value = response.data
          // imageName.value = response.data.imageName
          // console.log(downloadUrl, imageName)

        axios({
          method: 'get',
          url: downloadUrl.value,
          responseType: 'blob'
        })
        .then(response => {
          debugger
          // console.log('response.data')
          // console.log(response.data)
          // let fileReader = new FileReader()
          // imageLoc.value = response.data
          // let blob = new Blob([response.data])
          imageLoc.value = ( URL || webkitURL).createObjectURL(response.data)

          debugger
          // fileReader.onload = function (event) {
          //   debugger
          //   imageLoc.value = event.target.result
          //   imageLocSubstring.value = event.target.result.substring(1,10)
          //   console.log(imageLoc.value)
          // }
          // fileReader(blob)

          // fileReader.readAsDataURL(blob)
          // imageLoc.value = imageLoc.value.substring(imageLoc.value.length - (imageLoc.value.length - 5))
          // debugger

        })
        .catch(err => {
          console.log(err)
        })})}


      return {
        change,
        setImage,
        imageZ,
        imageText,
        imageLoc,
        // handleUploadFiles,
        handleGetFile,
        cropperRef,
        imageStream,
        imgBlobUrl,
        testVar,
        getImgBlobUrl,
        imageForUpload,
        im,
        simpleCanvasTest,
        getUrl,
        imageFile,
        uploadUrl,
        downloadUrl,
        imageName,
        imageLocSubstring
      }
  },
    components: {
      Cropper
    },
      props: ['fieldName'],
      data() {
        return {
          // imageLoc: null,
          // imageX: null,
          // imageStream: null,
          // img: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
          // src: null
        }
      },
      methods: {
      //   imageuploaded(res) {
      //     debugger
      //     console.log(res)
      // if (res.errcode == 0) {
      //   this.src = 'http://localhost:4001/images/:2021-05-01T18:09:21.449Zcooking-dishes-herb-kitchen-1109197.jpg';
      // }},

    },
    computed: {
      // imgStream() {
      //   return this.imageStream
      // }
    }

      }
</script>

<style lang="scss" scoped>

</style>


//        const handleUploadFiles = (e) => {
//         debugger
//         // const fr = new FileReader()
//         // var buffer = new ArrayBuffer(100);
//         // var view = new DataView(buffer);
//         // console.log(buffer)
//         // console.log(view)
//         console.log('imageForUpload after')
//         console.log(imageForUpload)
//         debugger
//         // const im = fr.readAsArrayBuffer(imageForUpload.value)

//         debugger
//         // console.log(im)

//         console.log('e')
//         console.log(e)
//         console.log('cropperRef', cropperRef)
//         console.log('cropperRef.value', cropperRef.value)
//         const { canvas, coordinates, visibleArea } = cropperRef.value.getResult()

//         // im = canvas.toDataURL();
//         // debugger
//         // alert(im)
//         // console.log(im)

//         console.log('canvas')
//         console.log(canvas.namespaceURI)
//         console.log(canvas.src)
//         console.log(coordinates)
//         console.dir(visibleArea)
//         debugger
//         const ctx = canvas.getContext('2d');
//         console.log(ctx)
// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 100, 100);
// debugger
//         const formData = new FormData()
//         console.log(canvas)
//         canvas.toBlob(blob => {
//           formData.append('kitchenImage', canvas)
//           formData.append('userId', '88jkjklje726')
//           axios({
//             method: 'post',
//             url: 'http://localhost:4001/kitchens',
//             data: formData
//           })
//           .then(response => {
//             debugger
//             // let reader = new FileReader()

//             // reader.onload = () => {
//             //   imageUpload = reader.result
//             // }
//             // reader.readAsDataURL(response.data)
//             console.log('imageLoc',  response.data.imagePath.toString())
//             imageLoc = response.data.imagePath

//             })
//           .catch (err => {
//           console.log(err)
//         })
//     })}
