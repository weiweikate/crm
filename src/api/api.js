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

// 授权管理
    // 续约审核
    export const queryPermitRecordList ='/admin/permitRecord/queryPermitRecordList';

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
    // 获取管理员权限列表
    export const getRoleList = '/admin/privilege/queryPrivilegeList';
    // 添加管理员
    export const addManger = '/admin/adminUser/addAdminUser';

// 品牌产品管理
    // 获取一二级类目列表
    export const getCategoryList = '/admin/productCategory/queryProductCategoryPageList';
    // 添加一二级类目
    export const addCategory = '/admin/productCategory/addProductCategory';
    // 编辑一二级类目
    export const editCategory = '/admin/productCategory/updateProductCategory';
    // 删除一二级类目
    export const deleteCategory = '/admin/productCategory/deleteProductCategory';
    // 获取品牌列表
    export const getBrandList='/admin/brand/queryBrandPageList';
    export const getFirstList='/admin/productCategory/queryProductCategoryName';
    export const getSecondList='/admin/productCategory/queryProductCategoryFatherid';
    //添加品牌
    export const addBrand='/admin/brand/addBrand';
    //获取产品分类列表
    export const getProductClassifyList='/admin/productCategory/queryProductCategoryPageList';
    //修改品牌
    export const updateBrand='/admin/brand/updateBrand';
    //删除品牌
    export const deleteBrand='/admin/brand/deleteBrand';
    //根据ID查找详情
    export const findBrandById='/admin/brand/findBrandById';


//上传图片、文件、音乐
    //上传图片
    export const addImg='/commonAPI/ossClient/aliyunOSSUploadImage';
    //上传文件
    export const addFile='/commonAPI/ossClient/aliyunOSSUpload';
    //上传音乐
    export const addMusic='/commonAPI/ossClient/aliyunOSSUploadMusic';
    // 获取省、市、区
    export const getProvinced = '/admin/area/getProvinceList';
    export const getCity = '/admin/area/getCityList';
    export const getArea = '/admin/area/getAreaList';


// 问题反馈
    // 反馈列表
    export const feedbackList='/admin/feedback/queryFeedbackList';
    // 问题详情
    export const feedbackDetail='/admin/feedback/findFeedbackByid';
    //修改反馈详情
    export const updateFeedback='/admin/feedback/updateFeedback';

//经销商层级管理
    // 查询经销商层级列表
    export const getDealerLevelList='/admin/dealerLevel/getList';
    // 添加经销商层级
    export const addDealerLevel='/admin/dealerLevel/addDealerLevel';
    // 修改经销商层级
    export const updateDealerLevel='/admin/dealerLevel/updateDealerLevel';
    // 根据id删除
    export const deleteDealerLevelById='/admin/dealerLevel/deleteDealerLevelById';
    //发起——邀请层级接口
    export const getLevelListWithDealerCount='/admin/dealerLevel/getLevelListWithDealerCount';
    //发起——授权渠道
    export const getStatusONList='/admin/permitChannel/getStatusONList';
    //发起——授权品牌
    export const getList='/admin/brand/getList';
    //发起——根据品牌获取品类
    export const getProductCategoryList='/admin/productCategory/queryProductCategoryByBrandId';
    //发起经销商接口
    export const addInvite='/admin/invite/addInvite';
    //经销商列表接口
    export const getInvitePageList='/admin/invite/queryInvitePageList';
    //查看用户邀请详情
    export const findInviteInfo='/admin/invite/findInviteInfo';


// 公告通知
// 公告列表
export const getNoticeList='/admin/notice/queryNoticeList';
// 公告详情
export const getNoticeDetailById='/admin/notice/findNoticeDetailById';
//发布通知/公告
export const addNotice='/admin/notice/addNotice';
// 修改公告/通知状态
export const updateNoticeStatus='/admin/notice/updateNoticeStatus';