<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌管理','添加品牌']"></v-breadcrumb>
        <div class="container">
            <div class="brand-box">
                <el-form :model="form" ref="form" :rules="rules">
                    <el-form-item prop="name">
                        <span class="label"><span class="required">*</span>品牌名称</span>
                        <el-input placeholder="请输入品牌名称" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="region">
                        <span class="label"><span class="required">*</span>品牌区域</span>
                        <el-input placeholder="请输入品牌区域" v-model="form.region"></el-input>
                    </el-form-item>
                    <el-form-item class="classify-area" prop="brandKey">
                        <span class="label"><span class="required">*</span>品牌类目</span>
                        <el-input
                                placeholder="输入品牌关键词搜索"
                                suffix-icon="el-icon-search"
                                v-model="form.brandKey">
                        </el-input>
                        <div style="margin: 10px 114px">
                            <div class="check-area">
                                <div class="title">选择品牌</div>
                                <div>
                                    <ul>
                                        <li v-for="(item,index) in brandList" v-if="!item.allChecked" @click="chooseBrand(item,index)"
                                            :class="item.checked?'selected':''">{{item.name}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="check-area">
                                <div class="title">选择品类</div>
                                <div>
                                    <ul>
                                        <li v-for="(item,index) in brandList[brandIndex].classifyList" @click="chooseClassify(item,index)"
                                           v-if="!item.hasChecked" :class="item.checked?'selected':''">{{item.name}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="opr-area">
                                <el-button type="primary" @click="addBrandClassify">添加品类</el-button>
                                <el-button @click="delBrandClassify">删除品类</el-button>
                            </div>
                            <div class="check-area">
                                <div class="title">已选择品牌-品类</div>
                                <div>
                                    <ul>
                                        <li v-for="(item,index) in chooseList" @click="delItem(item,index)"
                                            :class="item.checked?'selected':''">{{item.name}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </el-form-item>
                    <el-form-item label="品牌logo">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-radio-group v-model="form.status">
                            <el-radio label="启用"></el-radio>
                            <el-radio label="停用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="submit-btn">
                        <el-button type="primary" @click="submitForm('form')">确认保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: '',
                    brandKey: '',
                    region: '',
                    status: '启用'
                },
                activeName2: 'first',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                rules: {
                    name: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"}
                    ],
                    region: [
                        {required: true, message: "请输入品牌区域", trigger: "blur"}
                    ],
                    brandKey: [
                        {required: true, message: "请选择品牌类目", trigger: "blur"}
                    ]
                },
                brandList: [{
                    name: 'A',
                    checked: true,
                    allChecked: false,
                    id:0,
                    classifyList: [{
                        hasChecked: false
                    }, {
                        hasChecked: false
                    }]
                }, {
                    name: 'B',
                    checked: false,
                    allChecked: false,
                    id:1,
                    classifyList: [{
                        hasChecked: false
                    }]
                }],
                classifyListA: [{
                    name: 'AA',
                    id:0,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'AB',
                    id:1,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'AC',
                    id:2,
                    checked: false,
                    hasChecked: false
                }],
                classifyListB: [{
                    name: 'AA',
                    id:3,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'AB',
                    id:4,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'AC',
                    id:5,
                    checked: false,
                    hasChecked: false
                }],
                chooseList: [],
                brandName: '',
                classifyName: [],
                brandIndex: 0,
                brandId:'',
                classifyId:[],
                delId:[]
            }
        },
        created() {
            //获取品牌列表并默认加载第一个品牌对于的品类列表
            this.brandList[0].classifyList=this.classifyListA;
            console.log(this.brandList);
            this.brandName=this.brandList[0].name;
        },
        methods: {

            //获取品牌下品类列表
            getClassifyList() {

            },
            //选择品牌
            chooseBrand(item,index) {
                let that = this;
                that.brandName = that.brandList[index].name;
                that.brandIndex=index;
                that.brandId=item.id;
                for(let i in that.brandList){
                    if(i==index){
                        that.brandList[i].checked=true;
                    }else{
                        that.brandList[i].checked=false;
                    }
                }
            },
            //选择品类
            chooseClassify(item,index) {
                let that = this;
                that.classifyId.push(item.id);
                that.classifyName.push(that.brandList[that.brandIndex].classifyList[index].name);
                that.brandList[that.brandIndex].classifyList[index].checked=!that.brandList[that.brandIndex].classifyList[index].checked
            },
            //选中已选择的品类
            delItem(item,index) {
                let that = this;
                that.chooseList[index].checked=!that.chooseList[index].checked
            },
            //添加品类
            addBrandClassify() {
                let that=this;
                for(let i in that.classifyId){
                    let param={
                        brandId:that.brandId,
                        classifyId:that.classifyId[i],
                        name:that.brandName+'-'+that.classifyName[i],
                        checked:false
                    };
                    that.chooseList.push(param);
                }
                that.brandIsAllCheck();
                that.changeClassifyList(that.brandId,that.classifyId);
            },
            //删除品类
            delBrandClassify() {

            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.form.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {

            },
            // 提交表单
            submitForm(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        let data = this[form];
                        this.$axios
                            .post('url', data)
                            .then(res => {

                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            //取消
            cancel() {
                this.$router.push('/brandManage')
            },
            // 判断品牌是否已被全选
            brandIsAllCheck() {
                let that = this;
                for (let i in that.brandList) {
                    let num=0;
                    for (let j in that.brandList[i].classifyList) {
                        if (that.brandList[i].classifyList[j].hasChecked) {
                            num++;
                        }
                        if(num==that.brandList[i].length){
                            that.brandList[i].allChecked=true
                        }else{
                            that.brandList[i].allChecked=false
                        }
                    }
                }
            },
            //改变品类容器节点
            changeClassifyList(brandId,classifyId){
                let that=this;
                for(let i in that.brandList){
                    if(that.brandList.id=brandId){
                        for(let j in that.brandList[i].classifyList){
                            if(that.brandList[i].classifyList.id=classifyId){
                                that.brandList[i].classifyList[j].hasChecked=!that.brandList[i].classifyList[j].hasChecked
                            }
                        }
                    }
                }
            }
        }
    };
</script>
<style lang="less">
    .brand-box {
        .label {
            width: 100px;
            text-align: right;
            display: inline-block;
            margin-right: 10px;
        }
        .el-input {
            width: 350px
        }
        .el-input__inner {
            width: 350px
        }
        .classify-area {
            .el-input {
                width: 200px
            }
            .el-input__inner {
                width: 200px
            }
        }
        .required {
            color: #ff1e30;
            margin-right: 5px;
        }
        .el-form-item__label {
            width: 112px;
        }
        .opr-area {
            float: left;
            width: 150px;
            text-align: center;
            margin-left: -10px;
        }
        .opr-area .el-button {
            margin-top: 30px
        }
        .opr-area .el-button:nth-child(2) {
            margin-left: 0
        }
        .check-area {
            float: left;
            width: 191px;
            font-size: 12px;
            color: #999;
            border: 1px solid #dfdfdf;
            margin-right: 10px;
            border-radius: 5px;
        }
        .clearfix {
            clear: both;
            content: ''
        }
        .title {
            background: #eee;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-bottom: 1px solid #dfdfdf;
        }
        ul {
            line-height: 25px;
            height: 120px;
            overflow-y: auto;
            overflow-x: hidden
        }
        ul li {
            list-style: none;
            padding-left: 10px;
            cursor: pointer
        }
        ul li.selected {
            background: #409EFF;
            color: #fff
        }

        .select-area {
            width: 500px;
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 10px;
        }
        .select-area .el-checkbox {
            margin: 0 10px 0
        }
        .select-area .el-checkbox-group {
            font-size: 12px;
            line-height: 10px
        }
        .submit-btn {
            padding: 0 50px 20px 100px
        }
        .avatar-uploader {
            height: 70px;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
        }
        .avatar {
            width: 70px;
            height: 70px;
            display: block;
        }
        .el-upload--text {
            width: 70px;
            height: 70px;
        }
        .el-form-item__error {
            margin-left: 120px;
        }
    }
</style>


