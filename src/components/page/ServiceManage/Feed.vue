<template>
    <div>
        <v-breadcrumb :nav="['服务管理','问题反馈']"></v-breadcrumb>
        <transition name="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item label="用户层级" label-width="120">
                        <el-input style="width:200px" placeholder="请输入用户层级" v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="问题类型" label-width="120">
                        <el-select v-model="exportForm.level" placeholder="请选择">
                            <el-option label="账户问题" value="0"></el-option>
                            <el-option label="营销问题" value="1"></el-option>
                            <el-option label="购买流程" value="2"></el-option>
                            <el-option label="推广机制" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间" label-width="120">
                        <el-date-picker
                                v-model="form.date"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="反馈状态" label-width="120">
                        <el-select v-model="exportForm.level" placeholder="请选择">
                            <el-option label="全部反馈" value="0"></el-option>
                            <el-option label="待处理" value="1"></el-option>
                            <el-option label="已处理" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="search" type="primary">查询</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <div class="table-block" >
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="ID" width="60"></el-table-column>
                    <el-table-column prop="nickName" label="用户"></el-table-column>
                    <el-table-column prop="nickName" label="类型"></el-table-column>
                    <el-table-column prop="level" label="层级" width="50"></el-table-column>
                    <el-table-column prop="phone" la                            bel="联系电话"></el-table-column>
                    <el-table-column prop="address" label="所在区域"></el-table-column>
                    <el-table-column prop="lastLoginTime" label="反馈时间"></el-table-column>
                    <el-table-column prop="code" label="问题类型" width="100"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="status" label="处理人"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" >
                            <el-button type="primary" size="small" @click="detailItem(scope.$index,scope.row)">查看详情</el-button>
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
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import * as api from '../../../api/api';

    export default {
        components: {
            vBreadcrumb,icon
        },
        data() {
            return {
                tableData:[],
                page:{
                    currentPage:1,
                    totalPage:20
                },
                height:'',
                formLabelWidth:'100px',
                form:{
                    id:'',
                    nickName:'',
                    code:'',
                    idCard:'',
                    phone:'',
                    date: "",
                },
                exportForm:{
                    level:'',
                },
                selected:''
            }
        },
        created(){
            let winHeight=window.screen.availHeight-520;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        methods: {
            //获取列表
            getList(val){
              let that=this;
              let data={
                  page:val
              };
              this.$axios
                  .post(api.getManageList,data)
                  .then(res=>{
                      that.tableData=res.data.data.list;
                  })
                  .catch(err=>{
                      console.log(err)
                  })
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage=val;
                this.getList(val)
            },
            //详情
            detailItem(index,row){
                this.$router.push({path:'/feedDetail',query:{id:row.id}})
            },
            //查询
            search(){

            }
        }
    }
</script>

<style>
    /*表格样式*/
    .table-block{padding: 20px 20px 60px;background: #fff}
    .block{float:right;margin-top: 10px}
     .content{padding: 40px 40px 0}
    .table-block .el-form-item{margin-bottom: 0 !important;}
    .search-area{margin-bottom: 20px}
    .search-area .el-input__inner{width: 160px}




</style>