<template>
    <div>
        <!-- quill-editor插件标签 分别绑定各个事件-->
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
        <!-- 文件上传input 将它隐藏-->
        <el-upload :action="qnLocation" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess' ref="upload" style="display:none">
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
        </el-upload>
    </div>

</template>

<script>
import Quill from "quill";
const STATICDOMAIN = "http://otq0t8ph7.bkt.clouddn.com/"; // 图片服务器的域名，展示时使用

export default {
  data() {
    return {
      content: "", // 文章内容
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          // 配置富文本
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"]
          ]
        }
      },
      addRange: [],
      uploadData: {},
      photoUrl: "", // 上传图片地址
      uploadType: "" // 上传的文件类型（图片、视频）
    };
  },
  computed: {
    // 上传七牛的actiond地址，http 和 https 不一样
    qnLocation() {
      return location.protocol === "http:"
        ? "http://upload.qiniu.com"
        : "https://up.qbox.me";
    }
  },
  methods: {
    // 图片上传之前调取的函数
    // 这个钩子还支持 promise
    beforeUpload(file) {
      return this.qnUpload(file);
    },
    // 图片上传前获得数据token数据
    qnUpload(file) {
      this.fullscreenLoading = true;
      const suffix = file.name.split(".");
      const ext = suffix.splice(suffix.length - 1, 1)[0];
      console.log(this.uploadType);
      if (this.uploadType === "image") {
        // 如果是点击插入图片
        // TODO 图片格式/大小限制
        alert("上传图片");
        return this.$axios("/commonAPI/ossClient/aliyunOSSUploadImage").then(res => {
          this.uploadData = {
            key: `image/${suffix.join(".")}_${new Date().getTime()}.${ext}`,
            token: res.data
          };
        });
      }
    },

    // 图片上传成功回调 插入到编辑器中
    upScuccess(e, file, fileList) {
      console.log(e);
      this.fullscreenLoading = false;
      let vm = this;
      let url = "";
      if (this.uploadType === "image") {
        // 获得文件上传后的URL地址
        url = STATICDOMAIN + e.key;
      }
      if (url != null && url.length > 0) {
        // 将文件上传后的URL地址插入到编辑器文本中
        let value = url;
        // API: https://segmentfault.com/q/1010000008951906
        // this.$refs.myTextEditor.quillEditor.getSelection();
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection();
        value = value.indexOf("http") !== -1 ? value : "http:" + value;
        vm.$refs.myQuillEditor.quill.insertEmbed(
          vm.addRange !== null ? vm.addRange.index : 0,
          vm.uploadType,
          value,
          Quill.sources.USER
        ); // 调用编辑器的 insertEmbed 方法，插入URL
      } else {
        this.$message.error(`${vm.uploadType}插入失败`);
      }
      this.$refs["upload"].clearFiles(); // 插入成功后清除input的内容
    },

    // 点击图片ICON触发事件
    imgHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();
      if (state) {
        let fileInput = document.getElementById("imgInput");
        fileInput.click(); // 加一个触发事件
      }
      this.uploadType = "image";
    },
    onEditorChange({ editor, html, text }) {
      console.log("editor change!", html);
      this.content = html;
    },
  },
  created() {
    this.$refs = {
      myQuillEditor: HTMLInputElement,
      imgInput: HTMLInputElement
    };
  },
  // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
  mounted() {
    // 为图片ICON绑定事件 getModule 为编辑器的内部属性
    console.log(this.$refs.myQuillEditor.quill);
    this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);
  }
};
</script>
<style lang="less">
.quill-editor {
  min-height: 500px;
  background: #fff;
}
.ql-container {
  min-height: 500px;
}

.ql-snow .ql-editor img {
  max-width: 480px;
}

.ql-editor .ql-video {
  max-width: 480px;
}
</style>