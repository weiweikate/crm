<template>
    <div>
        <v-breadcrumb :nav="['服务管理','问题反馈']"></v-breadcrumb>
            <el-card style="margin:10px 0 20px">
                <el-form ref="form" inline :model="form">
                    <el-form-item prop="level" label="用户层级" label-width="120">
                        <el-select v-model="form.level" placeholder="全部层级">
                            <el-option label="全部层级" value=""></el-option>
                            <el-option :label="item.name" :value="item.level" v-for="(item,index) in levelList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="type" label="问题类型" label-width="120">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="账户问题" value="1"></el-option>
                            <el-option label="营销问题" value="2"></el-option>
                            <el-option label="购买流程" value="3"></el-option>
                            <el-option label="推广机制" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="date" label="时间" label-width="120">
                        <el-date-picker
                                v-model="form.date"
                                type="datetimerange"
                                format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="status" label="反馈状态" label-width="120">
                        <el-select v-model="form.status" placeholder="全部反馈">
                            <el-option label="全部反馈" value=""></el-option>
                            <el-option label="待处理" value="1"></el-option>
                            <el-option label="已处理" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="userName" label="用户" label-width="120">
                        <el-input style="width:200px" placeholder="请输入用户" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="adminName" label="处理人" label-width="120">
                        <el-input style="width:200px" placeholder="请输入处理人" v-model="form.adminName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getList(1)" type="primary">查询</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        <div class="table-block">
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="id" label="ID" width="60"></el-table-column>
                    <el-table-column prop="nickname" label="用户"></el-table-column>
                    <el-table-column label="类型">
                        <template slot-scope="scope">
                            <template v-if="scope.row.d_type == 1">网信经销商</template>
                            <template v-if="scope.row.d_type == 2">供货经销商</template>
                            <template v-if="scope.row.d_type == 3">网红经销商</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="层级"></el-table-column>
                    <el-table-column prop="phone" label="联系电话"></el-table-column>
                    <el-table-column prop="address" label="所在区域"></el-table-column>
                    <el-table-column label="反馈时间">
                        <template slot-scope="scope">
                            {{scope.row.create_time|formatDate}}
                        </template>
                    </el-table-column>
                    <el-table-column label="问题类型" width="100">
                        <template slot-scope="scope">
                            <template v-if="scope.row.type_key == 1">账户问题</template>
                            <template v-if="scope.row.type_key == 2">营销问题</template>
                            <template v-if="scope.row.type_key == 3">购买流程</template>
                            <template v-if="scope.row.type_key == 4">推广机制</template>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="100">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status == 1">待处理</template>
                            <template v-if="scope.row.status == 2">已处理</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adminName" label="处理人"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="detailItem(scope.$index,scope.row)">查看详情
                            </el-button>
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
    import moment from 'moment';

    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                tableData: [],
                tableLoading: false,
                page: {
                    currentPage: 1,
                    totalPage: 0
                },
                height: '',
                formLabelWidth: '100px',
                form: {
                    level: '',
                    date: '',
                    type:'',
                    status:'',
                    adminName:'',
                    userName:''
                },
                levelList:[],//用户层级列表
                selected: ''
            }
        },
        created() {
            let winHeight = window.screen.availHeight - 520;
            this.height = winHeight;
            this.getList(this.page.currentPage);
            this.getLevelList()
        },
        activated() {
            let winHeight = window.screen.availHeight - 520;
            this.height = winHeight;
            this.getList(this.page.currentPage);
            this.getLevelList()
        },
        methods: {
            //获取列表
            getList(val) {
                let that = this;
                let data = {
                    page: val,
                    level:that.form.level,
                    type:that.form.type,
                    status:that.form.status,
                    userName:that.form.userName,
                    adminName:that.form.adminName,
                    beginTime:that.form.date?moment(that.form.date[0]).format('YYYY-MM-DD'):'',
                    endTime:that.form.date?moment(that.form.date[1]).format('YYYY-MM-DD'):'',
                };
                that.tableLoading = true;
                that.$axios
                    .post(api.feedbackList, data)
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
            //获取用户层级列表
            getLevelList() {
                let that = this;
                let data={};
                that.$axios
                    .post(api.getDealerLevelList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.levelList = res.data.data;
                        } else {
                            that.$message.warning(res.data.msg);
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.currentPage = val;
                this.getList(val)
            },
            //详情
            detailItem(index, row) {
                sessionStorage.setItem('feedDetail',JSON.stringify({ id:row.id }));
                this.$router.push({path: '/feedDetail', query: {id: row.id}})
            },

            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.form.date='';
                this.getList(this.page.currentPage)
            },
        }
    }
</script>

<style>
    /*表格样式*/
    .table-block {
        padding: 20px 20px 60px;
        background: #fff
    }

    .block {
        float: right;
        margin-top: 10px
    }

    .content {
        padding: 40px 40px 0
    }

    .table-block .el-form-item {
        margin-bottom: 0 !important;
    }

    .search-area {
        margin-bottom: 20px
    }

    .search-area .el-input__inner {
        width: 160px
    }


</style>