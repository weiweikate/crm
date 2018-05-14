<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i> 权限测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理员权限页面</h1>
            <p>只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
            <p>想尝试一下，请<router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。</p>
        </div>
        <div>
            <h1>字体图标</h1> 
            <p><ico ico="icon-iconfontriyongbaihuo"></ico></p>
            <p style="font-size:28px"><ico ico="icon-iconfontriyongbaihuo"></ico></p>
            <p style="font-size:58px;color:red"><ico ico="icon-iconfontriyongbaihuo"></ico></p>
            <h1><ico ico="icon-shoucang" /></h1>
        </div>

    </div>
</template>

<script>
import ico from "../common/ico.vue";
export default {
  components: {
    ico
  },
  data: function() {
    return {};
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: #409eff;
}
</style>