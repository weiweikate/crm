<template>
    <div class="set-permission">
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="addModule">新增功能模块</el-button>
            <el-table :span-method='mergeRow' v-loading="tableLoading" class="w-table" :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="模块" align="center"></el-table-column>
                <el-table-column prop="name" label="模块" align="center"></el-table-column>
                <el-table-column prop="smallBoxCodeNum" label="权限" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click='addPermission(scope.row)'>添加权限</el-button>
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
            <el-form ref="addModuleForm" :rules="rules" :model="addModuleForm">
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
                <el-button type="primary" @click="confirmAddModule('addModuleForm')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加权限" width='30%' :visible.sync="isShowPermission">
            <el-form label-position="right" ref="addPermissionForm" :rules="rules" :model="addPermissionForm">
                <el-form-item prop="url" label="URL">
                    <el-input class="add-module-inp" style="margin-left:25px" v-model="addPermissionForm.url"></el-input>
                </el-form-item>
                <el-form-item prop="belongModule" label="所属模块">
                    <el-input class="add-module-inp" disabled v-model="addPermissionForm.belongModule"></el-input>
                </el-form-item>
                <el-form-item prop="perName" label="权限名称">
                    <el-input class="add-module-inp" v-model="addPermissionForm.perName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmAddPer('addPermissionForm')">确 定</el-button>
              <el-button @click="isShowPermission = false">取 消</el-button>
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
      isShowPermission: false,
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
      tableData: [],
      aData: [
        {
          id: 1,
          name: "会员管理",
          second: ["1-1", "1-2", "1-3","1-4"]
        },
        {
          id: 2,
          name: "品牌产品管理",
          second: ["2-1", "2-2"]
        },
        {
          id: 3,
          name: "溯源管理",
          second: ["3-1", "3-2", "3-3"]
        },
        {
          id: 4,
          name: "杨小猛",
          second: ["3-1", "3-2", "3-3"]
        }
      ],
      addModuleForm: {
        name: "",
        mdLevel: "",
        first: ""
      },
      addPermissionForm: {
        id: "",
        url: "",
        belongModule: "",
        perName: ""
      },
      spanData: [],
      page: {
        currentPage: 1,
        totalPage: 0
      },
      rules: {
        url: [{ required: true, message: "请输入URL", trigger: "blur" }],
        perName: [
          { required: true, message: "请输入权限名称", trigger: "blur" }
        ],
        belongModule: [
          { required: true, message: "请输入所属模块名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let winHeight = window.screen.availHeight - 360;
    this.height = winHeight;
    // this.getList(this.page.currentPage);
    this.spanData = [];
    this.tableData = [];
    let t = 0;
    this.aData.forEach((v, k) => {
      this.spanData.push({ startIndex: t, num: v.second.length });
      t += v.second.length;
    });
    this.aData.forEach((v,k)=>{
      v.second.forEach((val,ind)=>{
        this.tableData.push({id:v.id,name:v.name,children:val});
      })
    })
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

    // 添加权限
    addPermission(row) {
      console.log(row);
      // this.addPermissionForm = {};
      // this.addPermissionForm.id = row.name;
      // this.addPermissionForm.belongModule = "666";
      // this.isShowPermission = true;
    },
    confirmAddPer(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addPermissionForm);
          this.isShowPermission = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 合并行(第几行开始合并，合并几行)
    mergeRow({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        for(let i =0;i<this.spanData.length;i++){
          if(rowIndex === this.spanData[i].startIndex){
            return {
              rowspan:this.spanData[i].num,
              colspan:1
            }
          }
          
        }
        return {
          rowspan:0,
          colspan:0
        }
      }
    }
  }
};
</script>
<style lang="less">
.set-permission {
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
  .el-form-item__error {
    margin-left: 75px;
  }
}
</style>


