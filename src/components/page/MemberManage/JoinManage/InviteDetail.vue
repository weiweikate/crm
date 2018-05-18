<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商加盟管理','邀请详情']"></v-breadcrumb>
        <div class="container">
            <div class="basic-inf-area line">
                <div class="item-row">
                    邀请层级：{{detail.ID}}
                </div>
                <div class="item-row">
                    授权品牌：
                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            color="#fff"
                            :disable-transitions="false">
                        {{tag}}
                    </el-tag>
                </div>
                <div class="item-row">
                    授权品类：
                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            color="#fff"
                            :disable-transitions="false">
                        {{tag}}
                    </el-tag>
                </div>
                <div class="item-row">
                    授权渠道：
                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            color="#fff"
                            :disable-transitions="false">
                        {{tag}}
                    </el-tag>
                </div>
                <div class="item-row">
                    授权时间：
                    2018-02-12 12:22:22 至 2018-02-12 12:22:22
                </div>
                <div class="item-row">
                    邀请失效期：
                    2018-02-12 12:22:22
                </div>
                <div class="item-row">
                    邀请管理员：
                    张三
                </div>
                <div class="item-row">
                    邀请时间：
                    2018-02-12 12:22:22
                </div>

            </div>
            <div class="basic-inf-area">
                <div class="title">
                    邀请成功：
                </div>
                <div>
                    <div class="succ-item">
                        <div class="left">
                            <img src="../../../../assets/images/logo.png" alt="">
                        </div>
                        <div class="center">
                            <div>张三</div>
                            <div>体验VIP</div>
                        </div>
                        <div class="right">
                            <div>联系方式：12345678911</div>
                            <div class="color-blue">用户详情 》</div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="succ-item">
                        <div class="left">
                            <img src="../../../../assets/images/logo.png" alt="">
                        </div>
                        <div class="center">
                            <div>张三</div>
                            <div>体验VIP</div>
                        </div>
                        <div class="right">
                            <div>联系方式：12345678911</div>
                            <div class="color-blue">用户详情 》</div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="succ-item">
                        <div class="left">
                            <img src="../../../../assets/images/logo.png" alt="">
                        </div>
                        <div class="center">
                            <div>张三</div>
                            <div>体验VIP</div>
                        </div>
                        <div class="right">
                            <div>联系方式：12345678911</div>
                            <div class="color-blue">用户详情 》</div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="succ-item">
                        <div class="left">
                            <img src="../../../../assets/images/logo.png" alt="">
                        </div>
                        <div class="center">
                            <div>张三</div>
                            <div>体验VIP</div>
                        </div>
                        <div class="right">
                            <div>联系方式：12345678911</div>
                            <div class="color-blue">用户详情 》</div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <div style="margin:50px">
                <el-button type="primary" @click="backToList">返回列表</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import icon from '../../../common/ico.vue';
    import * as api from '../../../../api/api';

    export default {
        components: {
            icon, vBreadcrumb,
        },
        data: function () {
            return {
                detail: {
                    ID: '122',
                    openid: '2121',
                    nickName: '32434',
                    idCard: '429006199405133623',
                    phone: '13826581142',
                    number: '1234'
                },
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
            }
        },
        created() {
            this.getDetail()
        },
        methods: {
            getDetail() {
                let id = this.$route.query.id;
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //返回列表
            backToList() {
                this.$router.push('/joinManage')
            },
        }
    }
</script>
<style scoped>
    .container {
        font-size: 14px;
        color: #606266;
        height: auto;
        margin-bottom: 20px;
        padding: 30px 0 30px 80px;
    }

    .title {
        margin-bottom: 10px;
        font-size: 16px;
        color: #666
    }

    .tags-area {
        margin-top: 10px
    }

    .line {
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 20px;
    }
.left{
    float: left;
    width: 60px;
}
    .center{
        float: left;
        width: 100px;
    }
.right{
    float: right;
    text-align: right;
}
    .clearfix {
        clear: both
    }

    .item-row {
        height: 40px;
        line-height: 40px;
    }

    .color-blue {
        color: #20a0ff
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #999;
    }

    .el-tag {
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
        vertical-align: middle;
    }

    .input-new-tag {
        width: 200px
    }

    .succ-item {
        width: 370px;
        height: 52px;
        line-height: 27px;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        padding: 8px 12px;
        display: inline-block;
        margin:0 10px 10px 0;
    }
</style>