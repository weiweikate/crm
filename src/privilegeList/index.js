// 授权管理
    // 添加渠道类目
        // 添加一级渠道类目
        export const addPermitChannel_1 = '/admin/permitChannel/addPermitChannel_1';
        // 编辑一级渠道类目
        export const updatePermitChannel_1 = '/admin/permitChannel/updatePermitChannel_1';
        // 添加二级渠道类目
        export const addPermitChannel_2 = '/admin/permitChannel/addPermitChannel_2';
        // 编辑二级渠道类目
        export const updatePermitChannel_2 = '/admin/permitChannel/updatePermitChannel_2';
        // 删除二级渠道类目
        export const updatePermitChannel_3 = '/admin/permitChannel/updatePermitChannel_3'
// 溯源管理
    // 防伪码模板
        // 添加模板
        export const addCodeTemplate = '/admin/securityCodeTemplate/add';
        // 编辑模板
        export const updateCodeTemplate = '/admin/securityCodeTemplate/updateById';
        // 删除摸板
        export const deleteCodeTemplate = '/admin/securityCodeTemplate/deleteById';
        // 失效模板
        export const loseCodeTemplate = '/admin/securityCodeTemplate/loseById';
// 权限管理
    // 管理员账号管理
        // 新建管理员
        export const addAdminUser = '/admin/adminUser/addAdminUser'
        // 编辑管理员
        export const updateAdminUser = '/admin/adminUser/updateAdminUser'
        // 密码重置
        export const resetPassword = '/admin/adminUser/resetPassword'
        // 查看日志
        export const showAdminLog = '/admin/logAdminuser/getPage'
        // 账号开启、关闭
        export const updateAdminUserStatus = '/admin/adminUser/updateAdminUserStatus'
        // 账号删除
        export const deleteAdminUser = '/admin/adminUser/deleteAdminUser'
    // 岗位权限管理
        // 添加岗位
        export const addRole = '/admin/role/addRole';
        // 编辑岗位
        export const updateRole = '/admin/role/updateRole';
        // 删除岗位
        export const deleteRole = '/admin/role/deleteRole';
    // 权限设置
        // 新增功能模块
        // 添加权限