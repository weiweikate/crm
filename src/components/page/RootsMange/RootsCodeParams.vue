<template>
    <div class="code-params">
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <el-button type='primary' @click="addCodeParams">添加防伪码参数</el-button>
            <el-table v-loading="tableLoading" class="w-table" stripe :data="tableData" :height="height" border style="width: 100%">
                <el-table-column prop="id" label="编号" width="180" align="center"></el-table-column>
                <el-table-column prop="templateName" label="产品分类" align="center"></el-table-column>
                <el-table-column prop="smallBoxCodeNum" label="产品品牌" align="center"></el-table-column>
                <el-table-column prop="packagingCodeNum" label="设置参数" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" @click='editCodeTpl(scope.row)'>失效</el-button>
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
        <el-dialog title="选择分类和品牌（非多选、单选、关选）" :visible.sync="isShowDialog">
            <div class="check-area">
                <div class="title">选择一级类目</div>
                <div>
                    <ul v-loading="loading">
                        <li v-for="(v,k) in firstList" :key="k" :class="itemIndex == v.value?'selected':''" @click="chooseItem(v.value)">{{v.label}}</li>
                    </ul>
                </div>
            </div>
            <div class="check-area">
                <div class="title">选择二级类目</div>
                <div>
                    <ul v-loading="loading">
                        <li v-for="(v,k) in secondList" :key="k" :class="itemIndex == v.value?'selected':''" @click="chooseItem(v.value)">{{v.label}}</li>
                    </ul>
                </div>
            </div>
            <div class="check-area">
                <div class="title">选择品牌</div>
                <div>
                    <ul v-loading="loading">
                        <li v-for="(v,k) in brandList" :key="k" :class="itemIndex == v.value?'selected':''" @click="chooseItem(v.value)">{{v.label}}</li>
                    </ul>
                </div>
            </div>
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
    return {
      nav: ["溯源管理", "防伪码参数设置"],
      loading: false,
      tableLoading: false,
      btnLoading: false,
      isShowDialog: false,
      itemIndex:0,
      firstList:[
        {
            label:'美妆护肤1',
            value:'1'
        },
      ],
      secondList:[
        {
            label:'美妆护肤1',
            value:'1'
        },
      ],
      brandList:[
        {
            label:'美妆护肤1',
            value:'1'
        },
      ],
      tableData: [],
      page: {
        currentPage: 1,
        totalPage: 0
      },
      rules: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
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

    // 添加防伪码参数
    addCodeParams() {
      this.isShowDialog = true;
    },

    // 选择
    chooseItem(index){
        this.itemIndex = 0;
        this.itemIndex = index;
    }
  }
};
</script>
<style lang="less">
.code-params {
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
  .el-dialog__body{
      overflow: hidden;
  }
  .check-area {
    float: left;
    width: 191px;
    font-size: 12px;
    color: #999;
    border: 1px solid #dfdfdf;
    margin-right: 10px;
    border-radius: 5px;
    .title {
      background: #eee;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-bottom: 1px solid #dfdfdf;
    }

    ul {
      line-height: 25px;
      height: 120px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    ul li {
      list-style: none;
      padding-left: 10px;
      cursor: pointer;
    }
  }
  .selected {
    background: #409eff;
    color: #fff;
  }
}
</style>


