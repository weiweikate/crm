<template>
    <div>
        <v-breadcrumb :nav="['品牌产品管理','品牌管理','添加品牌']"></v-breadcrumb>
        <div class="send-invite">
            <div class="box">
                <div class="mask-content">
                    <el-form :model="form">
                        <div class="title-item">邀请层级</div>
                        <el-form-item>
                            <div class="level-area checked">
                                <div class="upper">
                                    <icon class="icon" ico="icon-zhucedengluyonghuming"></icon>
                                    <div>明星CEO</div>
                                </div>
                                <div class="downer">已有人数：3434</div>
                            </div>
                            <div class="level-area">
                                <div class="upper">
                                    <icon class="icon" ico="icon-zhucedengluyonghuming"></icon>
                                    <div>明星CEO</div>
                                </div>
                                <div class="downer">已有人数：3434</div>
                            </div>
                        </el-form-item>
                        <div class="title-item">授权渠道</div>
                        <el-form-item>
                            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                            </el-tabs>
                            <div class="select-area" style="margin-top: -5px">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                             @change="handleCheckAllChange">全选
                                </el-checkbox>
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="select-area" style="margin-top: 10px">
                                <div style="margin: 0 10px;">已选择渠道</div>
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <div class="title-item">授权品牌</div>
                        <el-form-item>
                            <el-input
                                    placeholder="输入品牌关键词搜索"
                                    suffix-icon="el-icon-search"
                                    v-model="form.brandKey">
                            </el-input>
                            <div style="margin-top: 10px">
                                <div class="check-area">
                                    <div class="title">选择品牌</div>
                                    <div>
                                        <ul>
                                            <li class="selected">朵女郎</li>
                                            <li>迪奥</li>
                                            <li>自然堂</li>
                                            <li>珀莱雅</li>
                                            <li>LV</li>
                                            <li>丝芙兰</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="check-area">
                                    <div class="title">选择品类</div>
                                    <div>
                                        <ul>
                                            <li>纺织品</li>
                                            <li>化妆品</li>
                                            <li>箱包</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="opr-area">
                                    <el-button type="primary">添加品类</el-button>
                                    <el-button>删除品类</el-button>
                                </div>
                                <div class="check-area">
                                    <div class="title">已选择品牌-品类</div>
                                    <div>
                                        <ul>
                                            <li>朵女郎-纺织品</li>
                                            <li>自然堂-化妆品</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </el-form-item>
                        <div class="title-item">授权时间</div>
                        <el-form-item label="授权开始时间" class="time-area">
                            <el-input v-model="form.name" placeholder="请选择授权开始时间" suffix-icon="el-icon-date"
                                      size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="授权结束时间" class="time-area">
                            <span>-</span>
                            <el-input v-model="form.name" placeholder="请选择授权结束时间" suffix-icon="el-icon-date"
                                      size="medium"></el-input>
                        </el-form-item>
                        <div class="clearfix"></div>
                        <div class="title-item">邀请有效期</div>
                        <el-form-item>
                            <el-radio-group v-model="form.validity">
                                <el-radio label="0">
                                    链接打开次数
                                    <el-input class="small-inp"></el-input>
                                    次
                                </el-radio>
                                <el-radio label="1">
                                    设置失效时间
                                    <el-input class="lar-inp"></el-input>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="submit-btn">
                    <el-button type="primary" @click="submitForm('form')">确认保存</el-button>
                    <el-button @click="closeToask">取消</el-button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import icon from "../../../common/ico";
    import vBreadcrumb from '../../../common/Breadcrumb.vue';

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: '',
                    brandKey: '',
                    validity: '0'
                },
                activeName2: 'first',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,
                isUpdateUperMask: false
            };
        },
        methods: {

            //  取消弹窗
            closeToask() {
                this.$emit("status", false);
            },
            //渠道选项卡
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            // 提交表单
            submitForm(form) {
                this.closeToask();
            },
            sureUpdate() {
                this.isUpdateUperMask = true
            },
            closeUpdateUperMask() {
                this.isUpdateUperMask = false
            }
        }
    };
</script>
<style lang="less">
    .send-invite {
        .title-item {
            padding: 10px 0 20px
        }
        .box {
            background-color: #fff;
            border-radius: 10px;
            .mask-content {
                position: relative;
                width: 100%;
                padding: 20px 45px 30px 45px;
                box-sizing: border-box;
                .submit-btn {
                    margin-top: 30px;
                    padding-left: 225px;
                    box-sizing: border-box;
                }
            }
        }
        .el-form-item__label {
            float: none;
            text-align: left
        }
        .special .el-form-item__label {
            float: left;
            width: 80px
        }
        .el-input {
            width: 200px
        }
        .el-input__inner {
            width: 200px
        }
        .tip {
            color: #ff1e30
        }
        .opr-area {
            float: left;
            width: 150px;
            text-align: center;
            margin-left: -10px;
        }
        .opr-area .el-button {
            margin-top: 30px
        }
        .opr-area .el-button:nth-child(2) {
            margin-left: 0
        }
        .check-area {
            float: left;
            width: 191px;
            font-size: 12px;
            color: #999;
            border: 1px solid #dfdfdf;
            margin-right: 10px;
            border-radius: 5px;
        }
        .clearfix {
            clear: both;
            content: ''
        }
        .title {
            background: #eee;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-bottom: 1px solid #dfdfdf;
        }
        ul {
            line-height: 25px;
            height: 120px;
            overflow-y: auto;
            overflow-x: hidden
        }
        ul li {
            list-style: none;
            padding-left: 10px;
            cursor: pointer
        }
        ul li.selected {
            background: #409EFF;
            color: #fff
        }
        .time-area {
            float: left;
            width: 234px
        }
        .time-area span {
            color: #999;
            margin: 0 10px 0 -20px;
        }
        .select-area {
            width: 500px;
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 10px;
        }
        .select-area .el-checkbox {
            margin: 0 10px 0
        }
        .select-area .el-checkbox-group {
            font-size: 12px;
            line-height: 10px
        }
        .el-tabs__content {
            display: none
        }
        .level-area {
            width: 130px;
            height: 100px;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.33);
            border-radius: 5px;
            color: #999;
            display: inline-block;
            margin-right: 10px;
            .upper {
                text-align: center;
                /*font-size: 14px*/
            }
            .icon {
                font-size: 18px
            }
            .downer {
                padding: 0 10px;
                font-size: 12px;
                border-top: 1px solid #ddd
            }
        }
        .level-area.checked {
            background-color: #33b4ff;
            color: #fff;
            .downer {
                border-top: 1px solid #fff
            }
        }
        .el-radio-group {
            .el-radio {
                display: block;
                margin: 0 0 10px;
            }
            .small-inp.el-input{
                width: 100px;
            }
            .small-inp .el-input__inner{
                width:100px;
            }
            .lar-inp .el-input__inner{
                width:180px;
            }
        }
        .submit-btn{padding: 0 50px 20px 100px}
    }
</style>


