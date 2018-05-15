<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item class="bread-item" v-for="(item,index) in nav" :key="index"><icon class="ico" v-if="index == 0" ico="icon-dingwei1" />{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
import icon from "./ico";
export default {
  props: ["nav"],
  components: {
    icon
  }
};
</script>
<style lang="less" scoped>
.breadcrumb {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
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
</style>


