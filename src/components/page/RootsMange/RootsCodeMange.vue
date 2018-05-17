<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-form ref="form" :model="form" inline label-width="80px">
              <el-form-item prop="code" label="防伪码">
                <el-input v-model="form.cod"></el-input>
              </el-form-item>
              <el-form-item prop="no" label="授权号">
                <el-input v-model="form.no"></el-input>
              </el-form-item>
                <el-form-item prop="status" label="用户层级">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option v-for="(v,k) in level" :label="v.label" :value="v.value" :key="k"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary">搜索</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="con-card">
          <el-button type="primary" @click="createCode">生成防伪码</el-button>
          <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
              <el-table-column prop="ID" label="方位记录ID" width="100" align="center"></el-table-column>
              <el-table-column prop="name" label="产品类型" align="center"></el-table-column>
              <el-table-column prop="status" label="产品品牌" align="center"></el-table-column>
              <el-table-column prop="name" label="导出时间" align="center"></el-table-column>
              <el-table-column prop="status" label="导出数量" align="center"></el-table-column>
              <el-table-column prop="name" label="生产厂家" align="center"></el-table-column>
              <el-table-column prop="name" label="备注说明" align="center"></el-table-column>
              <el-table-column prop="name" label="状态" align="center"></el-table-column>
              <el-table-column prop="name" label="已入库" width="70"  align="center"></el-table-column>
              <el-table-column prop="name" label="未入库" width="70" align="center"></el-table-column>
              <el-table-column label="操作"  width="250" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary">导出防伪码</el-button>
                  <el-button size="mini" type="primary">确认入库</el-button>
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
        <el-dialog title="收货地址" :visible.sync="isShowDialog">
          <el-form :model="diaForm" :rules="diaRules" ref="diaForm" label-width="80px">
            <el-form-item label="产品品牌" >
              <el-select v-model="diaForm.productBrand" placeholder="请选择品牌">
                <el-option v-for="(v,k) in level" :label="v.label" :value="v.value" :key="k"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品分类" >
              <el-select v-model="diaForm.productItem" placeholder="请选择分类">
                <el-option v-for="(v,k) in level" :label="v.label" :value="v.value" :key="k"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品" >
              <el-select v-model="diaForm.product" placeholder="请选择产品">
                <el-option v-for="(v,k) in level" :label="v.label" :value="v.value" :key="k"></el-option>
              </el-select>
            </el-form-item><br/>
            <el-form-item label="选择模板" >
              <el-select v-model="diaForm.tpl" placeholder="请选择模板">
                <el-option v-for="(v,k) in level" :label="v.label" :value="v.value" :key="k"></el-option>
              </el-select>
              <span @click="selectTpl" class="selectTpl">去选择模板</span>
            </el-form-item>
            <el-form-item prop="productNum" label="产品数量" >
              <el-input class="roots-inp" v-model="diaForm.productNum"></el-input> 套
            </el-form-item>
            <el-form-item label="" >
              <el-input  v-model="diaForm.note" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="生成:">
              <span style="color:#ff6868">共生成100个箱码，2500个包装码</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmCreateCode('diaForm')">确 定</el-button>
          </div>
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
    var validateNum = (rule, value, callback) => {
      if (value > 0) {
        callback();
      } else {
        callback(new Error("请输入正确的参数"));
      }
    };
    return {
      nav: ["溯源管理", "防伪码管理"],
      isShowDialog: false,
      level: [
        {
          label: "全部",
          value: "全部"
        },
        {
          label: "待确认",
          value: "待确认"
        },
        {
          label: "待出库",
          value: "待出库"
        },
        {
          label: "已入库",
          value: "已入库"
        },
        {
          label: "已出库",
          value: "已出库"
        }
      ],
      form: {
        code: "",
        no: "",
        status: ""
      },
      diaForm: {
        productBrand: "",
        productItem: "",
        product: "",
        tpl: "",
        productNum: "",
        note: ""
      },
      diaRules: {
        productNum: [
          {
            validator: validateNum,
            trigger: "blur"
          }
        ]
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

    // 生成防伪码
    createCode() {
      this.diaForm = {};
      this.isShowDialog = true;
    },
    confirmCreateCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.isShowDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 选择模板
    selectTpl(){
      this.isShowDialog = false;
      this.$router.push('/rootsCodeTpl');
    },

    //   重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
.el-dialog__title {
  color: #ff6868;
}
.roots-inp {
  width: 215px;
}
.el-dialog__header {
  border-bottom: 1px solid #eee;
  padding: 20px 20px 10px 50px;
}
.selectTpl{
  color:#6ac8ff;
  cursor: pointer;
}
</style>


