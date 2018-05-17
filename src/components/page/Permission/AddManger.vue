<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <div class="add-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <span class="add-box-title">基础信息</span>
                    <el-form-item prop="name" label="姓名">
                        <el-input class="add-mange-inp" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="手机号">
                        <el-input class="add-mange-inp" v-model="form.phone"></el-input>
                    </el-form-item>
                    <hr width='1255px' size='1' color='#ccc' class='add-box-sep'>
                    <span class="add-box-title">部门信息</span>
                    <el-form-item prop="department" label="所属部门">
                        <el-select v-model="form.department" multiple placeholder="请选择">
                            <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="job" label="所在岗位">
                        <el-select v-model="form.job" placeholder="请选择">
                            <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="superior" label="直接上级">
                        <el-input class="add-mange-inp" v-model="form.superior"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import breadcrumb from "../../common/Breadcrumb";
import * as api from "../../../api/api.js";
export default {
    components: {
        breadcrumb
    },
    data () {
        return {
            nav:['权限管理','创建账号'],
            department:[
                {
                    label:'技术部',
                    value:'技术部'
                },
                {
                    label:'财务部',
                    value:'财务部'
                },
                {
                    label:'人事部',
                    value:'人事部'
                },
            ],
            form:{
                name:'',
                phone:'',
                department:[],
                job:'',
                superior:''
            }
        }
    }
};
</script>
<style lang="less">
.add-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .add-mange-inp{
        width: 217px;
    }
    .add-box-title{
        display: block;
        margin: 0px 0px 20px 10px;
    }
    .add-box-sep{
        margin-bottom: 20px;
    }
}
</style>


