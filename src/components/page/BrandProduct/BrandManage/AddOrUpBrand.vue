<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌管理','添加品牌']"></v-breadcrumb>
        <div class="container">
            <div class="brand-box">
                <el-form :model="form" ref="form" :rules="rules">
                    <el-form-item prop="name">
                        <span class="label"><span class="required">*</span>品牌名称</span>
                        <el-input placeholder="请输入品牌名称" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="region">
                        <span class="label"><span class="required">*</span>品牌区域</span>
                        <el-input placeholder="请输入品牌区域" v-model="form.area"></el-input>
                    </el-form-item>
                    <el-form-item class="classify-area" prop="productcIds">
                        <span class="label"><span class="required">*</span>品牌类目</span>
                        <v-choosearea @productcIds="productcIds" v-model="form.productcIds"></v-choosearea>
                        <div class="clearfix"></div>
                    </el-form-item>
                    <el-form-item label="品牌logo">
                        <el-upload
                                class="avatar-uploader"
                                action="111"
                                :show-file-list="false"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.originalImg" :src="form.originalImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <el-input v-model="form.smallImg"></el-input>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-radio-group v-model="form.status">
                            <el-radio label="启用"></el-radio>
                            <el-radio label="停用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="submit-btn">
                        <el-button type="primary" @click="submitForm('form')">确认保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import vChoosearea from '../../../common/chooseBrandClassify.vue';
    import * as api from '../../../../api/api'

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            vBreadcrumb, icon, vChoosearea
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    originalImg: '',
                    productcIds: [],
                    region: '',
                    status: '启用'
                },
                classifyId:[],
                activeName2: 'first',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                rules: {
                    name: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"}
                    ],
                    region: [
                        {required: true, message: "请输入品牌区域", trigger: "blur"}
                    ],
                    productcIds: [
                        {required: true, message: "请选择品牌类目", trigger: "blur"}
                    ]
                },
            }
        },
        created() {
            let that=this;
            // that.$on('productcIds',function (aa) {
            //     console.log(aa)
            // })
        },
        methods: {
            handlePreview(file) {
                console.log(file);
            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.form.originalImg = URL.createObjectURL(file.raw);
            },
            productcIds(productcIds){
                this.form.productcIds=JSON.stringify(productcIds);
            },
            beforeAvatarUpload(file) {
                var that = this;
                let fd = new FormData();
                fd.append("file", file);
                this.$axios
                    .post(api.addImg, fd, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message.success("上传成功！");
                            that.form.originalImg = res.data.data.originalImg;
                        } else {
                            that.$message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleRemove() {
                this.form.originalImg = ''
            },
            // 提交表单
            submitForm(form) {
                let that=this;
                that.$refs[form].validate(valid => {
                    // if(that.classifyId.length){
                        // console.log(that.$emit('productcIds')
                        if (valid) {
                            let data = this[form];
                            this.$axios
                                .post(api.addBrand, data)
                                .then(res => {

                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        } else {
                            console.log("error submit!!");
                            return false;
                        }
                    // }

                });
            },
            //取消
            cancel() {
                this.$router.push('/brandManage')
            },

        }
    };
</script>
<style lang="less">
    .brand-box {
        .label {
            width: 100px;
            text-align: right;
            display: inline-block;
            margin-right: 10px;
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

        .clearfix {
            clear: both;
            content: ''
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
        .avatar-uploader {
            height: 70px;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
        }
        .avatar {
            width: 70px;
            height: 70px;
            display: block;
        }
        .el-upload--text {
            width: 70px;
            height: 70px;
        }
        .el-form-item__error {
            margin-left: 120px;
        }
    }
</style>


