<template>
    <div class="">
        <div class="" style="margin-bottom:30px;">
            <quill-editor
                class="quillEditor"
                 v-model="content"
                 ref="myQuillEditor"
                 :options="editorOption"
                 @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                 @change="onEditorChange($event)">
           </quill-editor>
        </div>

       <el-button  size="small" type="primary" @click="save">提交</el-button>
    </div>

</template>
<script>
    import { quillEditor } from 'vue-quill-editor';
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    const toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],
          ['link', 'image', 'video'],
          ['clean']                                         // remove formatting button
        ]
    export default{
        data(){
            return {
                content:null,
                editorOption:{
                    placeholder: '编辑器',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                      toolbar: {
                        container: toolbarOptions,  // 工具栏
                        // handlers: {
                        //   'image': function (value) {
                        //     if (value) {
                        //       console.log(value)
                        //     } else {
                        //       // this.quill.format('image', false);
                        //     }
                        //   }
                        // }
                      }
                    }
                }
            }
        },
        components: {
        	quillEditor
       },
        methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange({ editor, html, text }){//内容改变事件
                console.log(editor);
                console.log(html);
                console.log(text)
            },
            save(){
                console.log(this.content)
            }
        }
    }
</script>
<style media="screen">

</style>
