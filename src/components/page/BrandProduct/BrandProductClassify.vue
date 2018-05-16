<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌分类管理']"></v-breadcrumb>
        <div class="table-block">
            <el-button type="primary" style="margin-bottom: 20px" @click="addClassify">添加一级类目</el-button>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="ID" width="180"></el-table-column>
                    <el-table-column prop="classify" label="品类"></el-table-column>
                    <el-table-column label="图标" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="toSecondClassify(scope.row.id)">二级类目</el-button>
                            <el-button type="warning" size="small" @click="editItem(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="delItem(scope.row.id)">删除</el-button>
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

        <!--添加/编辑类目弹窗-->
        <el-dialog :title="title" :visible.sync="addOrEditMask">
            <icon ico="icon-yduipaibanleixingliebiao" class="iconfont"></icon>
            <el-form v-model="form">
                <el-form-item label="类目名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类目图标" :label-width="formLabelWidth" class="icon-area">
                    <el-input v-model="form.icon" auto-complete="off"></el-input>
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" class="icon-uploader"
                            :on-success="handleIconSuccess"
                            :before-upload="beforeIconUpload">
                        <el-button size="small" type="primary"><i class="el-icon-upload"></i>点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否启用" :label-width="formLabelWidth">
                    <el-select v-model="form.status">
                        <el-option label="是" value="0"></el-option>
                        <el-option label="否" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addOrEditMask = false">取 消</el-button>
                <el-button type="primary" @click="addOrEdit">确 定</el-button>
            </div>
        </el-dialog>
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
                formLabelWidth:'120px',
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
            addClassify(){
                this.title='添加一级类目';
                this.addOrEditMask=true
            },
            //编辑
            editItem(row){
                this.title='编辑一级类目';
                this.addOrEditMask=true;
                this.form=row;
                let id=row.id;
            },
            //添加修改确定
            addOrEdit(){
                this.addOrEditMask=false;
            },
            //跳到二级类目页面
            toSecondClassify(id){
                this.$router.push('/secondClassify')
            },
            //删除
            delItem(id){

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
    .el-dialog{width: 500px;border-radius: 10px}
    .el-dialog__header{border-bottom: 1px solid #eee}
    .el-dialog__title{margin-left: 20px}
    .el-dialog .el-input{display: inline}
    .el-dialog .el-input__inner{width: 280px}
    .el-dialog .el-upload--text{width: 100px;height: 40px;border: none}
    .icon-area .el-input__inner{width: 170px}
    .icon-uploader{float: right;margin-right: 58px;height: 33px}
    .el-upload--text .el-icon-upload{line-height:0;margin:0;color: #fff;font-size: 14px}
    .el-dialog .iconfont{position: absolute;top:22px;left: 10px;font-size: 20px;color: #20a0ff}
    .el-dialog__footer{margin-right: 60px}
    .el-upload-list{display: none}

</style>