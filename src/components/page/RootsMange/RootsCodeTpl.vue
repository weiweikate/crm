<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="addCodeTpl('addTplForm')">添加模板</el-button>
            <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="id" label="编号" width="180" align="center"></el-table-column>
                <el-table-column prop="templateName" label="模板名称" align="center"></el-table-column>
                <!-- <el-table-column prop="bigBoxCodeNum" label="大箱码" align="center"></el-table-column> -->
                <el-table-column prop="smallBoxCodeNum" label="小箱码" align="center"></el-table-column>
                <el-table-column prop="packagingCodeNum" label="包装码" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" @click='editCodeTpl(scope.row)'>编辑</el-button>
                        <el-button type="danger" @click="deleteTpl(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </el-card>
        <el-dialog title="添加防伪码模板" :visible.sync="isShowaddCodeDialog">
            <el-form :model="addTplForm" :rules="rules" ref="addTplForm" label-width="80px">
                <el-form-item prop="templateName" label="模板名称" >
                    <el-input class="rootscode-inp" v-model="addTplForm.templateName" placeholder="请输入模板名称"></el-input>
                </el-form-item><br />
                    <el-form-item label="" ><h3 style="position:absolute;top:-15px;left:-70px">防伪码数量设置</h3></el-form-item><br/>
                <!-- <el-form-item prop="bigBoxCodeNum" label="大箱码" >
                    <el-input class="rootscode-inp" v-model="addTplForm.bigBoxCodeNum" placeholder="请输入大箱码"></el-input>
                </el-form-item> -->
                <el-form-item prop="smallBoxCodeNum" label="小箱码" >
                    <el-input class="rootscode-inp" v-model="addTplForm.smallBoxCodeNum" placeholder="请输入小箱码"></el-input>
                </el-form-item>
                <el-form-item prop="packagingCodeNum" label="包装码" >
                    <el-input class="rootscode-inp" v-model="addTplForm.packagingCodeNum" placeholder="请输入包装码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="btnLoading" @click="confirmAddCodeTpl('addTplForm')">确 定</el-button>
                <el-button @click="isShowaddCodeDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改防伪码模板" :visible.sync="isShoweditCodeDialog">
            <el-form :model="editTplForm" :rules="rules" ref="editTplForm" label-width="80px">
                <el-form-item prop="templateName" label="模板名称" >
                    <el-input class="rootscode-inp" v-model="editTplForm.templateName" placeholder="请输入模板名称"></el-input>
                </el-form-item><br />
                    <el-form-item label="" ><h3 style="position:absolute;top:-15px;left:-70px">防伪码数量设置</h3></el-form-item><br/>
                <!-- <el-form-item prop="bigBoxCodeNum" label="大箱码" >
                    <el-input class="rootscode-inp" v-model="editTplForm.bigBoxCodeNum" placeholder="请输入大箱码"></el-input>
                </el-form-item> -->
                <el-form-item prop="smallBoxCodeNum" label="小箱码" >
                    <el-input class="rootscode-inp" v-model="editTplForm.smallBoxCodeNum" placeholder="请输入小箱码"></el-input>
                </el-form-item>
                <el-form-item prop="packagingCodeNum" label="包装码" >
                    <el-input class="rootscode-inp" v-model="editTplForm.packagingCodeNum" placeholder="请输入包装码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmEditCodeTpl('editTplForm')">确 定 修 改</el-button>
                <el-button @click="isShoweditCodeDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <delete-toast :id='delId' :url='delUrl' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>
<script>
import breadcrumb from "../../common/Breadcrumb";
import deleteToast from "../../common/DeleteToast";
import * as api from "../../../api/api.js";
export default {
  components: {
    breadcrumb,
    deleteToast
  },
  data() {
    return {
      nav: ["溯源管理", "防伪码模板"],
      tableLoading: false,
      btnLoading: false,
      isShowaddCodeDialog: false,
      isShoweditCodeDialog: false,
      isShowDelToast: false,
      delId: 0,
      delUrl: "http://api",
      addTplForm: {
        templateName: "",
        bigBoxCodeNum: "",
        smallBoxCodeNum: "",
        packagingCodeNum: ""
      },
      editTplForm: {
        id: "",
        templateName: "",
        bigBoxCodeNum: "",
        smallBoxCodeNum: "",
        packagingCodeNum: ""
      },
      tableData: [],
      page: {
        currentPage: 1,
        totalPage: 0
      },
      rules: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
        ],
        bigBoxCodeNum: [
          { required: true, message: "请输入大箱码", trigger: "blur" }
        ],
        smallBoxCodeNum: [
          { required: true, message: "请输入小箱码", trigger: "blur" }
        ],
        packagingCodeNum: [
          { required: true, message: "请输入包装码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let winHeight = window.screen.availHeight - 360;
    this.height = winHeight;
    this.getList(this.page.currentPage);
  },
  methods: {
    //获取列表
    getList(val) {
      let that = this;
      let data = {
        page: val
      };
      this.tableLoading = true;
      this.$axios
        .post(api.rootsGetCodeTplList, data)
        .then(res => {
          that.tableLoading = false;
          if (res.data.code == 200) {
            this.tableData = [];
            this.tableData = res.data.data.data;
            this.page.totalPage = res.data.data.resultCount;
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          that.tableLoading = false;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getList(val);
    },

    // 添加防伪码模板
    addCodeTpl(formName) {
      this.addTplForm = {};
      this.isShowaddCodeDialog = true;
    },
    confirmAddCodeTpl(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          let that = this;
          let data = {};
          data = this.addTplForm;
          this.$axios
            .post(api.rootsAddCodeTplList, data)
            .then(res => {
              that.btnLoading = false;
              if (res.data.code == 200) {
                this.btnLoading = false;
                this.$message.success(res.data.msg);
                this.isShowaddCodeDialog = false;
                this.getList(this.page.currentPage);
              } else {
                this.btnLoading = false;
                this.$message.error(res.data.msg);
                this.isShowaddCodeDialog = false;
              }
            })
            .catch(err => {
              console.log(err);
              that.tableLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 编辑防伪码模板
    editCodeTpl(row) {
      this.editTplForm = {};
      this.btnLoading = true;
      let data = {id:row.id};
      this.$axios
        .post(api.rootsQueryCodeTplList, data)
        .then(res => {
          if (res.data.code == 200) {
            this.editTplForm = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          that.tableLoading = false;
        });
      this.isShoweditCodeDialog = true;
    },
    confirmEditCodeTpl(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          let data = {};
          data.id = this.editTplForm.id;
          data.templateName = this.editTplForm.templateName;
          data.smallBoxCodeNum = this.editTplForm.smallBoxCodeNum;
          data.packagingCodeNum = this.editTplForm.packagingCodeNum;
          this.$axios
            .post(api.rootsEditCodeTplList, data)
            .then(res => {
              this.btnLoading = false;
              if (res.data.code == 200) {
                this.btnLoading = false;
                this.$message.success(res.data.msg);
                this.isShoweditCodeDialog = false;
                this.getList(this.page.currentPage);
              } else {
                this.btnLoading = false;
                this.$message.error(res.data.msg);
                this.isShoweditCodeDialog = false;
              }
            })
            .catch(err => {
              console.log(err);
              that.tableLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 删除模板
    deleteTpl(row) {
      this.delId = row.id;
      this.delUrl = api.rootsDelCodeTplList;
      this.isShowDelToast = true;
    },
    deleteToast(msg) {
      this.isShowDelToast = msg;
      this.getList(this.page.currentPage);
    }
  }
};
</script>
<style lang="less">
.w-table {
  margin-top: 10px;
}
.block {
  float: right;
  margin: 10px 0 10px 0;
}
.el-dialog__title {
  color: #ff6868;
}
.rootscode-inp {
  width: 215px;
}
.el-dialog__header {
  border-bottom: 1px solid #eee;
  padding: 20px 20px 10px 50px;
}
</style>


