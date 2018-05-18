<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌管理']"></v-breadcrumb>
        <div class="table-block">
            <el-button type="primary" style="margin-bottom: 20px" @click="addBrand">添加品牌</el-button>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="ID" width="180"></el-table-column>
                    <el-table-column prop="name" label="品牌名称"></el-table-column>
                    <el-table-column prop="name" label="品牌区域"></el-table-column>
                    <el-table-column prop="name" label="品牌分类"></el-table-column>
                    <el-table-column label="品牌LOGO" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="产品数"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="toSecondClassify(scope.$index,scope.row)">品牌页</el-button>
                            <el-button type="warning" size="small" @click="editItem(scope.$index,scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="delItem(scope.$index,scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        layout="total, prev, pager, next, jumper"
                        :total="page.totalPage">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import * as api from '../../../api/api';

    export default {
        components: {
            vBreadcrumb,icon
        },
        data() {
            return {
                tableData:[],
                page:{
                    currentPage:1,
                    totalPage:20
                },
                height:'',
                addOrEditMask:false,
                formLabelWidth:'100px',
                form:{
                    name:'',
                    status:'0',
                    icon:''
                },
                title:'添加一级类目'
            }
        },
        created(){
            let winHeight=window.screen.availHeight-500;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        methods: {
            //获取列表
            getList(val){
              let that=this;
              let data={
                  page:val
              };
              this.$axios
                  .post(api.getProductList,data)
                  .then(res=>{
                      that.tableData=res.data.data.list;
                  })
                  .catch(err=>{
                      console.log(err)
                  })
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage=val;
                this.getList(val)
            },
            // 添加一级类目
            addBrand(){
                this.$router.push('/addOrUpBrand')
            },
            //编辑
            editItem(index,row){
                this.$router.push('/addOrUpBrand')
            },

            //跳到二级类目页面
            toSecondClassify(index,row){
                this.$router.push({ path: "/secondClassify", query: { params: row } });
            },
            //删除
            delItem(index,id){

            },
            //上传图片
            handleIconSuccess(res, file){

            },
            beforeIconUpload(file){
                this.form.icon=file.name;
            }
        }
    }
</script>

<style>
    /*表格样式*/
    .table-block{padding: 20px 20px 60px;background: #fff}
    .block{float:right;margin-top: 10px}

    /*弹窗样式*/
    .el-dialog{width: 530px;border-radius: 10px}
    .el-dialog__header{border-bottom: 1px solid #eee;padding: 20px 20px 10px 50px}
    .el-dialog__title{color: #ff6868}
    .el-dialog .el-input{display: inline}
    .el-dialog .el-input__inner{width: 360px}
    .el-select .el-input__inner{width: 200px}
    .el-dialog .el-upload--text{width: 100px;height: 40px;border: none}
    .icon-area .el-input__inner{width: 240px}
    .el-input__suffix{line-height: 24px}
    .icon-uploader{float: right;margin-right: 31px;height: 33px}
    .icon-uploader .el-button--small{border-radius: 5px;width: 100px}
    .el-upload--text .el-icon-upload{line-height:0;margin:0;color: #fff;font-size: 14px}
    .el-dialog__footer{margin-right: 30px}
    .el-upload-list{display: none}

</style>