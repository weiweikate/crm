<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="addModule">新增功能模块</el-button>
            <el-table :span-method='mergeRow' v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
                <el-table-column prop="templateName" label="模块" align="center"></el-table-column>
                <el-table-column prop="name" label="模块" align="center"></el-table-column>
                <el-table-column prop="smallBoxCodeNum" label="模块" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click='editCodeTpl(scope.row)'>添加权限</el-button>
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
        <el-dialog title="添加功能模块" width='30%' :visible.sync="isShowaddToask">
            <el-form>
                <el-form-item prop="name" label="模块名称">
                    <el-input class="add-module-inp" v-model="addModuleForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="mdLevel" label="模块层级">
                    <el-select v-model="addModuleForm.mdLevel" placeholder="请选择">
                        <el-option
                        v-for="item in mdLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="addModuleForm.mdLevel != 1" prop="first" label="一级模块">
                    <el-select v-model="addModuleForm.first" placeholder="请选择">
                        <el-option
                        v-for="item in first"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowaddToask = false">取 消</el-button>
                <el-button type="primary" @click="confirmAddModule">确 定</el-button>
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
      nav: ["权限管理", "权限设置"],
      tableLoading: false,
      isShowaddToask: false,
      mdLevel: [
        {
          value: "1",
          label: "一级"
        },
        {
          value: "2",
          label: "二级"
        }
      ],
      first: [{ value: "aa", label: "aa" }],
      tableData: [
        { id: 1, name: "会员管理", children: "经销商层级管理" },
        { id: 1, name: "会员管理", children: "经销商邀请管理" },
        { id: 1, name: "会员管理", children: "经销商会员管理" },
        { id: 2, name: "品牌产品管理", children: "品牌分类管理" },
        { id: 2, name: "品牌产品管理", children: "品牌管理" },
        { id: 2, name: "品牌产品管理", children: "产品管理" },
        { id: 2, name: "品牌产品管理", children: "价格设置模板" },
        { id: 3, name: "授权审核管理", children: "渠道管理" },
        { id: 3, name: "授权审核管理", children: "经销商层级管理" },
        { id: 3, name: "授权审核管理", children: "经销商层级管理" },
        { id: 4, name: "溯源管理", children: "经销商层级管理" },
        { id: 5, name: "权限管理", children: "经销商层级管理" },
        { id: 5, name: "权限管理", children: "经销商层级管理" }
      ],
      addModuleForm: {
        name: "",
        mdLevel: "",
        first: ""
      },
      page: {
        currentPage: 1,
        totalPage: 0
      }
    };
  },
  created() {
    let winHeight = window.screen.availHeight - 360;
    this.height = winHeight;
    // this.getList(this.page.currentPage);
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

    // 新增功能模块
    addModule() {
      this.addModuleForm = {};
      this.isShowaddToask = true;
    },
    confirmAddModule() {
      console.log(this.addModuleForm);
      this.isShowaddToask = false;
    },

    // 合并行
    mergeRow({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (rowIndex === 3) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (rowIndex === 11) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex === 10) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
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
.add-module-inp {
  width: 215px;
}
.el-dialog__title {
  color: #ff6868;
}
.el-dialog__header {
  border-bottom: 1px solid #eee;
  padding: 20px 20px 10px 50px;
}
</style>


