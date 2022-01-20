<template>
    <div>
      <button @click.prevent="openUploadModal">Upload files</button>
</div>
</template>

<script>
export default {
  name: "FUpload",
  props: {
    maxFiles: {
      type: Number,
    required: true
    }
  },
  data() {
    return {
    photos: [],
    widget: null,
    publicId: ''
    }

  },
  methods: {

    openUploadModal() {
// debugger;
      const presets = ["signed", "video", "eager"];
      const getMyUploadPresets = (cb) => cb(presets);

      window.cloudinary.setCloudName('dcrqh7va2ct')
      var widget = window.cloudinary.createUploadWidget(
        { cloud_name: 'dcrqh7va2ct',
          upload_preset: 'o6jk8nag',
          folder: 'webinar',
          resourceType: 'image',
          clientAllowedFormats: ['png', 'gif', 'jpeg'],
          // inlineContainer: document.getElementById('widget-container'),
          // showCompletedButton: true
          showAdvancedOptions: true,
           getUploadPresets: getMyUploadPresets,
           maxFiles: this.maxFiles,
          //  tags: ['primary', 'secondary']
          // preBatch: (cb, data) => {
          //     console.log('cb')
          //   console.dir(cb)
          //   cb({cancel: true})
          // }

        },
        (error, result) => {
          if (!error && result && result.event === "queues-end") {
            // debugger
            console.log('Done uploading..: ', result.info.files);
            // debugger
            const fileCount = result.info.files.length
            const publicIds = result.info.files.map(file => {
              return file.uploadInfo.public_id
            })

            console.log(result.info.public_id)
            this.$store.dispatch("writePublicIds", { publicIds, maxFiles: this.maxFiles } );


            }
        }).open()

    }
  }
}
</script>

<style>

</style>
