<template>
    <div>
        <v-breadcrumb :nav="['服务管理','问题反馈','问题详情']"></v-breadcrumb>
        <div class="container">
            <div class="feed-area">
                <div v-for="(item,index) in list">
                    <div class="feed-item" @click="expandItem(index)">
                        <div class="item" style="width: 15%">反馈人：343434</div>
                        <div class="item" style="width: 18%">反馈问题类型：营销手段</div>
                        <div class="item" style="width: 20%">反馈时间：234234-324-23-4</div>
                        <div class="item" style="width: 10%">状态：已处理</div>
                        <div class="item" style="width: 20%">处理时间：234234-324-23-4</div>
                        <div class="item" style="width: 10%">处理人员：张三</div>
                        <div class="item" style="width: 4%"><i :class="item.checked?'el-icon-caret-bottom':'el-icon-caret-top'"></i></div>
                    </div>
                    <div class="detail-area" v-show="item.checked">
                        <div class="detail-item">
                            反馈人：532432
                        </div>
                        <div class="detail-item">
                            联系电话：532432
                        </div>
                        <div class="detail-item">
                            用户层级：532432
                        </div>
                        <div class="detail-item">
                            所在区域：532432
                        </div>
                        <div class="detail-item">
                            反馈问题类型：
                            <el-select placeholder="请选择">
                                <el-option label="账户问题" value="0"></el-option>
                                <el-option label="营销问题" value="1"></el-option>
                                <el-option label="购买流程" value="2"></el-option>
                                <el-option label="推广机制" value="3"></el-option>
                            </el-select>
                        </div>
                        <div class="detail-title" :disabled="true">问题描述：</div>
                        <div>
                            <el-input type="textarea"></el-input>
                        </div>
                        <div class="detail-title">图片：</div>
                        <div>
                            <img src="../../../../assets/images/logo.png" alt="">
                        </div>
                        <div class="detail-title">回复：</div>
                        <div>
                            <el-input type="textarea"></el-input>
                        </div>
                        <div class="detail-item">
                            处理人：532432
                        </div>
                        <div style="margin-top: 30px">
                            <el-button type="primary">确认回复</el-button>
                            <el-button type="success">修改问题类型</el-button>
                            <el-button>取消</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import icon from '../../../common/ico.vue';
    import * as api from '../../../../api/api';

    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                list: [
                    {
                        checked: false
                    },
                    {
                        checked: false
                    },
                ]
            }
        },
        methods: {
            expandItem(index) {
                this.list[index].checked = !this.list[index].checked
            }
        }
    }
</script>

<style lang="less">
    .feed-area {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 5px;
        border: 2px solid #e8edf0;
        font-size: 14px;
    }

    .detail-area {
        /*height: 742px;*/
        /*border-radius: 10px;*/
        /*border: solid 1px #dddddd;*/
        padding: 10px 50px 40px;
        margin: 0 10px;
        color: #666;
        font-size: 14px;
        line-height: 30px;
        .detail-title {
            color: #000;
            font-size: 16px;
        }
        img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
            border: solid 2px #cacaca;
        }
        .el-textarea {
            width: 440px;
            height: 110px;
            .el-textarea__inner {
                width: 100%;
                height: 110px;
                min-height: 110px !important;
                max-height: 110px;
                resize: none
            }
        }

    }

    .feed-item {
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #666;
        cursor: pointer;
        background: #f7f7f7;
        .item {
            display: inline-block;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>