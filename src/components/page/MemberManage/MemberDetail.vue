<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情']"></v-breadcrumb>
        <div class="container">
            <div class="basic-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>基础信息</h3>
                    </div>
                    <div class="item-row">
                        <div class="item">用户ID：{{detail.ID}}(邀请码)</div>
                        <div class="item">微信openid：{{detail.openid}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">昵称：{{detail.nickName}}</div>
                        <div class="item">身份证号：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">手机号：{{detail.phone}}</div>
                        <div class="item">系统版本：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">姓名：{{detail.phone}}</div>
                        <div class="item">微信版权获取区域：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">微信号：{{detail.phone}}</div>
                        <div class="item">最近登录时间：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">注册时间：{{detail.phone}}</div>
                        <div class="item">本日登录：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">手机型号：{{detail.phone}}</div>
                        <div class="item">本月登录：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">微信版本：{{detail.phone}}</div>
                        <div class="item">共登录次数：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">地址信息 ：{{detail.phone}}</div>
                    </div>
                </div>
                <div class="center">
                    <el-button @click="updateBasicInf">修改</el-button>
                </div>
                <div class="right">
                    <div>
                        <img class="img" src="../../../assets/images/logo.png" alt="">
                    </div>
                    <div>
                        <el-button type="primary" @click="toLowerAgent">下级代理({{detail.number}})</el-button>
                    </div>
                   <div>
                       <el-button type="primary" @click="toMemberTree" style="margin-left: 0">查看会员树状图</el-button>
                   </div>
                    <!--<el-button type="primary" style="margin-left: 0">用户操作日志</el-button>-->
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="author-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>授权信息</h3>
                    </div>
                    <div class="item-row">
                        <div class="item">上级代理：{{detail.ID}}(邀请码)</div>
                        <div class="item">授权层级：{{detail.openid}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">授权码：{{detail.nickName}}</div>
                        <div class="item">授权时间：{{detail.idCard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">授权品牌：
                            <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                color="#fff"
                                :disable-transitions="false">
                            {{tag}}
                        </el-tag></div>
                    </div>
                    <div class="item-row">
                        <div class="item">授权品类：{{detail.phone}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">授权渠道：{{detail.phone}}</div>
                    </div>
                </div>
                <div class="center">
                    <el-button @click="updateAuthorInf">修改</el-button>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="promote-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>晋升记录</h3>
                    </div>
                    <div class="item-row">
                        <div class="item">
                            <span>实习省代--省级代理</span>
                            <span style="margin-left: 20px">2018-05-12 12:32:31</span>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="item">
                            <span>实习省代--省级代理</span>
                            <span style="margin-left: 20px">2018-05-12 12:32:31</span>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="others-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>其他信息</h3>
                    </div>
                    <div class="item-row">
                        <div class="item-row">
                            <div class="item">获得荣誉：<span class="color-blue">{{detail.ID}}</span></div>
                        </div>
                        <div class="item-row">
                            <div class="item">消费金额：<span class="color-red">{{detail.ID}}</span>/元</div>
                            <div class="item">经验值积分：{{detail.ID}}</div>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="user-tag-area">
                <div class="title">
                    <h3>用户标签</h3>
                </div>
                <div class="tags-area">
                    <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            color="#fff"
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <div style="margin-top: 20px">
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                                placeholder="请输入标签文字"
                        >
                        </el-input>
                        <el-button type="primary" class="button-new-tag" @click="showInput">添加标签</el-button>
                    </div>
                </div>
            </div>

            <div style="margin:50px">
                <el-button type="primary" @click="backToList">返回列表</el-button>
            </div>
        </div>
        <!--基础信息修改弹窗-->
        <edit-basic @status='closeEditBasic' v-if="isShowEditBasic"></edit-basic>
        <!--授权信息修改弹窗-->
        <edit-author @status='closeEditAuthor' v-if="isShowEditAuthor"></edit-author>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import editBasic from './MemberManage/editBasicInf'
    import editAuthor from './MemberManage/editAuthorInf'
    import icon from '../../common/ico.vue';
    import * as api from '../../../api/api';

    export default {
        components: {
            icon, vBreadcrumb,editBasic,editAuthor
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
                isShowEditBasic:false,
                isShowEditAuthor:false,
                formLabelWidth:'100px',
                form:{
                    ID: '122',
                    openid: '2121',
                    nickName: '32434',
                    idCard: '429006199405133623',
                    phone: '13826581142',
                    number: '1234'
                }
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
                this.$router.push('/memberManage')
            },
            //跳到下级代理页面
            toLowerAgent(){
               this.$router.push({path:'/memberManage',query:{}})
            },
            //跳到会员树状图页面
            toMemberTree(){
               this.$router.push({path:'/memberTree',query:{}})
            },
            //修改基础信息
            updateBasicInf(){
                this.isShowEditBasic=true;
            },
            //修改授权信息
            updateAuthorInf(){
                this.isShowEditAuthor=true;
            },
            // 关闭编辑弹窗
            closeEditBasic(msg) {
                this.isShowEditBasic = msg;
            },
            // 关闭编辑弹窗
            closeEditAuthor(msg) {
                this.isShowEditAuthor = msg;
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

    .left {
        float: left;
        width: 70%;
        height: auto
    }

    .center {
        float: left;
        width: 10%;
        height: auto
    }

    .right {
        float: right;
        width: 20%;
        height: auto;
        text-align: center;
    }
    .title{margin-bottom: 10px}
    .tags-area {
        margin-top: 10px
    }

    .line {
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 20px;
    }

    .clearfix {
        clear: both
    }

    .item-row {
        height: 40px;
        line-height: 40px;
    }

    .item {
        width: 50%;
        float: left
    }

    .color-blue {
        color: #20a0ff
    }

    .color-red {
        color: #ff1e30;
        font-size: 20px
    }

    .img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        border: 2px solid #dfdfdf;
    }

    .right .el-button {
        width: 160px;
        height: 40px;
        margin-top: 10px
    }

    .el-tag {
        height: 32px;
        line-height: 32px;
        margin-right: 10px
    }

    .input-new-tag {
        width: 200px
    }

</style>