<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商加盟管理','邀请详情']"></v-breadcrumb>
        <div class="container" v-loading="loading">
            <div class="basic-inf-area line">
                <div class="item-row">
                    邀请层级：{{detail.id}}
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
                    {{detail.startTime|formatDate}} 至 {{detail.endTime|formatDate}}
                </div>
                <div class="item-row" v-if="detail.invalidType==1">
                    邀请失效期：
                    {{detail.invalidTime|formatDate}}
                </div>
                <div class="item-row" v-else>
                    邀请链接打开次数：
                    {{detail.clickTimes|formatDate}}
                </div>
                <div class="item-row">
                    邀请管理员：
                    {{detail.name}}
                </div>
                <div class="item-row">
                    邀请时间：
                    {{detail.create_time|formatDate}}
                </div>

            </div>
            <div class="basic-inf-area">
                <div class="title">
                    邀请成功：
                </div>
                <div>
                    <div class="succ-item" v-for="item in detail.success">
                        <div class="left">
                            <img :src="item.pic?item.pic:'src/assets/images/logo.png'" alt="">
                        </div>
                        <div class="center">
                            <div>{{item.name}}</div>
                            <div>{{item.level}}</div>
                        </div>
                        <div class="right">
                            <div>联系方式：{{item.phone}}</div>
                            <div class="color-blue" @click="toUserDetail(item)">用户详情 》</div>
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
                detail: {},
                id:'',
                loading:false,
            }
        },
        created() {
            this.id =
                this.$route.query.id ||
                JSON.parse(sessionStorage.getItem("inviteDetail").id);
            this.getDetail()
        },
        methods: {
            //获取详情
            getDetail() {
                let that=this;
                let data={
                    id:that.id
                };
                that.$axios
                    .post(api.findInviteInfo, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.loading=false;
                            that.detail=res.data.data;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.loading=false;
                        }
                    })
                    .catch(err => {
                        that.loading = false;
                        console.log(err)
                    })
            },
            //返回列表
            backToList() {
                this.$router.push('/joinManage')
            },
            //跳到用户详情页面
            toUserDetail(item){
                localStorage.setItem('memberDetail',item.id);
                this.$router.push({path:'/memberDetail',query:{id:item.id}})
            }
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