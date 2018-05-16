<template>
    <div class="sidebar">
        <div v-if="isShowLogo" class="search-area">
            <img class="logo-img" src="../../assets/images/logo.png" alt="" />
        </div>
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#222d32"
            text-color="#b1b1b1" active-text-color="#fff" router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      isShowLogo:true,
      items: [
        {
          icon: "el-icon-setting",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "el-icon-date",
          index: "3",
          title: "表单相关",
          subs: [
            {
              index: "form",
              title: "基本表单"
            }
          ]
        },
          {
              icon: "el-icon-goods",
              index: "4",
              title: "品牌产品管理",
              subs: [
                  {
                      index: "brandProductClassify",
                      title: "产品分类管理"
                  }
              ]
          },
          {
              icon: "el-icon-goods",
              index: "5",
              title: "会员管理",
              subs: [
                  {
                      index: "levelManage",
                      title: "经销商层级管理"
                  },{
                      index: "memberManage",
                      title: "会员管理"
                  }
              ]
          },
        {
          icon: "el-icon-warning",
          index: "permission",
          title: "权限测试"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      this.isShowLogo = !msg;
    });
  }
};
</script>

<style lang='less'>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background-color: #222d32;
  .el-submenu__title {
    font-size: 16px;
  }
  .el-menu-item {
    font-size: 16px;
  }
  .el-menu-item .is-active,
  .el-submenu .is-active {
    border-left: 5px solid #ff1e30;
    background-color:rgba(255, 255, 255, .2)!important;
  }
  .el-menu-item:hover{
    color: white!important;
    background-color:rgba(255, 255, 255, .2)!important;
  }
  .search-area {
    height: 150px;
    text-align: center;
    .logo-img {
      width: 128px;
      height: 128px;
      margin-top: 15px;
    }
  }
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
