// 登陆接口
export const LOGIN = '/mock/5a9dec734a2b3e6652a9c8f1/example/login';

//获取产品分类列表
export const getProductList='/mock/5aeac1c6c186102e067af3f3/test/getBrandProductList';
//获取产品二级分类列表
export const getSecondProductList='/mock/5aeac1c6c186102e067af3f3/test/getSecondProductList';


//获取层级管理列表
export const getLevelList='/mock/5aeac1c6c186102e067af3f3/test/getLevelList';
//获取会员管理列表
export const getManageList='/mock/5aeac1c6c186102e067af3f3/test/getManageList';

// -----------------------------------------------------正式接口--------------------------------------
// 登陆相关
    // 密码登陆 
    export const loginByPwd ='/admin/adminLogin/pswLogin';
    // 获取验证码
    export const getCode = '/commonAPI/phoneCode/sendLoginCode';
    // 验证码登陆
    export const loginByCode = '/admin/adminLogin/codeLogin';

// 溯源管理
    // 获取所有防伪码模板列表
    export const rootsGetCodeTplList = '/admin/securityCodeTemplate/getPage';
    // 新增防伪码模板
    export const rootsAddCodeTplList = '/admin/securityCodeTemplate/add';
    // 查询防伪码模板
    export const rootsQueryCodeTplList = '/admin/securityCodeTemplate/findById';
    // 修改防伪码模板
    export const rootsEditCodeTplList = '/admin/securityCodeTemplate/updateById';
    // 删除防伪码模板
    export const rootsDelCodeTplList = '/admin/securityCodeTemplate/deleteById';

// 权限管理
    // 获取管理员列表
    export const getMangerList = '/admin/adminUser/queryAdminUserPageList';
    // 查看管理员操作日志
    export const getMangerLog = '/admin/logAdminuser/getPage';

// 品牌产品管理
    // 获取一二级类目列表
    export const getCategoryList = '/admin/productCategory/queryProductCategoryPageList';
    // 添加一二级类目
    export const addCategory = '/admin/productCategory/addProductCategory';
    // 编辑一二级类目
    export const editCategory = '/admin/productCategory/updateProductCategory';
    // 删除一二级类目
    export const deleteCategory = '/admin/productCategory/deleteProductCategory';
    
    // 上传图片
    export const uploadImg = '/commonAPI/ossClient/aliyunOSSUploadImage';