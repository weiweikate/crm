<template>
    <div class="edit-basic-mask">
        <div class="box">
            <div class="mask-title">基础信息编辑</div>
            <div class="mask-content">
                <el-form :model="form">
                    <div class="left">
                        <div class="form-item">
                            <el-form-item label="用户ID">
                                {{}}
                            </el-form-item>
                            <el-form-item label="微信openid" class="special">
                                {{}}
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="昵称">
                                <el-input v-model="form.name" placeholder="请输入昵称" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="微信号">
                                <el-input v-model="form.name" placeholder="请输入微信号" size="medium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="姓名">
                                <el-input v-model="form.name" placeholder="请输入用户姓名" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="form.name" placeholder="请输入手机号" size="medium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="身份证号">
                                <el-input v-model="form.name" placeholder="请输入身份证号码" size="medium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="地址信息">
                                <el-input v-model="form.name" placeholder="详细地址..." size="medium"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="right">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <img v-else src="../../../../assets/images/logo.png" alt="">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <el-button type="primary">编辑头像</el-button>
                        </el-upload>
                        <div class="tip">请上传jpg，png格式</div>
                    </div>
                    <div class="clearfix"></div>

                    <el-form-item class="submit-btn">
                        <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                        <el-button @click="closeToask">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import icon from "../../../common/ico";

    export default {
        components: {
            icon
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: ''
                }
            };
        },
        methods: {
            //  取消弹窗
            closeToask() {
                this.$emit("status", false);
            },
            //上传头像
            handleAvatarSuccess(res, file) {
                console.log(file.raw)
                this.form.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                }
                return isJPG;
            },
            // 提交表单
            submitForm(form) {
                this.closeToask();
            }
        }
    };
</script>
<style lang="less">
    .edit-basic-mask {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        .box {
            width: 840px;
            height: 482px;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            .mask-title {
                width: 100%;
                height: 56px;
                border-bottom: 1px solid #ccc;
                padding-left: 45px;
                box-sizing: border-box;
                line-height: 56px;
                color: #ff6868;
                font-weight: 700;
            }
            .mask-content {
                position: relative;
                width: 100%;
                overflow: hidden;
                padding: 10px 45px 0 45px;
                box-sizing: border-box;
                .submit-btn {
                    margin-top: 30px;
                    padding-left: 225px;
                    box-sizing: border-box;
                }
            }
        }
        .left {
            float: left;
            width: 80%
        }
        .right {
            float: left;
            width: 20%;
            text-align: center;
            padding: 20px 0 0
        }
        .clearfix {
            clear: both
        }
        .form-item {
            width: 100%;
            display: inline-block
        }
        .el-form-item {
            width: 48%;
            float: left;
            margin-right: 2%
        }
        .el-form-item__label {
            width: 70px;
            text-align: left
        }
        .special .el-form-item__label {
            width: 100px;
            text-align: left
        }
        .el-form-item__content {
            margin-left: 70px;
        }
        .el-input__inner {
            width: 200px
        }
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar {
            width: 100px;
            height: 100px;
            display: block;
        }
        .el-upload--text {
            width: 80px;
            height: 32px;
            border: none;
        }
        .tip{font-size: 12px;color: #999}
        .submit-btn{width: 100%;text-align: right}
    }
</style>


