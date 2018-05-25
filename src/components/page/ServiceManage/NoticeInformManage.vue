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
                    <el-form-item prop="status" label="状态" label-width="120">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="待推送" value="1"></el-option>
                            <el-option label="已发送" value="2"></el-option>
                            <el-option label="取消推送" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="name" label="发布者" label-width="120">
                        <el-input style="width:200px" placeholder="请输入发布者" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="时间" label-width="120">
                        <el-date-picker
                                v-model="form.date"
                                type="datetimerange"
                                format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList(1)" type="primary">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
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
                    <el-table-column prop="id" label="ID" width="60"></el-table-column>
                    <el-table-column prop="n_type" label="类型" width="80">
                        <template slot-scope="scope">
                            <template v-if="scope.row.n_type==1">公告</template>
                            <template v-if="scope.row.n_type==2">通知</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="push_way" label="推送用户"></el-table-column>
                    <el-table-column label="推送区域">
                        <template slot-scope="scope">
                            <template v-if="scope.row.push_country==1">全国</template>
                            <template v-if="scope.row.push_country==2">国外</template>
                        </template>
                    </el-table-column>
                    <el-table-column label="推送时间">
                        <template slot-scope="scope">
                            <template>{{scope.row.order_time|formatDate}}</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="发布者" width="80"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==1">待推送</template>
                            <template v-if="scope.row.status==2">已推送</template>
                            <template v-if="scope.row.status==3">取消推送</template>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="detailItem(scope.$index,scope.row)">查看详情</el-button>
                            <el-button type="warning" size="small" @click="upStatusItem(scope.row.id,2)" v-if="scope.row.status==2">再次推送</el-button>
                            <el-button type="success" size="small" @click="upStatusItem(scope.row.id,3)" v-if="scope.row.status==1">取消推送</el-button>
                            <el-button type="danger" size="small" @click="upStatusItem(scope.row.id,4)" v-if="scope.row.status==3">删除</el-button>
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
        <!--删除弹窗-->
        <delete-toast :id='delId' :url='delUrl' @msg='deleteToast' v-if="isShowDelToast"></delete-toast>
    </div>
</template>

<script>
    import vBreadcrumb from '../../common/Breadcrumb.vue';
    import icon from '../../common/ico.vue';
    import deleteToast from "../../common/DeleteToast";
    import * as api from '../../../api/api';
    import moment from 'moment'
    import {getList} from "../../../api/api";

    export default {
        components: {
            vBreadcrumb,icon,deleteToast
        },
        data() {
            return {
                checked:[true,false],
                tableData:[],
                page:{
                    currentPage:1,
                    totalPage:0
                },
                height:'',
                formLabelWidth:'100px',
                form:{
                    status:'',
                    name:'',
                    date:'',
                    nType:'1'
                },
                exportForm:{
                    level:'',
                },
                selected:'',
                nav:['服务管理','公告'],
                isShowDelToast: false,
                delId: '',
                delUrl:'',
            }
        },
        created(){
            let winHeight=window.screen.availHeight-520;
            this.height=winHeight;
            this.getList(this.page.currentPage)
        },
        activated(){
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
                    that.nav=['服务管理','公告'];
                    that.form.nType=1;
              } else{//通知
                  that.nav=['服务管理','通知'];
                  that.form.nType=2;
              }
              that.getList(that.page.currentPage)
            },
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    status:that.form.status,
                    name:that.form.name,
                    nType:that.form.nType,
                    beginTime:that.form.date?moment(that.form.date[0]).format('YYYY-MM-DD'):'',
                    endTime:that.form.date?moment(that.form.date[1]).format('YYYY-MM-DD'):'',
                };
                that.tableLoading = true;
                that.$axios
                    .post(api.getNoticeList, data)
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
                localStorage.setItem('addNoticeInform',row.id);
                this.$router.push({path:'/addNoticeInform',query:{id:row.id}})
            },
            //再次推送,取消推送
            upStatusItem(id,status){
                let that = this;
                let data = {
                    id: id,
                    status:status,
                };
                that.$axios
                    .post(api.updateNoticeStatus, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.getList(that.page.currentPage)
                        } else {
                            that.$message.warning(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //删除
            delItem(index,id){
                this.delId = '999';
                this.isShowDelToast = true;
            },
            // 删除弹窗
            deleteToast(msg) {
                this.isShowDelToast = msg;
            },
            //发布通知/公告
            addInf(){
                this.$router.push('/addNoticeInform')
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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