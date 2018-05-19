<template>
    <div class="edit-manger-msg">
        <breadcrumb :nav='nav'></breadcrumb>
        <el-card :body-style="{padding:'0px'}">
            <div class="box">
                <div class="detail-msg">
                    <span>基础信息</span>
                    <p>姓名：张三</p>
                    <p>手机号：17601056863</p>
                    <span>部门信息</span>
                    <p>所属部门：运营部</p>
                    <p>所在岗位：运营经理</p>
                    <p>直接上级：运营总监</p>
                    <span>权限信息</span>
                    <p>默认权限：运营经理职权</p>
                    <div class="avatar"></div>
                    <el-button type="primary" class='edit-btn' @click='editPwd'>登陆密码修改</el-button>
                </div>
            </div>
        </el-card>
        <el-dialog title="登陆密码修改" width="30%" :visible.sync="isShowEditPwd">
            <div class="toask-wrap">
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item prop="phone">
                        <el-input class="edit-pwd-inp" size="large" placeholder="请输入手机号" v-model="form.phone">
                            <icon slot="prefix" class="inp-ico " ico="icon-zhucedengluyonghuming"></icon>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input class="edit-pwd-inp" size="large" placeholder="请输入验证码" v-model="form.code">
                            <icon slot="prefix" class="inp-ico " ico="icon-yanzhengma"></icon>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="edit-pwd-inp" size="large" placeholder="请重新设置您的密码" v-model="form.password">
                            <icon slot="prefix" class="inp-ico " ico="icon-3denglumima"></icon>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="repeatPwd">
                        <el-input class="edit-pwd-inp" size="large" placeholder="请再次输入您的密码" v-model="form.repeatPwd">
                            <icon slot="prefix" class="inp-ico " ico="icon-3denglumima"></icon>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="code-btn">获取验证码</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmEditPwd('form')">确 定</el-button>
                <el-button @click="isShowEditPwd = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import breadcrumb from "../../common/Breadcrumb";
import icon from "../../common/ico";
export default {
  components: {
    breadcrumb,
    icon
  },
  data() {
    return {
      nav: ["权限管理", "管理员基础信息修改"],
      isShowEditPwd: false,
      form: {
        phone: "",
        code:'',
        password:'',
        repeatPwd:''
      },
      rules: {
          phone:[{ required: true, message: '请输入电话号码', trigger: 'blur' }],
          code:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    };
  },
  activated() {
    let userId =
      this.$route.params.editMangerMsg ||
      sessionStorage.getItem("editMangerMsg");
    console.log(userId);
  },
  methods:{
    //   修改密码
      editPwd(){
          this.form = {};
          this.isShowEditPwd = true;
      },
      confirmEditPwd(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isShowEditPwd = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>
<style lang="less">
.edit-manger-msg {
  .box {
    width: 100%;
    height: 80vh;
    padding: 50px 100px;
    box-sizing: border-box;
    .detail-msg {
      position: relative;
      width: 760px;
      height: 380px;
      padding: 0px 45px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 10px;
      & > span {
        line-height: 46px;
        font-size: 16px;
      }
      p {
        line-height: 36px;
        font-size: 14px;
        color: #666;
      }
      .avatar {
        position: absolute;
        top: 20px;
        right: 60px;
        width: 100px;
        height: 100px;
        border: 2px solid #dfdfdf;
        border-radius: 10px;
      }
      .edit-btn {
        position: absolute;
        top: 145px;
        right: 60px;
      }
    }
  }
  .toask-wrap{
      position: relative;
      .code-btn{
          position: absolute;
          top: 76px;
          right: 92px;
          border-radius: 10px;
      }
  }
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }
  .el-dialog__title {
    color: #ff6868;
  }
  .edit-pwd-inp {
    width: 370px;
    margin-left: 85px;
    .inp-ico{
        font-size: 22px;
        margin-top: 12px;
    }
  }
  .el-form-item__error{
      left: 92px;
  }
}
</style>


