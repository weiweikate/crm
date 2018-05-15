<template>
    <div>
        <breadcrumb :nav='["首页"]'></breadcrumb>
        <el-row>
            <el-col :span="24">
                <el-card class="top-card clearfix">
                    <div slot="header" class="clearfix">
                        <span class="card-title-rect"></span>
                        <span>数据类模块</span>
                    </div>
                    <div class="top-wrap">
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-zhucedengluyonghuming' /> 今日会员注册</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-huiyuan' /> 本月会员注册</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-huiyuanjifenshixiaobaobiao' /> 今日晋升会员</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-huiyuanjifenshixiaobaobiao' /> 本月晋升会员</div>
                            <div class="ocontent">66</div>
                        </div>
                        <div class="top-card-content">
                            <div class="otitle"><icon class="icon" ico='icon-yubeifeiyong' /> 本日自动续费</div>
                            <div class="ocontent">66</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row >
        <el-row :gutter="20" style="margin-top:20px">
            <el-col :span="10">
                <el-card class="top-card clearfix">
                    <div slot="header" class="clearfix">
                        <span class="card-title-rect"></span>
                        <span>待处理模块</span>
                    </div>
                    <div class="left-wrap">
                        <div class='left-content'>
                            <div class="ico-wrap"></div>
                            <span class='l-title'>待反馈问题</span>
                            <span class="l-content">666666</span>
                        </div>
                        <div class='left-content'>
                            <div class="ico-wrap"></div>
                            <span class='l-title'>待处理晋升审核</span>
                            <span class="l-content">666666</span>
                        </div>
                        <div class='left-content'>
                            <div class="ico-wrap"></div>
                            <span class='l-title'>待审核产品</span>
                            <span class="l-content">666666</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card class="top-card clearfix">
                    <div slot="header" class="clearfix">
                        <span class="card-title-rect"></span>
                        <span>快捷操作模块</span>
                    </div>
                    <div class="right-wrap">
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-chanpin1' /></div>
                            <span class="r-content">发布产品</span>
                        </div>
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-tongzhi' /></div>
                            <span class="r-content">发布公告/通知</span>
                        </div>
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-huiyuan' /></div>
                            <span class="r-content">创建管理员账号</span>
                        </div>
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-huiyuantianjiakehu' /></div>
                            <span class="r-content">会员邀请</span>
                        </div>
                        <div class="right-content">
                            <div class="r-ico-wrap"><icon ico='icon-chaxun' /></div>
                            <span class="r-content">防伪码查询</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import icon from "../common/ico";
import breadcrumb from '../common/Breadcrumb';
export default {
  components: {
    icon,
    breadcrumb,
  },
  data() {
    return {};
  }
};
</script>


<style scoped>
@import "../../assets/css/dashboard.css";
</style>
