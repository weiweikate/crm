<template>
    <div class="pwd-mask">
        <div class="box">
            <div class="mask-title">编辑渠道</div>
            <div class="mask-content">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="渠道名称">
                        <el-input v-model="form.name" placeholder="请输入渠道名称" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="一级渠道">
                        <el-input v-model="form.channel" disabled size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-select v-model="form.isUse">
                            <el-option value="1" label="是"></el-option>
                            <el-option value="0" label="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="submit-btn">
                        <el-button type="primary" @click="submitForm('form')">确认</el-button>
                        <el-button @click="closeToask">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import icon from "../../../common/ico";
export default {
  components: {
    icon
  },
  data() {
    return {
      form: {
         channel: "一级渠道",
        name: "",
        isUse: "1"
      }
    };
  },
  methods: {
    //  取消弹窗
    closeToask() {
      this.$emit("status", false);
    },
    // 提交表单
    submitForm(form) {
      this.closeToask();
    }
  }
};
</script>
<style lang="less" scoped>
.pwd-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  .box {
    width: 530px;
    height: 305px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .mask-title {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid #ccc;
      padding-left: 45px;
      box-sizing: border-box;
      line-height: 56px;
      color: #ff6868;
      font-weight: 700;
    }
    .mask-content {
      position: relative;
      width: 100%;
      height: 248px;
      overflow: hidden;
      padding: 30px 45px 0 45px;
      box-sizing: border-box;
      .submit-btn {
        margin-top: 20px;
        padding-left: 225px;
        box-sizing: border-box;
      }
    }
  }
}
</style>


