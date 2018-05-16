<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情']"></v-breadcrumb>
        <div class="container">
            <div class="basic-inf-area">
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
                </div>
                <div class="center"></div>
                <div class="right"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import * as api from '../../../api/api';

    export default {
        components:{
            icon,vBreadcrumb
        },
        data: function(){
            return {
                detail:{
                    ID:'',
                    openid:'',
                    nickName:'',
                    idCard:'',
                    phone:''
                }
            }
        },
        created(){
            this.getDetail()
        },
        methods: {
            getDetail(){
                let id=this.$route.query.id;
            }
        }
    }
</script>