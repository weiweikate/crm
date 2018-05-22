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
                    <el-form-item prop="area">
                        <span class="label"><span class="required">*</span>品牌区域</span>
                        <el-input placeholder="请输入品牌区域" v-model="form.area"></el-input>
                    </el-form-item>
                    <el-form-item class="classify-area" prop="productcIds">
                        <span class="label"><span class="required">*</span>品牌类目</span>
                        <v-choosearea @productcIds="productcIds" v-model="form.productcIds" :detailData="detailData" :addOrUp="isUp?'update':''"></v-choosearea>
                        <div class="clearfix"></div>
                    </el-form-item>
                    <el-form-item label="品牌logo">
                        <el-upload
                                class="avatar-uploader"
                                action="/commonAPI/ossClient/aliyunOSSUploadImage"
                                :show-file-list="false"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleAvatarSuccess"
                        >
                            <img v-if="form.originalImg" :src="form.originalImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <el-input v-model="form.smallImg"></el-input>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="2">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="submit-btn">
                        <el-button type="primary" v-loading="btnLoading" @click="submitForm('form')">确认保存</el-button>
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

    export default {
        components: {
            vBreadcrumb, icon, vChoosearea
        },
        data() {
            return {
                form: {
                    name: "",
                    originalImg: '1111',
                    smallImg:'2222',
                    area: '',
                    status: '1',
                    productcIds:''
                },
                detailData:[],
                btnLoading:false,
                classifyId:[],
                checkAll: false,
                rules: {
                    name: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"}
                    ],
                    area: [
                        {required: true, message: "请输入品牌区域", trigger: "blur"}
                    ],
                    productcIds: [
                        {required: true, message: "请选择品牌类目", trigger: "blur"}
                    ]
                },
                isUp:false,//添加false，修改true
                id:''
            }
        },
        created() {
            let that=this;
            that.id =
                that.$route.query.brandId ||localStorage.getItem('brandId');
            if(that.id){
                that.getDetail();
                that.isUp=true;
            }
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
                    .post(api.findBrandById,data)
                    .then(res=>{
                        if(res.data.code==200){
                            that.loading=false;
                            that.form=res.data.data.product;
                            that.detailData=res.data.data.userProduct;
                        }else{
                            that.loading=false;
                            that.$message.warning(res.data.msg);
                        }
                    })
                    .catch(err=>{
                        that.loading=false
                    })
            },
            handlePreview(file) {
                console.log(file);
            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.form.originalImg = URL.createObjectURL(file.raw);
            },
            productcIds(productcIds){
                this.form.productcIds=productcIds.join(',');
            },
            handleRemove() {
                this.form.originalImg = ''
            },
            // 提交表单
            submitForm(form) {
                let that=this;
                that.btnLoading=true;
                that.$refs[form].validate(valid => {
                        if (valid) {
                            let data = this[form];
                            this.$axios
                                .post(api.addBrand, data)
                                .then(res => {
                                    that.btnLoading=false;
                                    if(res.data.code==200){
                                        that.$message.success(res.data.msg);
                                        setTimeout(function () {
                                            that.$router.push('/brandManage')
                                        },1000)
                                    }else{
                                        that.$message.warning(res.data.msg);
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    that.btnLoading=false;
                                });
                        } else {
                            console.log("error submit!!");
                            that.btnLoading=false;
                            return false;
                        }
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


