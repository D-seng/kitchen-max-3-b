<template>
    <div>
        <div class="img-container">
            <img ref="image" :src="src" crossorigin />
        </div>
        <img :src="destination" class="img-preview" />
        <button @click="hCropper">cropper</button>
    </div>
</template>

<script>
import Cropper from 'cropperjs'
export default {
    name: 'ImageCropper',
    data() {
        return {
            cropper: {},
            destination: {},
            image: {}
        }
    },
    props: {
        src: String
    },
    methods: {
        hCropper() {
            alert('c')
        }
    },
    mounted() {
        debugger
        this.image = this.$refs.image
        // this.image = "./logo.png"
        this.cropper = new Cropper(this.image, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = this.cropper.getCroppedCanvas()
                this.destination = canvas.toDataURL('image/png')
            }
        })
    }
}
</script>

<style scoped>
.img-container {
    width: 640px;
    height: 480px;
    float: left;
}
.img-preview {
    width: 200px;
    height: 200px;
    float: left;
    margin-left: 10px;
}
</style>
