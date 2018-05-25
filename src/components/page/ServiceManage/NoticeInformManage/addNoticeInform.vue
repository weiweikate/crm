<template>
    <div>
        <v-breadcrumb :nav="['服务管理','公告/通知','发布公告/通知']"></v-breadcrumb>
        <div class="container">
            <div class="inf-box">
                <div style="margin: -30px 0 20px 80px">
                    <div class="tab-item" :class="checked[0]?'checked':''" @click="change(0)">公告</div>
                    <div class="tab-item" :class="checked[1]?'checked':''" @click="change(1)" style="margin-left: -5px">
                        通知
                    </div>
                </div>
                <el-form :model="form" v-loading="loading">
                    <el-form-item v-if="checked[0]">
                        <span class="label"><span class="required">*</span>公告标题</span>
                        <el-input placeholder="请输入公告标题" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class="label" v-if="checked[0]"><span class="required">*</span>公告详情</span>
                        <span class="label" v-else><span class="required">*</span>通知详情</span>
                        <template>
                            <div>
                                <!-- quill-editor插件标签 分别绑定各个事件-->
                                <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption"
                                              @change="onEditorChange($event)">
                                </quill-editor>
                                <!-- 文件上传input 将它隐藏-->
                                <el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUpload'
                                           :data="uploadData" :on-success='upScuccess'
                                           ref="upload" style="display:none">
                                    <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">
                                        点击上传
                                    </el-button>
                                </el-upload>
                            </div>

                        </template>
                    </el-form-item>

                    <el-form-item label="推送方式" style="position: relative">
                        <el-radio-group v-model="form.status">
                            <el-radio label="即时推送"></el-radio>
                            <el-radio label="定时推送"></el-radio>
                        </el-radio-group>
                        <el-date-picker
                                v-model="form.date"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="推送人群">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                            全部用户
                        </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="推送区域" class="region-area">
                        <el-checkbox-group>
                            <el-checkbox label="全国"></el-checkbox>
                            <el-checkbox label="国外" v-if="checked[0]"></el-checkbox>
                        </el-checkbox-group>
                        <el-cascader
                                :options="options"
                                v-model="selectedOptions"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <span class="label">发布者</span>
                        客服小明
                    </el-form-item>
                    <div class="submit-btn">
                        <el-button type="primary" @click="submitForm('form')">确认保存</el-button>
                        <el-button>取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import Quill from 'quill';
    import * as api from '../../../../api/api'

    const STATICDOMAIN = 'http://otq0t8ph7.bkt.clouddn.com/' // 图片服务器的域名，展示时使用
    const STATVIDEO = 'http://otq0t8ph7.bkt.clouddn.com/'
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                checked: [true, false],
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: '',
                    brandKey: '',
                    region: '',
                    content:'',
                    status: '即时推送',
                    date: ''
                },
                loading:false,
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                selectedOptions: [],
                content: '', // 文章内容
                editorOption: {
                    placeholder: '请输入内容',
                    modules: { // 配置富文本
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'color': []}, {'background': []}],
                            [{'font': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image', 'video']
                        ]
                    }
                },
                addRange: [],
                uploadData: {},
                photoUrl: '', // 上传图片地址
                uploadType: '', // 上传的文件类型（图片、视频）
                id:''
            };
        },
        computed: {
// 上传七牛的actiond地址，http 和 https 不一样
            qnLocation() {
                return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me'
            }
        },
        // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
        mounted() {
// 为图片ICON绑定事件 getModule 为编辑器的内部属性
            console.log(this.$refs.myQuillEditor.quill)
            this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
            this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler) // 为视频ICON绑定事件
        },
        created() {
            this.$refs = {
                myQuillEditor: HTMLInputElement,
                imgInput: HTMLInputElement
            };
            this.id =
                this.$route.query.id ||
                JSON.parse(sessionStorage.getItem("addNoticeInform").id);
            this.getDetail();
        },
        methods: {
            //获取详情
            getDetail(){
                let that=this;
                let data={
                    id:that.id
                };
                that.loading=true;
                that.$axios
                    .post(api.getNoticeDetailById,data)
                    .then(res=>{
                        if(res.data.code==200){
                            that.form=res.data.data;
                            that.loading=false;
                        }else{
                            that.loading=false;
                            that.$message.warning(res.data.msg);
                        }
                    })
                    .catch(err=>{
                        that.loading=false
                    })
            },
            // 图片上传之前调取的函数
// 这个钩子还支持 promise
            beforeUpload(file) {
                return this.qnUpload(file)
            },
// 图片上传前获得数据token数据
            qnUpload(file) {
                this.fullscreenLoading = true
                const suffix = file.name.split('.')
                const ext = suffix.splice(suffix.length - 1, 1)[0]
                console.log(this.uploadType)
                if (this.uploadType === 'image') { // 如果是点击插入图片
// TODO 图片格式/大小限制
                    alert('上传图片')
                    return this.$axios('common/get_qiniu_token').then(res => {
                        this.uploadData = {
                            key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
                            token: res.data
                        }
                    })
                } else if (this.uploadType === 'video') { // 如果是点击插入视频
                    return this.$axios('common/get_qiniu_token').then(res => {
                        this.uploadData = {
                            key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
                            token: res
                        }
                    })
                }
            },

// 图片上传成功回调 插入到编辑器中
            upScuccess(e, file, fileList) {
                console.log(e)
                this.fullscreenLoading = false
                let vm = this
                let url = ''
                if (this.uploadType === 'image') { // 获得文件上传后的URL地址
                    url = STATICDOMAIN + e.key
                } else if (this.uploadType === 'video') {
                    url = STATVIDEO + e.key
                }
                if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
                    let value = url
// API: https://segmentfault.com/q/1010000008951906
// this.$refs.myTextEditor.quillEditor.getSelection();
// 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
                    vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
                    value = value.indexOf('http') !== -1 ? value : 'http:' + value
                    vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
                } else {
                    this.$message.error(`${vm.uploadType}插入失败`)
                }
                this.$refs['upload'].clearFiles() // 插入成功后清除input的内容
            },

// 点击图片ICON触发事件
            imgHandler(state) {
                this.addRange = this.$refs.myQuillEditor.quill.getSelection()
                if (state) {
                    let fileInput = document.getElementById('imgInput')
                    fileInput.click() // 加一个触发事件
                }
                this.uploadType = 'image'
            },
            onEditorChange({editor, html, text}) {
                console.log('editor change!', html)
                this.form.content = html
            },
// 点击视频ICON触发事件
            videoHandler(state) {
                this.addRange = this.$refs.myQuillEditor.quill.getSelection()
                if (state) {
                    let fileInput = document.getElementById('imgInput')
                    fileInput.click() // 加一个触发事件
                }
                this.uploadType = 'video'
            },
            handleChange(value) {
                console.log(value);
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            change(num) {
                let that = this;
                that.checked = [false, false];
                that.checked[num] = true;

            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.form.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {

            },
            // 提交表单
            submitForm(form) {
            },
        }
    };
</script>
<style lang="less">
    .inf-box {
        .tab-item {
            width: 116px;
            height: 50px;
            line-height: 50px;
            border-radius: 0 0 5px 5px;
            text-align: center;
            color: #fff;
            background: #dddddd;
            display: inline-block;
            cursor: pointer;
        }
        .checked {
            background: #ff6868;
        }
        .label {
            width: 100px;
            text-align: right;
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
        }
        .el-input {
            width: 350px
        }
        .el-input__inner {
            width: 350px
        }
        .classify-area {
            .el-input {
                width: 200px
            }
            .el-input__inner {
                width: 200px
            }
        }
        .required {
            color: #ff1e30;
            margin-right: 5px;
        }
        .el-form-item__label {
            width: 112px;
        }
        .opr-area {
            float: left;
            width: 150px;
            text-align: center;
            margin-left: -10px;
        }
        .opr-area .el-button {
            margin-top: 30px
        }
        .opr-area .el-button:nth-child(2) {
            margin-left: 0
        }
        .check-area {
            float: left;
            width: 191px;
            font-size: 12px;
            color: #999;
            border: 1px solid #dfdfdf;
            margin-right: 10px;
            border-radius: 5px;
        }
        .clearfix {
            clear: both;
            content: ''
        }
        .title {
            background: #eee;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-bottom: 1px solid #dfdfdf;
        }
        ul {
            line-height: 25px;
            height: 120px;
            overflow-y: auto;
            overflow-x: hidden
        }
        ul li {
            list-style: none;
            padding-left: 10px;
            cursor: pointer
        }
        ul li.selected {
            background: #409EFF;
            color: #fff
        }

        .select-area {
            width: 500px;
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 10px;
        }
        .select-area .el-checkbox {
            margin: 0 10px 0
        }
        .select-area .el-checkbox-group {
            font-size: 12px;
            line-height: 10px
        }
        .submit-btn {
            padding: 0 50px 20px 100px
        }
        .el-checkbox-group {
            margin-left: 112px;
        }
        .el-radio {
            display: block;
            margin-left: 0;
            line-height: 32px;
        }
        .el-date-editor {
            position: absolute;
            top: 32px;
            left: 210px;
            .el-input__inner {
                width: 200px;
            }
        }
        .el-date-editor.el-input {
            width: 200px
        }
        .region-area {
            position: relative;
            .el-checkbox {
                display: block;
                margin-left: 0;
            }
        }
        .el-cascader {
            position: absolute;
            top: 0;
            left: 180px;
            .el-input {
                width: 230px;
            }
            .el-input__inner {
                width: 230px;
            }
        }
    }
</style>


