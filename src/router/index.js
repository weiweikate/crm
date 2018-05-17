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
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                // 授权管理
                {
                    path: '/channelItemManage',
                    component: resolve => require(['../components/page/Authorization/ChannelItemManage.vue'], resolve),
                    meta: { title: '渠道类目管理' }
                },
                {
                    path: '/secondChannel',
                    component: resolve => require(['../components/page/Authorization/SecondChannel.vue'], resolve),
                    meta: { title: '二级渠道' }
                },
                {
                    path: '/certificateUse',
                    component: resolve => require(['../components/page/Authorization/CertificateUse.vue'], resolve),
                    meta: { title: '授权证书模板' }
                },
                {
                    path: '/contractReview',
                    component: resolve => require(['../components/page/Authorization/ContractReview.vue'], resolve),
                    meta: { title: '续约审核' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                // 品牌产品管理
                {
                    path: '/brandProductClassify',
                    component: resolve => require(['../components/page/BrandProduct/BrandProductClassify.vue'], resolve),
                    meta: { title: '产品分类管理' }
                },
                {
                    path: '/secondClassify',
                    component: resolve => require(['../components/page/BrandProduct/SecondClassify.vue'], resolve),
                    meta: { title: '二级类目' }
                },
                // 会员管理
                {
                    path: '/levelManage',
                    component: resolve => require(['../components/page/MemberManage/LevelManage.vue'], resolve),
                    meta: { title: '经销商层级管理' }
                },
                {
                    path: '/joinrManage',
                    component: resolve => require(['../components/page/MemberManage/JoinManage.vue'], resolve),
                    meta: { title: '经销商加盟管理' }
                },
                {
                    path: '/memberManage',
                    component: resolve => require(['../components/page/MemberManage/MemberManage.vue'], resolve),
                    meta: { title: '经销商会员管理' }
                },
                {
                    path: '/memberDetail',
                    component: resolve => require(['../components/page/MemberManage/MemberDetail.vue'], resolve),
                    meta: { title: '会员详情' }
                },
                // 溯源管理
                {
                    path: '/rootsCodeMange',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeMange.vue'], resolve),
                    meta: { title: '溯源防伪码管理' }
                },
                {
                    path: '/rootsCodeQuery',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeQuery.vue'], resolve),
                    meta: { title: '防伪码查询' }
                },
                {
                    path: '/rootsCodeTpl',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeTpl.vue'], resolve),
                    meta: { title: '防伪码模板' }
                },
                {
                    // 权限页面
                    path: '/manageList',
                    component: resolve => require(['../components/page/Permission/ManageList.vue'], resolve),
                    meta: { title: '账号管理' }
                },
                {
                    path: '/permissionMange',
                    component: resolve => require(['../components/page/Permission/PermissionMange.vue'], resolve),
                    meta: { title: '角色权限管理' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
