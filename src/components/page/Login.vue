<template>
    <div class="login-wrap">
        <div class="ms-title">CRM系统后台登陆</div>
        <div class="ms-login">
            <el-tabs class="tab" v-model="loginType" type="card" @tab-click="tabClick">
                <el-tab-pane label="账号登陆" name="first">
                    <el-form :model="form1" :rules="rules" ref="form1" label-width="0px">
                        <el-form-item prop="phone">
                            <el-input class="login-inp" size="large" placeholder="请输入登陆手机号" v-model="form1.phone">
                                <icon slot="prefix" class="login-ico" ico="icon-zhucedengluyonghuming"></icon>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" style="margin-top:-40px">
                            <el-input class="login-inp" type="password" size="large" placeholder="请输入登陆密码" v-model="form1.password">
                                <icon slot="prefix" class="login-ico" ico="icon-3denglumima"></icon>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button @click="submitForm('form1')">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机验证登陆" name="second">
                    <el-form :model="form2" :rules="rules" ref="form2" label-width="0px">
                        <el-form-item prop="phone">
                            <el-input class="login-inp" size="large" placeholder="请输入登陆手机号" v-model="form2.phone">
                                <icon slot="prefix" class="login-ico" ico="icon-zhucedengluyonghuming"></icon>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code" style="margin-top:-40px">
                            <el-input class="login-inp" size="large" placeholder="请输入验证码" v-model="form2.code">
                                <icon slot="prefix" class="login-ico" ico="icon-yanzhengma"></icon>
                            </el-input>
                            <el-button @click="getCode" class="code-btn" type="primary" v-if="code">获取验证码</el-button>
                            <el-button class="code-btn" type="primary" v-else>{{codeTime}}s</el-button>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button @click="submitForm('form2')">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="扫码登陆" name="third">扫码登陆</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import * as api from "../../api/api.js";
import icon from "../common/ico";
export default {
  components: {
    icon
  },
  data() {
    return {
      loginType: "first",
      code: true,
      codeTime: 5,
      form1: {
        phone: "",
        password: ""
      },
      form2: {
        phone: "",
        code: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入登陆手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this[formName];
          let url;
          if (formName == "form1") {
            url = api.loginByPwd;
          } else {
            url = api.loginByCode;
          }
          this.$axios
          .post(url, data)
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success("登陆成功！");
              localStorage.setItem("ms_username", res.data.data.name);
              localStorage.setItem("ms_userID", res.data.data.id);
              localStorage.setItem(
                "ms_hadFirstLogin",
                res.data.data.hadFirstLogin
              );
              this.$router.push("/dashboard");
            } else {
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
    // 获取验证码
    getCode() {
      let phoneNum = this.form2.phone;
      if (phoneNum == "") {
        this.$message.warning("请输入手机号!");
        return;
      }
      let that = this;
      this.code = false;
      this.codeTime = 60;
      let timer = setInterval(function() {
        that.codeTime--;
        if (that.codeTime <= 0) {
          that.code = true;
          clearInterval(timer);
        }
      }, 1000);
    },
     // tab切换
    tabClick(params) {
      console.log(params);
    },

    // 获取所有权限列表
    getAllPermissionList(){
      this.$axios.post(api.getRoleList,{})
      .then(res=>{
        if(res.data.code == 200){
          console.log(res.data)
          return true;
        }else{
          this.$message.warning(res.data.msg);
          return false;
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
  }
};
</script>

<style lang='less'>
@import "../../assets/css/login/login.css";
</style>