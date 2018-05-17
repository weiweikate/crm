<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理']"></v-breadcrumb>
        <transition name="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item label="用户ID" label-width="120">
                        <el-input style="width:200px" placeholder="请输入用户ID" v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" label-width="120">
                        <el-input style="width:200px" placeholder="请输入用户昵称" v-model="form.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="授权码" label-width="120">
                        <el-input style="width:200px" placeholder="请输入授权码" v-model="form.code"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号" label-width="120">
                        <el-input style="width:200px" placeholder="请输入证件号" v-model="form.idCard"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" label-width="120">
                        <el-input style="width:200px" placeholder="请输入手机号" v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="会员类型" label-width="120">
                        <el-select v-model="exportForm.level" placeholder="请选择会员类型">
                            <el-option label="一级" value="0"></el-option>
                            <el-option label="二级" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="search" type="primary">查询</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <div class="table-block">
            <el-form ref="exportForm" :inline="true" :model="form" class="search-area">
                <el-form-item>
                    <template>
                        <!--<area-select v-model="selected" level={2} :data="pcaa"></area-select>-->
                    </template>
                    <el-select v-model="exportForm.level" placeholder="用户层级">
                        <el-option label="一级" value="0"></el-option>
                        <el-option label="二级" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="exportData" type="primary">导出</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="用户ID" width="60"></el-table-column>
                    <el-table-column prop="nickName" label="用户昵称"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column prop="level" label="层级" width="50"></el-table-column>
                    <el-table-column prop="dayLogin" label="本日登录" width="80"></el-table-column>
                    <el-table-column prop="monthLogin" label="本月登录" width="80"></el-table-column>
                    <el-table-column prop="lastLoginTime" label="最近登录时间"></el-table-column>
                    <el-table-column prop="code" label="授权码" width="100"></el-table-column>
                    <el-table-column prop="address" label="区域/省市区"></el-table-column>
                    <el-table-column prop="style" label="渠道" width="100"></el-table-column>
                    <el-table-column prop="down" label="下级" width="50"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="detailItem(scope.$index,scope.row)">详情</el-button>
                            <el-button type="danger" size="small" @click="closeItem(scope.$index,scope.row.id)">关闭</el-button>
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
                    phone:''
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
                this.$router.push({path:'/memberDetail',query:{id:row.id}})
            },
            //删除
            closeItem(index,id){

            },
            //导出
            exportData(){

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

    .table-block .el-form-item{margin-bottom: 0 !important;}
    .search-area{margin-bottom: 20px}
    .search-area .el-input__inner{width: 160px}




</style>