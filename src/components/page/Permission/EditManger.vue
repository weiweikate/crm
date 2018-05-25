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
                    <div class="add-avatar"></div>
                    <hr width='90%' size='1' color='#ccc' class='add-box-sep'>
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
                    <hr width='90%' size='1' color='#ccc' class='add-box-sep'>
                    <span class="add-box-title">基础信息</span>
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
      nav: ["权限管理", "编辑账号"],
      checkAllUser: false,
      isIndeterminateUser: false,
      checkedUser: [],
      userManList: [
        { group: "经销商", label: "实习省代" },
        { group: "经销商邀请", label: "体验VIP" },
        { group: "经销商会员管理", label: "省代" }
      ],
      department: [
        {
          label: "技术部",
          value: "技术部"
        },
        {
          label: "财务部",
          value: "财务部"
        },
        {
          label: "人事部",
          value: "人事部"
        }
      ],
      form: {
        name: "",
        phone: "",
        department: [],
        job: "",
        superior: ""
      }
    };
  },
  methods: {
    // 上传图片
    uploadAvatar(file) {},

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
  .add-avatar {
    position: absolute;
    top: 3%;
    right: 2%;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 1px solid red;
  }
  .add-avatar-btn {
    position: absolute;
    top: 31%;
    right: 2.7%;
    border: 1px solid #ccc;
  }
  .el-collapse {
      width: 90%;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
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
    font-size: 18px;
  }
  .collapse-item {
    float: left;
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 10px;
    line-height: 38px;
    padding: 0 20px 0 20px;
    box-sizing: border-box;
  }
  .collapse-title {
    float: left;
    height: 38px;
    line-height: 38px;
    margin:0px 10px 0px 20px;
    font-size: 14px;
  }
  .el-checkbox {
    margin-left: 20px;
  }
}
</style>


