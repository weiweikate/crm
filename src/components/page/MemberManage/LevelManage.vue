<template>
    <div class="level">
        <v-breadcrumb :nav="['会员管理','经销商层级管理']"></v-breadcrumb>
        <div class="table-block">
            <el-button type="primary" v-if="p.addDealerLevel" style="margin-bottom: 20px" @click="addClassify">添加层级</el-button>
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="id" label="层级ID" width="120" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" align="center"></el-table-column>
                    <el-table-column label="层级" width="120" align="center">
                        <template slot-scope="scope">
                            {{scope.row.level}}级
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注说明" align="center"></el-table-column>
                    <el-table-column label="是否自动晋级" width="120" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.autoUp == 1">是</template>
                            <template v-if="scope.row.autoUp == 2">否</template>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="isShowOperate" label="操作" align="center">
                        <template slot-scope="scope">
                            <!--<el-button type="primary" size="small" @click="upSet(scope.$index,scope.row)">晋级设置</el-button>-->
                            <!--<el-button type="warning" size="small" @click="downSet(scope.$index,scope.row)">降级设置</el-button>-->
                            <!--<el-button type="primary" size="small" @click="priceLevel(scope.$index,scope.row)">价格阶层</el-button>-->
                            <el-button type="warning" v-if="p.updateDealerLevel" size="small" @click="editItem(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button type="danger" v-if="p.deleteDealerLevelById" size="small" @click="delItem(scope.$index,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
           <!-- <div class="block">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        layout="total, prev, pager, next, jumper"
                        :total="page.totalPage">
                </el-pagination>
            </div>-->
        </div>

        <!--添加/编辑层级弹窗-->
        <el-dialog :title="title" :visible.sync="addMask">
            <el-form v-model="addForm">
                <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
                    <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item prop="level" label="层级" :label-width="formLabelWidth">
                    <el-input v-model="addForm.level" auto-complete="off" placeholder="请输入数值"></el-input>
                    <span>级</span>
                </el-form-item>
                <el-form-item label="是否晋级" :label-width="formLabelWidth">
                    <el-radio-group v-model="addForm.autoUp">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注说明" :label-width="formLabelWidth" class="remark-area">
                    <el-input v-model="addForm.remark" auto-complete="off" placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-loading="btnLoading" @click="addOrEdit('addForm')">确定保存</el-button>
                <el-button  @click="cancel">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="editMask">
            <el-form v-model="form">
                <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item prop="level" label="层级" :label-width="formLabelWidth">
                    <el-input v-model="form.level" auto-complete="off" placeholder="请输入数值"></el-input>
                    <span>级</span>
                </el-form-item>
                <el-form-item label="是否晋级" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.autoUp">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注说明" :label-width="formLabelWidth" class="remark-area">
                    <el-input v-model="form.remark" auto-complete="off" placeholder="请输入说明文字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-loading="btnLoading" @click="addOrEdit('form')">确定保存</el-button>
                <el-button  @click="cancel">取消</el-button>
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
        <delete-toast :id='delId' :uri='delUri' :url='delUrl' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import deleteToast from "../../common/DeleteToast";
    import * as api from '../../../api/api';
    import utils from '../../../utils/index.js'
    import * as pApi from '../../../privilegeList/index.js';
    export default {
        components: {
            vBreadcrumb, icon, deleteToast
        },
        data() {
            return {
                // 权限控制
                p:{
                    addDealerLevel:false,
                    updateDealerLevel:false,
                    deleteDealerLevelById:false
                },
                isShowOperate:true,

                tableData: [],
                page: {
                    currentPage: 1,
                    totalPage: 20
                },
                height: '',
                addMask: false,
                editMask: false,
                // priceLevelMask:false,//价格层级弹窗
                formLabelWidth: '100px',
                form: {//添加修改表单
                    name: '',
                    level: '',
                    autoUp: '1',
                    remark: ''
                },
                addForm: {
                    name: '',
                    level: '',
                    autoUp: '1',
                    remark: ''
                },
                rules:{},
                title: '添加层级',
                isShowDelToast: false,
                delId: '',
                delUrl: '',
                delUri:'',
                tableLoading: false,
                btnLoading: false,
                isUp:false,
                id:''
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 500;
            this.height = winHeight;
            this.pControl();
        },
        activated(){
            this.getList(this.page.currentPage);
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
                if (!this.p.updateDealerLevel&&!this.p.deleteDealerLevelById) {
                    this.isShowOperate = false;
                }
            },
            //取消
            cancel(){
                this.addMask = false;
                this.editMask = false;
                this.getList(this.page.currentPage)
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = {};
                data.url=pApi.getDealerLevelList;
                that.tableLoading = true;
                that.$axios
                    .post(api.getDealerLevelList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading = false;
                            that.tableData = res.data.data;
                            // that.page.totalPage = res.data.resultCount;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.tableLoading = false;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        that.tableLoading = false;
                    })
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage = val;
                this.getList(val)
            },
            // 添加层级
            addClassify() {
                this.title = '添加层级';
                this.addMask = true;
                this.isUp = false;
                this.addForm.name='';
                this.addForm.level='';
                this.addForm.autoUp='1';
                this.addForm.remark='';
            },
            //编辑
            editItem(index, row) {
                this.title = '编辑层级';
                this.editMask = true;
                row.autoUp=row.autoUp.toString();
                this.form = row;
                this.id = row.id;
                this.isUp =true;
            },
            //添加修改确定
            addOrEdit(formName) {
                let url = "";
                let data = {};
                data.name=this[formName].name;
                data.level=this[formName].level;
                if(!data.name||!data.level){
                    this.$message.warning('层级、层级名称不能为空!');
                    return
                }
                data.autoUp=this[formName].autoUp;
                data.remark=this[formName].remark;
                if (!this.isUp) {
                    url = api.addDealerLevel;
                    data.url=pApi.addDealerLevel;
                } else {
                    url = api.updateDealerLevel;
                    data.id = this.id;
                    data.url=pApi.updateDealerLevel;
                }
                this.btnLoading = true;
                this.$axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            this.btnLoading = false;
                            this.addMask = false;
                            this.editMask = false;
                            this.getList(this.page.currentPage);
                        } else {
                            this.btnLoading = false;
                            this.$message.warning(res.data.msg);
                            this.getList(this.page.currentPage);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
            delItem(index, id) {
                this.delId = id;
                this.delUrl = api.deleteDealerLevelById;
                this.delUri=pApi.deleteDealerLevelById;
                this.isShowDelToast = true;
            },
            // 删除弹窗
            deleteToast(msg) {
                this.isShowDelToast = msg;
                this.getList(this.page.currentPage);
            },
            //上传图片
            handleIconSuccess(res, file) {

            },
            beforeIconUpload(file) {
                this.form.icon = file.name;
            }
        }
    }
</script>

<style lang="less">
    .level{
        /*表格样式*/
        .table-block {
            padding: 20px 20px 60px;
            background: #fff
        }

        .block {
            float: right;
            margin-top: 10px
        }

        /*弹窗样式*/
        .el-dialog {
            width: 530px;
            border-radius: 10px
        }

        .el-dialog__header {
            border-bottom: 1px solid #eee;
            padding: 20px 20px 10px 50px
        }

        .el-dialog__title {
            color: #ff6868
        }

        .el-dialog .el-input {
            display: inline
        }

        .el-dialog .el-input__inner {
            width: 180px
        }

        .remark-area .el-input__inner {
            width: 360px
        }

        .el-dialog .el-upload--text {
            width: 100px;
            height: 40px;
            border: none
        }

        .el-input__suffix {
            line-height: 24px
        }

        .icon-uploader {
            float: right;
            margin-right: 31px;
            height: 33px
        }

        .icon-uploader .el-button--small {
            border-radius: 5px;
            width: 100px
        }

        .el-upload--text .el-icon-upload {
            line-height: 0;
            margin: 0;
            color: #fff;
            font-size: 14px
        }

        .el-dialog__footer {
            margin-right: 30px
        }

        .el-upload-list {
            display: none
        }
    }
</style>