<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情','会员树状图']"></v-breadcrumb>
        <transition name="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form" label-width="120">
                    <el-form-item label="用户名">
                        <el-input style="width:200px" placeholder="用户名" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户ID">
                        <el-input style="width:200px" placeholder="请输入用户昵称" v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="授权码">
                        <el-input style="width:200px" placeholder="请输入授权码" v-model="form.code"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="search" type="primary">查询</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <div class="tree-block">
            <div class="first-title" v-for="(item,index) in list">
                <div @click="expandLower(index)" class="click-area">
                    <span>{{item.name}}</span>
                    <span v-if="item.name=='下级代理'" class="count-area">343434人</span>
                    <i :class="item.checked?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
                </div>
                <div v-if="item.name=='上级代理'" class="first-child" v-for="child in childList" :class="item.checked?'':'isHidden'">
                    <div class="img-area">
                        <img src="../../../../assets/images/logo.png" alt="">
                    </div>
                    <div class="detail-area">
                        <div>用户名：{{child.name}}</div>
                        <div>用户ID：{{child.id}}<span>授权号：{{child.code}}</span></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div v-else>
                    <!--直接代理-->
                    <div class="direct-area">
                        <div class="">直接代理-{{}}</div>
                        <!--间接代理-->
                        <div class="indirect-area">

                        </div>
                    </div>
                </div>
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
            vBreadcrumb, icon
        },
        data() {
            return {
                form: {
                    id: '',
                    name: '',
                    code: '',
                    idCard: '',
                    phone: ''
                },
                list: [{
                    name: '上级代理',
                    checked: false
                }, {
                    name: '下级代理',
                    checked: false
                }],
                childList: [{
                    name: '张三',
                    id: '1212',
                    code: '32424'
                },{
                    name: '张三',
                    id: '1212',
                    code: '32424'
                }],
            }
        },
        created() {

        },
        methods: {
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val
                };
                this.$axios
                    .post(api.getManageList, data)
                    .then(res => {

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //查询
            search() {

            },
            //展开收起下级
            expandLower(index) {
                this.list[index].checked = !this.list[index].checked;
            }
        }
    }
</script>

<style lang="less">
    .tree-block {
        padding: 20px 60px;
        background: #fff;
        width: auto;
        i {
            color: #999;
        }
        .first-area .el-collapse-item__header {
            width: 100px;
            border-bottom: none
        }
        .el-collapse {
            border: none
        }
        .el-collapse-item__content {
            padding-bottom: 0
        }
        .count-area{margin: 0 10px}
        .first-child {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #dfdfdf;
            .img-area {
                float: left;
                width: 80px;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;
                    border: 2px solid #dfdfdf
                }
            }
            .detail-area {
                float: left;
                margin-top: 10px;
                color: #666;
                font-size: 14px;
                span {
                    margin-left: 10px
                }
            }
        }
        .isHidden {
            display: none
        }
        .click-area {
            cursor: pointer;
            line-height: 40px;
        }
    }

</style>