<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌管理','添加品牌']"></v-breadcrumb>
        <div class="container">
            <div class="brand-box">
                <el-form :model="form">
                    <el-form-item>
                        <span class="label"><span class="required">*</span>品牌名称</span>
                        <el-input placeholder="请输入品牌名称" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class="label"><span class="required">*</span>品牌区域</span>
                        <el-input placeholder="请输入品牌区域" v-model="form.region"></el-input>
                    </el-form-item>
                    <el-form-item class="classify-area">
                        <span class="label"><span class="required">*</span>品牌类目</span>
                        <el-input
                                placeholder="输入品牌关键词搜索"
                                suffix-icon="el-icon-search"
                                v-model="form.brandKey">
                        </el-input>
                        <div style="margin: 10px 114px">
                            <div class="check-area">
                                <div class="title">选择品牌</div>
                                <div>
                                    <ul>
                                        <li class="selected">朵女郎</li>
                                        <li>迪奥</li>
                                        <li>自然堂</li>
                                        <li>珀莱雅</li>
                                        <li>LV</li>
                                        <li>丝芙兰</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="check-area">
                                <div class="title">选择品类</div>
                                <div>
                                    <ul>
                                        <li>纺织品</li>
                                        <li>化妆品</li>
                                        <li>箱包</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="opr-area">
                                <el-button type="primary">添加品类</el-button>
                                <el-button>删除品类</el-button>
                            </div>
                            <div class="check-area">
                                <div class="title">已选择品牌-品类</div>
                                <div>
                                    <ul>
                                        <li>朵女郎-纺织品</li>
                                        <li>自然堂-化妆品</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </el-form-item>
                    <el-form-item label="品牌logo">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: '',
                    brandKey: '',
                    region: '',
                    status: '启用'
                },
                activeName2: 'first',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
            };
        },
        methods: {
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
        .avatar-uploader{
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
    }
</style>


