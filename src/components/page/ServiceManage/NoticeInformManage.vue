<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="bread-item" v-for="(item,index) in nav" :key="index"><icon class="ico" v-if="index == 0" ico="icon-dingwei1" />{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <transition name="move" appear>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" :inline="true" :model="form" >
                    <el-form-item label="状态" label-width="120">
                        <el-select v-model="exportForm.level" placeholder="请选择">
                            <el-option label="全部状态" value="0"></el-option>
                            <el-option label="待推送" value="1"></el-option>
                            <el-option label="已发送" value="2"></el-option>
                            <el-option label="取消推送" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布者" label-width="120">
                        <el-input style="width:200px" placeholder="请输入发布者" v-model="form.id"></el-input>
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
                    <el-form-item>
                        <el-button @click="search" type="primary">查询</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <div class="table-block">
            <div style="margin: -20px 0 20px">
                <div class="tab-item" :class="checked[0]?'checked':''" @click="change(0)">公告</div>
                <div class="tab-item" :class="checked[1]?'checked':''" @click="change(1)" style="margin-left: -5px">通知</div>
            </div>
            <el-form ref="exportForm" :inline="true" :model="form" class="search-area">
                <el-form-item>
                    <el-button @click="addInf" type="primary">发布通知/公告</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="ID" label="ID" width="60"></el-table-column>
                    <el-table-column prop="nickName" label="类型"></el-table-column>
                    <el-table-column prop="phone" label="标题"></el-table-column>
                    <el-table-column prop="level" label="推送用户" width="50"></el-table-column>
                    <el-table-column prop="address" label="推送区域"></el-table-column>
                    <el-table-column prop="lastLoginTime" label="推送时间"></el-table-column>
                    <el-table-column prop="dayLogin" label="发布者" width="80"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="detailItem(scope.$index,scope.row)">查看详情</el-button>
                            <el-button type="warning" size="small" @click="closeItem(scope.$index,scope.row.id)">再次推送</el-button>
                            <el-button type="success" size="small" @click="closeItem(scope.$index,scope.row.id)">取消推送</el-button>
                            <el-button type="danger" size="small" @click="closeItem(scope.$index,scope.row.id)">删除</el-button>
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
                checked:[true,false],
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
                selected:'',
                nav:['服务管理','公告']
            }
        },
        created(){
            let winHeight=window.screen.availHeight-520;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        methods: {
            change(num){
                let that=this;
                that.checked=[false,false];
                that.checked[num]=true;
              if(num==0){//公告
                    that.nav=['服务管理','公告']
              } else{//通知
                  that.nav=['服务管理','通知']
              }
            },
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
            //发布通知/公告
            addInf(){
                this.$router.push('/addNoticeInform')
            },
            //查询
            search(){

            }
        }
    }
</script>

<style>
    .breadcrumb {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 30px;
        overflow: hidden;
        background: white;
        padding-left:40px;
        box-sizing:border-box;
    }
    .bread-item {
        line-height: 30px;
    }
    .ico {
        margin-right:5px;
        color:#33b4ff;
        font-size:18px;
    }
    .tab-item{
        width: 116px;
        height: 50px;
        line-height: 50px;
        border-radius: 0 0 5px 5px;
        text-align: center;
        color:#fff;
        background: #dddddd;
        display: inline-block;
        cursor: pointer;
    }
    .checked{
        background: #ff6868;
    }
    /*表格样式*/
    .table-block{padding: 20px 20px 60px;background: #fff}
    .block{float:right;margin-top: 10px}
     .content{padding: 40px 40px 0}
    .table-block .el-form-item{margin-bottom: 0 !important;}
    .search-area{margin-bottom: 20px}
    .search-area .el-input__inner{width: 160px}




</style>