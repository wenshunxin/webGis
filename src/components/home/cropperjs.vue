<template>
  <div id="app">
    <div class="crop-demo">
        <img :src="cropImg" class="pre-img" @click="upload">
        <div class="crop-demo-btn">选择图片
            <input class="crop-input" ref="upload" type="file" name="image" accept="image/*" @change="setImage"/>
        </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="570px"
      :before-close="handleClose">
      <div style="width: 400px; height:300px; border: 1px solid gray; display: inline-block;">
        <vue-cropper
            ref='cropper'
            :guides="true"
            :view-mode="2"
            drag-mode="crop"
            :auto-crop-area="0.5"
            :min-container-width="250"
            :min-container-height="180"
            :background="true"
            :rotatable="true"
            :src="imgSrc"
            alt="Source Image"
            :img-style="{ 'width': '400px', 'height': '300px' }">
        </vue-cropper>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="cropImage" v-if="imgSrc != ''" style="margin-right: 40px;">Crop</el-button>
          <el-button @click="rotate" v-if="imgSrc != ''">Rotate</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import VueCropper from 'vue-cropperjs';
  export default {
    components: {
      VueCropper,
    },
    data() {
      return {
        dialogVisible:false,
        imgSrc: '',
        cropImg: '',
      };
    },
    methods: {
      setImage(e) {
        const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          alert('Please select an image file');
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            this.dialogVisible = true;
            setTimeout(()=>{
                this.$refs.cropper.replace(event.target.result);
            },0)
          };
          reader.readAsDataURL(file);
        } else {
          alert('Sorry, FileReader API not supported');
        }
      },
      cropImage() {
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
         this.$refs.upload.value="";
         this.dialogVisible = false;
      },
      rotate() {
        this.$refs.cropper.rotate(90);
      },
      handleClose(done){
          this.$refs.upload.value="";
          done();
      },
      upload(){
          this.$refs.upload.click();
      }
    },
  };
</script>
<style scoped>
.pre-img{
    width: 150px;
    height: 150px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    margin:10px;
}
.crop-demo{
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn{
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>
