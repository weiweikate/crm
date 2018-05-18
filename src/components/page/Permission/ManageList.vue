<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-form ref="form" :model="form" inline label-width="100px">
              <el-form-item prop="id" label="ID">
                <el-input v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="管理员姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item prop="phone" label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary">搜索</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="con-card">
          <el-button type="primary" @click="addManger">新建管理员</el-button>
          <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
              <el-table-column prop="ID" label="ID" width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="管理员姓名" align="center"></el-table-column>
              <el-table-column prop="status" label="手机号" align="center"></el-table-column>
              <el-table-column prop="name" label="部门" align="center"></el-table-column>
              <el-table-column prop="status" label="岗位" align="center"></el-table-column>
              <el-table-column prop="name" label="状态" align="center"></el-table-column>
              <el-table-column label="操作"  width="400" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="editManger(scope.row)">编辑</el-button>
                  <el-button v-if='accountCtr' size="mini" type="warning" @click="resetPwd(scope.row)">密码重置</el-button>
                  <el-button size="mini" type="warning" @click="showLog(scope.row)">查看日志</el-button>
                  <el-button v-if='!accountCtr' size="mini" type="danger"  >账号删除</el-button>
                  <template>
                    <el-button v-if='accountCtr' size="mini" type="danger" @click='accountMange(false)' >账号关闭</el-button>
                    <el-button v-if='!accountCtr' size="mini" type="danger" @click='accountMange(true)' >账号开启</el-button>
                  </template>
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
        <el-dialog :visible.sync="isShowResetPwd" width="20%">
            <el-form ref="pwdForm" :rules="rules" :model="pwdForm" inline label-width="100px">
              <el-form-item prop="password" label='密码重置'>
                <el-input v-model="pwdForm.password"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isShowResetPwd = false">取 消</el-button>
              <el-button type="primary" @click="confirmReset('pwdForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import breadcrumb from "../../common/Breadcrumb";
import * as api from "../../../api/api.js";
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      nav: ["权限管理", "管理员账号管理"],
      accountCtr:false,
      isShowResetPwd:false,
      form: {
        id: "",
        name: "",
        phone: ""
      },
      pwdForm:{
        password:'',
      },
      tableLoading: false,
      tableData: [],
      height: "",
      page: {
        currentPage: 1,
        totalPage: 20
      },
      rules:{
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  },
  created() {
    let winHeight = window.screen.availHeight - 500;
    this.height = winHeight;
    this.getList(this.page.currentPage);
  },
  methods: {
    //  获取数据
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

    //   重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 新建管理员
    addManger(){
      this.$router.push('/addManger');
    },

    // 编辑管理员
    editManger(row){
      this.$router.push('/editManger');
    },

    // 查看操作日志
    showLog(row){
      sessionStorage.setItem('showMangeLogTmp',row.id);
      this.$router.push({name:'showMangeLog',params:{userId: row.id}});
    },

    // 密码重置
    resetPwd(row){
      this.pwdForm = {};
      this.isShowResetPwd = true;
    },
    confirmReset(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isShowResetPwd = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    // 账号开启/关闭
    accountMange(status){
        this.accountCtr = status;
    },
  }
};
</script>
<style lang="less">
.w-table {
  margin-top: 10px;
}
.con-card {
  margin-top: 20px;
}
.block {
  float: right;
  margin: 10px 0 10px 0;
}
.roots-inp {
  width: 215px;
}
</style>


