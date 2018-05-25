<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商加盟管理']"></v-breadcrumb>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item prop="initiator" label="发起人" label-width="120">
                        <el-input style="width:200px" placeholder="请输入发起人姓名" v-model="form.initiator"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="getList(1)" type="primary">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        <div class="table-block">
            <el-button @click="sendInvite" style="margin-bottom: 20px" type="primary">发起邀请</el-button>
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="邀请记录ID" width="150"></el-table-column>
                    <el-table-column prop="level" label="邀请层级" width="150"></el-table-column>
                    <el-table-column prop="dayLogin" label="授权渠道"></el-table-column>
                    <el-table-column prop="monthLogin" label="邀请代理品牌"></el-table-column>
                    <el-table-column prop="lastLoginTime" label="邀请时间" width="180"></el-table-column>
                    <el-table-column prop="code" label="发起者" width="150"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="detailItem(scope.$index,scope.row)">详情</el-button>
                            <el-button type="danger" size="small" @click="watchItem(scope.$index,scope.row.id)">查看邀请</el-button>
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
                tableLoading:false,
                page:{
                    currentPage:1,
                    totalPage:20
                },
                height:'',
                formLabelWidth:'100px',
                form:{
                    initiator:''
                },
                selected:''
            }
        },
        created(){
            let winHeight=window.screen.availHeight-520;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        activated() {
            let winHeight=window.screen.availHeight-520;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        methods: {
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    initiator:that.form.initiator,
                };
                that.tableLoading = true;
                that.$axios
                    .post(api.getInvitePageList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading=false;
                            that.tableData=res.data.data.data;
                            that.page.totalPage = res.data.data.resultCount;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.tableLoading=false;
                        }
                    })
                    .catch(err => {
                        that.tableLoading = false;
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
                sessionStorage.setItem('inviteDetail',JSON.stringify({ id:row.id }));
                this.$router.push({path:'/inviteDetail',query:{id:row.id}})
            },
            //查看邀请
            watchItem(index,id){
                sessionStorage.setItem('inviteLink',JSON.stringify({ id:id}));
                this.$router.push({path:'/inviteLink',query:{id:row.id}})
            },
            //发起邀请
            sendInvite(){
                this.$router.push('/sendInvite')
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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