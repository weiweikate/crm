<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="isShowaddCodeDialog = true">添加模板</el-button>
            <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="ID" label="编号" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
                <el-table-column prop="status" label="产品类型" align="center"></el-table-column>
                <el-table-column prop="name" label="大箱码" align="center"></el-table-column>
                <el-table-column prop="name" label="小箱码" align="center"></el-table-column>
                <el-table-column prop="name" label="包装码" align="center"></el-table-column>
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
            <el-form :model="addTplForm" :rules="addTplForm" ref="addTplForm" label-width="80px">
                <el-form-item label="模板名称" >
                    <el-input class="rootscode-inp" v-model="addTplForm.tplName" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" >
                    <el-input class="rootscode-inp" v-model="addTplForm.tplName" placeholder="请输入产品类型"></el-input>
                </el-form-item><br />
                    <el-form-item label="" ><h3 style="position:absolute;top:-15px;left:-70px">防伪码数量设置</h3></el-form-item><br/>
                <el-form-item label="大箱码" >
                    <el-input class="rootscode-inp" v-model="addTplForm.bidBoxNum" placeholder="请输入大箱码"></el-input>
                </el-form-item>
                <el-form-item label="小箱码" >
                    <el-input class="rootscode-inp" v-model="addTplForm.smallBoxNum" placeholder="请输入小箱码"></el-input>
                </el-form-item>
                <el-form-item label="包装码" >
                    <el-input class="rootscode-inp" v-model="addTplForm.packageNum" placeholder="请输入包装码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCodeTpl('addTplForm')">确 定</el-button>
                <el-button @click="isShowaddCodeDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改防伪码模板" :visible.sync="isShoweditCodeDialog">
            <el-form :model="editTplForm" :rules="editTplForm" ref="editTplForm" label-width="80px">
                <el-form-item label="模板名称" >
                    <el-input class="rootscode-inp" v-model="editTplForm.tplName" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" >
                    <el-input class="rootscode-inp" v-model="editTplForm.tplName" placeholder="请输入产品类型"></el-input>
                </el-form-item><br />
                    <el-form-item label="" ><h3 style="position:absolute;top:-15px;left:-70px">防伪码数量设置</h3></el-form-item><br/>
                <el-form-item label="大箱码" >
                    <el-input class="rootscode-inp" v-model="editTplForm.bidBoxNum" placeholder="请输入大箱码"></el-input>
                </el-form-item>
                <el-form-item label="小箱码" >
                    <el-input class="rootscode-inp" v-model="editTplForm.smallBoxNum" placeholder="请输入小箱码"></el-input>
                </el-form-item>
                <el-form-item label="包装码" >
                    <el-input class="rootscode-inp" v-model="editTplForm.packageNum" placeholder="请输入包装码"></el-input>
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
      isShowaddCodeDialog: false,
      isShoweditCodeDialog: false,
      isShowDelToast:false,
      delId: 66,
      delUrl:'http://api',
      addTplForm: {
        tplName: "",
        productType: "",
        bidBoxNum: "",
        smallBoxNum: "",
        packageNum: ""
      },
      editTplForm: {
        tplName: "",
        productType: "",
        bidBoxNum: "",
        smallBoxNum: "",
        packageNum: ""
      },
      tableData: [],
      page: {
        currentPage: 1,
        totalPage: 20
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
        .post(api.getProductList, data)
        .then(res => {
          that.tableData = res.data.data.list;
          that.tableLoading = false;
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
    addCodeTpl() {
      this.isShowaddCodeDialog = false;
    },

    // 编辑防伪码模板
    editCodeTpl(row) {
      this.isShoweditCodeDialog = true;
    },
    confirmEditCodeTpl() {
        this.isShoweditCodeDialog = false;
    },

    // 删除模板
    deleteTpl(row){
        this.delId = 666;
        this.isShowDelToast = true;
    },
    deleteToast(msg){
        this.isShowDelToast = msg;
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


