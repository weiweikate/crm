import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    name:'dashboard',
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                // 授权管理
                {
                    name:'channelItemManage',
                    path: '/channelItemManage',
                    component: resolve => require(['../components/page/Authorization/ChannelItemManage.vue'], resolve),
                    meta: { title: '渠道类目管理' }
                },
                {
                    name:'secondChannel',
                    path: '/secondChannel',
                    component: resolve => require(['../components/page/Authorization/SecondChannel.vue'], resolve),
                    meta: { title: '二级渠道' }
                },
                {
                    name:'certificateUse',
                    path: '/certificateUse',
                    component: resolve => require(['../components/page/Authorization/CertificateUse.vue'], resolve),
                    meta: { title: '授权证书模板' }
                },
                {
                    name:'contractReview',
                    path: '/contractReview',
                    component: resolve => require(['../components/page/Authorization/ContractReview.vue'], resolve),
                    meta: { title: '续约审核' }
                },
                {
                    name:'form',
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                // 品牌产品管理
                {
                    name:'brandProductClassify',
                    path: '/brandProductClassify',
                    component: resolve => require(['../components/page/BrandProduct/BrandProductClassify.vue'], resolve),
                    meta: { title: '产品分类管理' }
                },
                {
                    name:'secondClassify',
                    path: '/secondClassify',
                    component: resolve => require(['../components/page/BrandProduct/SecondClassify.vue'], resolve),
                    meta: { title: '二级类目' }
                },
                {
                    name:'brandManage',
                    path: '/brandManage',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage.vue'], resolve),
                    meta: { title: '品牌管理' }
                },
                {
                    name:'addOrUpBrand',
                    path: '/addOrUpBrand',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage/AddOrUpBrand.vue'], resolve),
                    meta: { title: '添加品牌' }
                },
                // 会员管理
                {
                    name:'levelManage',
                    path: '/levelManage',
                    component: resolve => require(['../components/page/MemberManage/LevelManage.vue'], resolve),
                    meta: { title: '经销商层级管理' }
                },
                {
                    name:'joinManage',
                    path: '/joinManage',
                    component: resolve => require(['../components/page/MemberManage/JoinManage.vue'], resolve),
                    meta: { title: '经销商加盟管理' }
                },
                {
                    name:'memberManage',
                    path: '/memberManage',
                    component: resolve => require(['../components/page/MemberManage/MemberManage.vue'], resolve),
                    meta: { title: '经销商会员管理' }
                },
                {
                    name:'memberDetail',
                    path: '/memberDetail',
                    component: resolve => require(['../components/page/MemberManage/MemberDetail.vue'], resolve),
                    meta: { title: '会员详情' }
                },
                {
                    name:'memberTree',
                    path: '/memberTree',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberTree.vue'], resolve),
                    meta: { title: '会员树状图' }
                },
                {
                    name:'sendInvite',
                    path: '/sendInvite',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/SendInvite.vue'], resolve),
                    meta: { title: '邀请发起' }
                },
                {
                    name:'inviteDetail',
                    path: '/inviteDetail',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/InviteDetail.vue'], resolve),
                    meta: { title: '邀请详情' }
                },
                {
                    name:'inviteLink',
                    path: '/inviteLink',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/InviteLink.vue'], resolve),
                    meta: { title: '邀请链接' }
                },
                // 溯源管理
                {
                    name:'rootsCodeMange',
                    path: '/rootsCodeMange',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeMange.vue'], resolve),
                    meta: { title: '溯源防伪码管理' }
                },
                {
                    name:'rootsCodeQuery',
                    path: '/rootsCodeQuery',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeQuery.vue'], resolve),
                    meta: { title: '防伪码查询' }
                },
                {
                    name:'rootsCodeTpl',
                    path: '/rootsCodeTpl',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeTpl.vue'], resolve),
                    meta: { title: '防伪码模板' }
                },
                // 权限管理
                {
                    name:'manageList',
                    path: '/manageList',
                    component: resolve => require(['../components/page/Permission/ManageList.vue'], resolve),
                    meta: { title: '账号管理' }
                },
                {
                    name:'addManger',
                    path: '/addManger',
                    component: resolve => require(['../components/page/Permission/AddManger.vue'], resolve),
                    meta: { title: '添加管理员' }
                },
                {
                    name:'editManger',
                    path: '/editManger',
                    component: resolve => require(['../components/page/Permission/EditManger.vue'], resolve),
                    meta: { title: '编辑管理员' }
                },
                {
                    name:'showMangeLog',
                    path: '/showMangeLog',
                    component: resolve => require(['../components/page/Permission/ShowMangeLog.vue'], resolve),
                    meta: { title: '操作日志' }
                },
                {
                    name:'jobsPermissionMange',
                    path: '/jobsPermissionMange',
                    component: resolve => require(['../components/page/Permission/JobsPermissionMange.vue'], resolve),
                    meta: { title: '岗位权限管理' }
                },
                {
                    name:'addJobsPermission',
                    path: '/addJobsPermission',
                    component: resolve => require(['../components/page/Permission/AddJobsPermission.vue'], resolve),
                    meta: { title: '添加岗位权限' }
                },
                {
                    name:'editJobsPermission',
                    path: '/editJobsPermission',
                    component: resolve => require(['../components/page/Permission/EditJobsPermission.vue'], resolve),
                    meta: { title: '编辑岗位权限' }
                },
                {
                    name:'setPermission',
                    path: '/setPermission',
                    component: resolve => require(['../components/page/Permission/SetPermission.vue'], resolve),
                    meta: { title: '权限设置' }
                },
                {
                    name:'editMangerMsg',
                    path: '/editMangerMsg',
                    component: resolve => require(['../components/page/Permission/EditMangerMsg.vue'], resolve),
                    meta: { title: '管理员基础信息修改' }
                },
            ]
        },
        {
            name:'login',
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            name:'404',
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
