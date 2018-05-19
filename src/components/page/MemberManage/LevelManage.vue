<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商层级管理']"></v-breadcrumb>
        <div class="table-block">
            <el-button type="primary" style="margin-bottom: 20px" @click="addClassify">添加层级</el-button>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="层级ID" width="120"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="level" label="层级" width="120"></el-table-column>
                    <el-table-column prop="remarks" label="备注说明"></el-table-column>
                    <el-table-column prop="status" label="是否自动晋级" width="120"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!--<el-button type="primary" size="small" @click="upSet(scope.$index,scope.row)">晋级设置</el-button>-->
                            <!--<el-button type="warning" size="small" @click="downSet(scope.$index,scope.row)">降级设置</el-button>-->
                            <!--<el-button type="primary" size="small" @click="priceLevel(scope.$index,scope.row)">价格阶层</el-button>-->
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

        <!--添加/编辑层级弹窗-->
        <el-dialog :title="title" :visible.sync="addOrEditMask">
            <el-form v-model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入名称"></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="层级" :label-width="formLabelWidth">
                    <el-input v-model="form.level" auto-complete="off" placeholder="请输入数值"></el-input>
                    <span>分</span>
                </el-form-item>
                <el-form-item label="是否晋级" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.status">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item label="备注说明" :label-width="formLabelWidth" class="remark-area">
                    <el-input v-model="form.remarks" auto-complete="off" placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrEdit">确定保存</el-button>
                <el-button @click="addOrEditMask = false">重置</el-button>
            </div>
        </el-dialog>
        <!--价格层级弹窗-->
        <!--<el-dialog title="选择价格层级" :visible.sync="priceLevelMask">
            <el-form v-model="priceLevelForm">
                <el-form-item label="用户层级名称" :label-width="formLabelWidth">
                    <el-input v-model="priceLevelForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="层级" :label-width="formLabelWidth">
                    <el-input v-model="priceLevelForm.level" auto-complete="off" placeholder="请输入数值"></el-input>
                    <span>分</span>
                </el-form-item>
                <el-form-item label="选择价格层级模板" :label-width="formLabelWidth">
                    <el-select v-model="priceLevelForm.status">
                        <el-option label="是" value="0"></el-option>
                        <el-option label="否" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明" :label-width="formLabelWidth" class="remark-area">
                    <el-input v-model="priceLevelForm.remarks" auto-complete="off" placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addOrEdit">确定保存</el-button>
                <el-button @click="priceLevelMask = false">重置</el-button>
            </div>
        </el-dialog>-->
        <!--删除弹窗-->
        <delete-toast :id='delId' :url='delUrl' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import deleteToast from "../../common/DeleteToast";
    import * as api from '../../../api/api';

    export default {
        components: {
            vBreadcrumb,icon,deleteToast
        },
        data() {
            return {
                tableData:[],
                page:{
                    currentPage:1,
                    totalPage:20
                },
                height:'',
                addOrEditMask:false,//添加修改弹窗
                // priceLevelMask:false,//价格层级弹窗
                formLabelWidth:'100px',
                form:{//添加修改表单
                    name:'',
                    level:'',
                    status:'是',
                    remarks:''
                },
                // priceLevelForm:{//价格层级表单
                //     name:'',
                //     level:'',
                //     status:'0',
                //     remarks:''
                // },
                title:'添加层级',
                isShowDelToast: false,
                delId: 66,
                delUrl:'http://api',
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
                  .post(api.getLevelList,data)
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
            // 添加层级
            addClassify(){
                this.title='添加层级';
                this.addOrEditMask=true
            },
            //编辑
            editItem(index,row){
                this.title='编辑层级';
                this.addOrEditMask=true;
                this.form=row;
                let id=row.id;
            },
            //添加修改确定
            addOrEdit(){
                this.addOrEditMask=false;
            },
            // //晋级设置
            // upSet(index,row){
            //     this.$router.push({ path: "/secondClassify", query: { params: row } });
            // },
            // //降级设置
            // downSet(index,row){
            //
            // },
            // //价格阶层
            // priceLevel(index,row){
            //
            // },
            //删除
            delItem(index,id){
                this.delId = '999';
                this.isShowDelToast = true;
            },
            // 删除弹窗
            deleteToast(msg) {
                this.isShowDelToast = msg;
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
    .el-dialog .el-input__inner{width: 180px}
    .remark-area .el-input__inner{width: 360px}
    .el-dialog .el-upload--text{width: 100px;height: 40px;border: none}
    .el-input__suffix{line-height: 24px}
    .icon-uploader{float: right;margin-right: 31px;height: 33px}
    .icon-uploader .el-button--small{border-radius: 5px;width: 100px}
    .el-upload--text .el-icon-upload{line-height:0;margin:0;color: #fff;font-size: 14px}
    .el-dialog__footer{margin-right: 30px}
    .el-upload-list{display: none}

</style>