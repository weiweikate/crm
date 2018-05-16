<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌分类管理']"></v-breadcrumb>
        <div class="table-block">
            <el-button type="primary" style="margin-bottom: 20px" @click="addClassify">添加一级类目</el-button>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="ID" width="180"></el-table-column>
                    <el-table-column prop="classify" label="品类"></el-table-column>
                    <el-table-column label="图标" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="toSecondClassify(scope.row.id)">二级类目</el-button>
                            <el-button type="warning" size="small" @click="editItem(scope.row.id)">编辑</el-button>
                            <el-button type="danger" size="small" @click="delItem(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        </div>
    </div>
</template>

<script>
    import vBreadcrumb from '../common/Breadcrumb.vue';
    import * as api from '../../api/api';

    export default {
        components: {
            vBreadcrumb
        },
        data() {
            return {
                tableData:[],
                page:{
                    currentPage:1,
                    totalPage:20
                },
                height:''
            }
        },
        created(){
            let winHeight=window.screen.availHeight-500;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        methods: {
            //获取列表
            getList(val){
              let that=this;
              let data={
                  page:val
              }
              this.$axios
                  .post(api.getProductList,data)
                  .then(res=>{
                      that.tableData=res.data.data.list;
                  })
                  .catch(err=>{
                      console.log(err)
                  })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage=val;
                this.getList(val)
            },
            // 添加一级类目
            addClassify(){

            },
            //跳到二级类目页面
            toSecondClassify(id){

            },
            //编辑
            editItem(id){

            },
            //删除
            delItem(id){

            }
        }
    }
</script>

<style scoped>
    .table-block{padding: 20px 20px 60px;background: #fff}
    .block{float:right;margin-top: 10px}
</style>