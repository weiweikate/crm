<template>
    <div>
        <breadcrumb :nav='breadcrumb'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="isShowAddChan = true">添加渠道</el-button>
            <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="ID" label="ID" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="品类" align="center"></el-table-column>
                <el-table-column prop="status" label="渠道参与者" align="center"></el-table-column>
                <el-table-column prop="name" label="状态" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="secondChannel(scope.row)">二级渠道</el-button>
                        <el-button type="warning" @click='edit(scope.row)'>编辑</el-button>
                        <el-button type="danger" @click="deleteMsg(scope.row)">删除</el-button>
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
        <add-channel @status='closeAddChan' v-if="isShowAddChan"></add-channel>
        <edit-channel @status='closeEditChan' v-if="isShowEditChan"></edit-channel>
        <delete-toast :id='delId' :url='delUrl' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>
<script>
import breadcrumb from "../../common/Breadcrumb";
import addChannel from "./ChannelItemManage/addChannel";
import editChannel from "./ChannelItemManage/editChannel";
import deleteToast from "../../common/DeleteToast";
import * as api from "../../../api/api.js";
export default {
  components: {
    breadcrumb,
    addChannel,
    editChannel,
    deleteToast
  },
  data() {
    return {
      breadcrumb: ["授权管理", "渠道类目管理"],
      isShowAddChan: false,
      isShowEditChan: false,
      isShowDelToast: false,
      tableLoading: false,
      delId: 66,
      delUrl:'http://api',
      tableData: [{ ID: 123 }],
      page: {
        currentPage: 1,
        totalPage: 20
      },
      height: ""
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

    // 编辑信息
    edit(row) {
      this.isShowEditChan = true;
    },

    // 删除信息
    deleteMsg(row) {
      this.delId = '999';
      this.isShowDelToast = true;
    },

    // 进入二级渠道
    secondChannel(row){
      this.$router.push({path:'secondChannel',query:row})
    },

    // 关闭添加弹窗
    closeAddChan(msg) {
      this.isShowAddChan = msg;
    },
    // 关闭编辑弹窗
    closeEditChan(msg) {
      this.isShowEditChan = msg;
    },
    // 删除弹窗
    deleteToast(msg) {
      this.isShowDelToast = msg;
    }
  }
};
</script>
<style lang="less" scoped>
.w-table {
  margin-top: 10px;
}
.block {
  float: right;
  margin: 10px 0 10px 0;
}
</style>


