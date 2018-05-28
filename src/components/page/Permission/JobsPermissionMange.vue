<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="addRole">添加角色</el-button>
            <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
                <el-table-column prop="rname" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="dname" label="部门" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" @click='editRole(scope.row)'>编辑</el-button>
                        <el-button type="danger" @click="deleteRole(scope.row)">删除</el-button>
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
      nav: ["岗位管理", "岗位权限管理"],
      tableLoading: false,
      isShowDelToast: false,
      delId: 66,
      delUrl: "http://api",
      tableData: [],
      page: {
        currentPage: 1,
        totalPage: 0
      },
    };
  },
  created() {
    let winHeight = window.screen.availHeight - 360;
    this.height = winHeight;
  },
  activated(){
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
        .post(api.queryRolePageList, data)
        .then(res => {
          that.tableLoading = false;
          if(res.data.code == 200){
            this.tableData = [];
            this.tableData = res.data.data.data;
            this.page.totalPage = res.data.data.resultCount;
          }else{
            this.$message.warning(res.data.msg);
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

    // 添加角色
    addRole(){
        this.$router.push('addJobsPermission');
    },

    // 编辑角色
    editRole(row){
        sessionStorage.setItem('editJobsPermission',row.id);
        this.$router.push({name:'editJobsPermission',params:{userId:row.id}});
    },

    // 删除模板
    deleteRole(row) {
      this.delId = row.id;
      this.delUrl = api.deleteRole;
      this.isShowDelToast = true;
    },
    deleteToast(msg) {
      this.getList(this.page.currentPage);
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


