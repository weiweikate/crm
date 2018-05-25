<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理']"></v-breadcrumb>
        <el-card style="margin:10px 0 20px">
            <el-form ref="form" :inline="true" :model="form">
                <el-form-item prop="id" label="用户ID" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户ID" v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item prop="nickname" label="用户昵称" label-width="120">
                    <el-input style="width:200px" placeholder="请输入用户昵称" v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="授权码" label-width="120">
                    <el-input style="width:200px" placeholder="请输入授权码" v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item prop="idCard" label="证件号" label-width="120">
                    <el-input style="width:200px" placeholder="请输入证件号" v-model="form.idCard"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号" label-width="120">
                    <el-input style="width:200px" placeholder="请输入手机号" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item prop="level" label="会员类型" label-width="120">
                    <el-select v-model="exportForm.level" placeholder="请选择会员类型">
                        <el-option label="一级" value="0"></el-option>
                        <el-option label="二级" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getList(1)" type="primary">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="table-block">
            <el-form ref="exportForm" :inline="true" :model="exportForm" class="search-area">
                <el-form-item>
                    <div style="display: inline-block;margin-right: 20px">
                        <region @regionMsg='getRegion' :regionMsg='address'></region>
                    </div>
                </el-form-item>
                <el-form-item prop="level" label="用户层级" label-width="120">
                    <el-select v-model="exportForm.level" placeholder="全部层级">
                        <el-option label="全部层级" value=""></el-option>
                        <el-option :label="item.name" :value="item.level" v-for="(item,index) in levelList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="exportData" type="primary">导出</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table v-loading="tableLoading" :data="tableData" :height="height" border style="width: 100%">
                    <el-table-column prop="id" label="用户ID" width="60"></el-table-column>
                    <el-table-column prop="nickName" label="用户昵称"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column label="层级" width="50">
                        <template slot-scope="scope">{{scope.row.level}}级</template>
                    </el-table-column>
                    <el-table-column prop="dayLogin" label="本日登录" width="80"></el-table-column>
                    <el-table-column prop="monthLogin" label="本月登录" width="80"></el-table-column>
                    <el-table-column label="最近登录时间">
                        <template slot-scope="scope">
                            <template>{{scope.row.last_logintime|formatDate}}</template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="授权码" width="100"></el-table-column>
                    <el-table-column prop="address" label="区域/省市区"></el-table-column>
                    <el-table-column prop="style" label="渠道" width="100"></el-table-column>
                    <el-table-column prop="down" label="下级" width="50"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status==1">待激活</template>
                            <template v-if="scope.row.status==2">正常</template>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="detailItem(scope.$index,scope.row)">详情
                            </el-button>
                            <el-button type="danger" size="small" @click="closeItem(scope.$index,scope.row.id)">关闭
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
    import region from '../../common/Region';
    import * as api from '../../../api/api';

    export default {
        components: {
            vBreadcrumb, icon, region
        },
        data() {
            return {
                tableData: [],
                tableLoading:false,
                page: {
                    currentPage: 1,
                    totalPage: 20
                },
                height: '',
                formLabelWidth: '100px',
                form: {
                    id: '',
                    nickName: '',
                    code: '',
                    idCard: '',
                    phone: ''
                },
                exportForm: {
                    level: '',
                },
                selected: '',
                address: [],
                levelList: [],//用户层级列表
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
                let data = that.form;
                data.page=val;
                that.tableLoading = true;
                that.$axios
                    .post(api.getDealerLevelList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.tableLoading = false;
                            that.tableData = res.data.data;
                            that.page.totalPage = res.data.resultCount;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.tableLoading = false;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        that.tableLoading = false;
                    })
            },
            //获取用户层级列表
            getLevelList() {
                let that = this;
                let data = {};
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
                localStorage.setItem('memberDetail', row.id);
                this.$router.push({path: '/memberDetail', query: {id: row.id}})
            },
            //关闭
            closeItem(index, id) {
            },

            //导出
            exportData() {

            },
            //   重置表单
            resetForm(formName) {
                this.address = [];
                this.$refs[formName].resetFields();
            },

            // 获取省市区
            getRegion(msg) {
                this.address = msg;
            }
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