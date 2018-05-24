<template>
    <div>
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card>
            <div class="add-box">
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <span class="add-box-title">基础信息</span>
                    <el-form-item prop="name" label="所在岗位">
                        <el-input style="width:220px" v-model="form.name" placeholder="请选择"></el-input>
                    </el-form-item>
                    <el-form-item prop="department" label="所属部门">
                        <el-select v-model="form.department" multiple placeholder="请选择">
                            <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <hr width='90%' size='1' color='#ccc' class='add-box-sep'>
                    <span class="add-box-title">权限设置</span>
                    <el-collapse accordion>
                        <el-collapse-item>
                            <template slot="title">
                                <el-checkbox class="collapse-tit" :indeterminate="isIndeterminateUser" v-model="checkAllUser" @change="handleCheckAllChangeUser">会员管理</el-checkbox>
                            </template>
                            <el-checkbox-group v-model="checkedUser" @change="handleCheckedUserChange">     
                                <div class="collapse-title">经销商</div>      
                                <div style="overflow:hidden;margin-bottom:10px">
                                    <div class="collapse-item">
                                        <el-checkbox v-for="v in userManList" :label="v.label" :key="v.label">{{v.label}}</el-checkbox>
                                    </div>
                                </div> 
                                <div style="overflow:hidden;margin-bottom:10px">
                                    <div class="collapse-title">经销商邀请</div>
                                    <div class="collapse-item">
                                        <el-checkbox v-for="v in userManList" :label="v.label" :key="v.label">{{v.label}}</el-checkbox>
                                    </div>
                                </div>
                                <div style="overflow:hidden;margin-bottom:10px">
                                    <div class="collapse-title">经销商会员管理</div>
                                    <div class="collapse-item">
                                        <el-checkbox v-for="v in userManList" :label="v.label" :key="v.label">{{v.label}}</el-checkbox>
                                    </div>
                                </div>
                            </el-checkbox-group>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse accordion>
                        <el-collapse-item>
                            <template slot="title">
                                <el-checkbox class="collapse-tit" :indeterminate="isIndeterminateUser" v-model="checkAllUser" @change="handleCheckAllChangeUser">会员管理</el-checkbox>
                            </template>
                            <el-checkbox-group v-model="checkedUser" @change="handleCheckedUserChange">     
                                <div class="collapse-title">经销商</div>      
                                <div style="overflow:hidden;margin-bottom:10px">
                                    <div class="collapse-item">
                                        <el-checkbox v-for="v in userManList" :label="v.label" :key="v.label">{{v.label}}</el-checkbox>
                                    </div>
                                </div> 
                                <div style="overflow:hidden;margin-bottom:10px">
                                    <div class="collapse-title">经销商邀请</div>
                                    <div class="collapse-item">
                                        <el-checkbox v-for="v in userManList" :label="v.label" :key="v.label">{{v.label}}</el-checkbox>
                                    </div>
                                </div>
                                <div style="overflow:hidden;margin-bottom:10px">
                                    <div class="collapse-title">经销商会员管理</div>
                                    <div class="collapse-item">
                                        <el-checkbox v-for="v in userManList" :label="v.label" :key="v.label">{{v.label}}</el-checkbox>
                                    </div>
                                </div>
                            </el-checkbox-group>
                        </el-collapse-item>
                    </el-collapse>
                    <el-form-item class="sub-btn">
                        <el-button size="medium" type="primary" @click="submitForm('form')">提交</el-button>
                        <el-button size="medium" @click="resetForm('form')">重置</el-button>
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
  data() {
    return {
      nav: ["权限管理", "岗位权限管理", "添加岗位"],
      checkAllUser: false,
      isIndeterminateUser: false,
      checkedUser: [],
      userManList: [
        { group: "经销商", label: "实习省代" },
        { group: "经销商邀请", label: "体验VIP" },
        { group: "经销商会员管理", label: "省代" }
      ],
      department: [],
      form: {
        department: [],
        name: "",
      },
      rules: {
        name: { required: true, message: "请选择所在岗位", trigger: "blur" },
        department: {
          required: true,
          message: "请选择所属部门",
          trigger: "blur"
        },
      }
    };
  },
  activated() {
    this.getDepartmentList();
    this.getRoleList();
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {};
          data.name = this.form.name;
          data.department = this.form.department.join(",");
          this.$axios
            .post(api.addRole, data)
            .then(res => {
              if(res.data.code == 200){
                  this.$message.success(res.data.msg);
                  this.$router.push('/jobsPermissionMange');
              }else{
                  this.$message.warning(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 全选用户管理
    handleCheckAllChangeUser(val) {
      let tmp = [];
      this.userManList.forEach(function(v) {
        tmp.push(v.label);
      });
      this.checkedUser = val ? tmp : [];
      this.isIndeterminateUser = false;
    },
    handleCheckedUserChange(value) {
      let checkedCount = value.length;
      this.checkAllUser = checkedCount === this.userManList.length;
      this.isIndeterminateUser =
        checkedCount > 0 && checkedCount < this.userManList.length;
    },

    // 获取权限列表
    getRoleList() {
      let data = {};
      this.$axios
        .post(api.getRoleList, data)
        .then(res => {
          this.userManList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取部门列表
    getDepartmentList() {
      this.department = [];
      this.$axios
        .post(api.queryDepartmentList, {})
        .then(res => {
          if (res.data.code == 200) {
            res.data.data.forEach((v, k) => {
              this.department.push({ label: v.name, value: v.id });
            });
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
  .add-mange-inp {
    width: 217px;
  }
  .add-box-title {
    display: block;
    margin: 0px 0px 20px 10px;
  }
  .add-box-sep {
    margin-bottom: 20px;
  }
  .el-collapse {
    width: 90%;
    border: 1px solid #ccc;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 10px;
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      border: none;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
  .collapse-tit .el-checkbox__label {
    font-size: 14px;
  }
  .collapse-item {
    float: left;
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 38px;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
  }
  .collapse-title {
    float: left;
    height: 38px;
    line-height: 38px;
    margin: 0px 10px 0px 20px;
    font-size: 14px;
  }
  .el-checkbox {
    margin-left: 20px;
  }
  .sub-btn {
    margin-top: 20px;
    padding-left: 30%;
    box-sizing: border-box;
  }
}
</style>


