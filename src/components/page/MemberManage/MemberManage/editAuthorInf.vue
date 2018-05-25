<template>
    <div class="edit-author-mask">
        <div class="box">
            <div class="mask-title">授权信息编辑</div>
            <div class="mask-content">
                <el-form :model="form">
                    <el-form-item label="授权码:" class="special">
                        {{}}
                    </el-form-item>
                    <el-form-item label="授权层级" class="special">
                        <el-select v-model="form.level" placeholder="修改授权层级">
                            <el-option label="明星CEO" value="0"></el-option>
                            <el-option label="荣誉总监" value="1"></el-option>
                            <el-option label="省级总代" value="2"></el-option>
                            <el-option label="实习代理" value="3"></el-option>
                            <el-option label="体验VIP" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授权品牌">
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
                    <el-form-item label="授权渠道">
                        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                        </el-tabs>
                       <div class="select-area" style="margin-top: -5px">
                           <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
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
                    <el-form-item label="上级代理:" class="special">
                        <el-input v-model="form.name" @blur="sureUpdate" size="medium"></el-input>
                        <span class="tip">请输入上级代理</span>
                    </el-form-item>

                </el-form>
            </div>
            <div class="submit-btn">
                <div style="margin-left: -73px;width: 100%">
                    <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                    <el-button @click="closeToask">取消</el-button>
                </div>
            </div>
        </div>
        <div class="sure-mask" v-if="isUpdateUperMask">
            <div class="smallbox">
                <div class="mask-title"><icon class="ico" ico='icon-jinggao'/>  温馨提示</div>
                <div class="mask-content">
                    <span class="del-tip">是否确认修改TA的上级代理</span>
                    <div class="del-btn-group">
                        <el-button @click="closeUpdateUperMask(true)" class="del-btn" type="danger">确认修改</el-button>
                        <el-button @click="closeUpdateUperMask">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import icon from "../../../common/ico";
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        components: {
            icon
        },
        data() {
            return {
                form: {
                    name: "",
                    isUse: "1",
                    imageUrl: '',
                    brandKey: ''
                },
             activeName2: 'first',
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,
                isUpdateUperMask:false
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
            sureUpdate(){
              this.isUpdateUperMask=true
            },
            closeUpdateUperMask(){
                this.isUpdateUperMask=false
            }
        }
    };
</script>
<style lang="less">
    .sure-mask {
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
        .smallbox {
            position: relative;
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
                text-align: center;
                line-height: 56px;
                color: #ff6868;
                font-weight: 700;
                .ico {
                    position: absolute;
                    top: 16px;
                    left: 228px;
                    color: red;
                    font-size: 20px;
                }
            }
            .mask-content {
                position: relative;
                width: 100%;
                height: 248px;
                overflow: hidden;
                padding: 30px 45px 0 45px;
                box-sizing: border-box;
                .del-tip {
                    position: absolute;
                    top: 30%;
                    left: 49%;
                    transform: translateX(-49%);
                    font-size: 22px;
                }
                .del-btn-group {
                    width: 180px;
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 15%;
                    .del-btn {
                        background-color: #ff6868;
                    }
                }
            }
        }
    }
    .edit-author-mask {
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
            width: 857px;
            height: 700px;
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
                height: 570px;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 10px 45px 0 45px;
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
        .submit-btn {
            width: 100%;
            height: 70px;
            line-height: 70px;
            margin-right: 50px;
            text-align: right;
            border-top:1px solid #dfdfdf;
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
            width: 30%
        }
        .time-area span {
            color: #999;
            margin: 0 10px 0 -20px;
        }
        .select-area{
            width: 500px;
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 10px;
        }
        .select-area .el-checkbox{margin: 0 10px 0}
        .select-area .el-checkbox-group{font-size: 12px;line-height: 10px}
        .el-tabs__content{display: none}
    }
</style>


