<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-form ref="form" :model="form" inline label-width="80px">
                <el-form-item prop="address" label="地址">
                    <el-select v-model="form.address" placeholder="请选择">
                        <el-option label="北京市" value="北京市"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="date" label="时间">
                    <el-date-picker
                    v-model="form.date"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="level" label="用户层级">
                    <el-select v-model="form.level" placeholder="请选择">
                        <el-option v-for="(v,k) in level" :label="v.label" :value="v.value" :key="k"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="no" label="编号">
                    <el-input v-model="form.no"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary">搜索</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="con-card">
            <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="ID" label="申请编号" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="申请人" align="center"></el-table-column>
                <el-table-column prop="status" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="name" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="status" label="交易金额（累计）" align="center"></el-table-column>
                <el-table-column prop="name" label="下级代理" align="center"></el-table-column>
                <el-table-column prop="name" label="申请晋级" align="center"></el-table-column>
                <el-table-column prop="name" label="所在区域" align="center"></el-table-column>
                <el-table-column prop="name" label="续约申请时间" align="center"></el-table-column>
                 <el-table-column prop="name" label="续约到期时间" align="center"></el-table-column>
                  <el-table-column prop="name" label="状态" align="center"></el-table-column>
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
      nav: ["授权审核管理", "续约审核"],
      level: [
        {
          label: "体验VIP",
          value: "体验VIP"
        },
        {
          label: "实习省代",
          value: "实习省代"
        },
        {
          label: "省代",
          value: "省代"
        },
        {
          label: "荣誉总监",
          value: "荣誉总监"
        },
        {
          label: "明星CEO",
          value: "明星CEO"
        },
        {
          label: "执行总监",
          value: "执行总监"
        }
      ],
      form: {
        address: [],
        date: "",
        level: "",
        no: "",
        phone: ""
      },
      tableLoading: false,
      tableData: [],
      height: "",
      page: {
        currentPage: 1,
        totalPage: 20
      }
    };
  },
  created() {
    let winHeight = window.screen.availHeight - 500;
    this.height = winHeight;
    this.getList(this.page.currentPage);
  },
  methods: {
    //   获取数据
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
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>


