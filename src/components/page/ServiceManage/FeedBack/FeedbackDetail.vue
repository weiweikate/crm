<template>
    <div>
        <v-breadcrumb :nav="['服务管理','问题反馈','问题详情']"></v-breadcrumb>
        <div class="container">
            <div class="feed-area" v-loading="loading">
                <div class="detail-area">
                    <div class="detail-item">
                        反馈人：{{detail.nickname}}
                    </div>
                    <div class="detail-item">
                        联系电话：{{detail.phone}}
                    </div>
                    <div class="detail-item">
                        用户层级：{{detail.remark}}
                    </div>
                    <div class="detail-item">
                        所在区域：{{detail.address}}
                    </div>
                    <div class="detail-item">
                        反馈问题类型：
                        <el-select placeholder="请选择" v-model="detail.type_key">
                            <el-option label="账户问题" value="1"></el-option>
                            <el-option label="营销问题" value="2"></el-option>
                            <el-option label="购买流程" value="3"></el-option>
                            <el-option label="推广机制" value="4"></el-option>
                        </el-select>
                    </div>
                    <div class="detail-title">问题描述：</div>
                    <div>
                        <el-input type="textarea" disabled v-model="detail.content"></el-input>
                    </div>
                    <div class="detail-title">图片：</div>
                    <div>
                        <img :src="detail.original_img?detail.original_img:'/src/assets/images/logo.png'" alt="">
                    </div>
                    <div class="detail-title">回复：</div>
                    <div>
                        <el-input type="textarea" v-model="detail.reply_content"></el-input>
                    </div>
                    <div class="detail-item">
                        处理人：{{username}}
                    </div>
                    <div style="margin-top: 30px" v-if="detail.status==1">
                        <el-button type="primary" v-if="p.updateFeedback" v-loading="btnLoading" @click="update">确认回复</el-button>
                        <el-button type="success" v-if="p.updateFeedback" v-loading="btnLoading" @click="update">修改问题类型</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </div>
                <div v-for="(item,index) in list">
                    <div class="feed-item" @click="expandItem(item)">
                        <div class="item" style="width: 15%">反馈人：{{item.nickname}}</div>
                        <div class="item" style="width: 18%">反馈问题类型：
                        <template>
                            <template v-if="item.type_key == 1">账户问题</template>
                            <template v-if="item.type_key == 2">营销问题</template>
                            <template v-if="item.type_key == 3">购买流程</template>
                            <template v-if="item.type_key == 4">推广机制</template>
                        </template>
                        </div>
                        <div class="item" style="width: 20%">反馈时间：{{item.create_time|formatDate}}</div>
                        <div class="item" style="width: 10%">状态：
                            <template>
                                <template v-if="item.status == 1">待处理</template>
                                <template v-if="item.status == 2">已处理</template>
                            </template>
                        </div>
                        <div class="item" style="width: 20%">处理时间：{{item.reply_time|formatDate}}</div>
                        <div class="item" style="width: 10%">处理人员：{{item.adminName}}</div>
                        <div class="item" style="width: 4%"><i :class="item.checked?'el-icon-caret-bottom':'el-icon-caret-top'"></i></div>
                    </div>
                    <!--<div class="detail-area" v-show="item.checked">-->
                        <!--<div class="detail-item">-->
                            <!--反馈人：{{item.nickname}}-->
                        <!--</div>-->
                        <!--<div class="detail-item">-->
                            <!--联系电话：{{item.phone}}-->
                        <!--</div>-->
                        <!--<div class="detail-item">-->
                            <!--用户层级：{{item.name}}-->
                        <!--</div>-->
                        <!--<div class="detail-item">-->
                            <!--所在区域：{{item.address}}-->
                        <!--</div>-->
                        <!--<div class="detail-item">-->
                            <!--反馈问题类型：-->
                            <!--<el-select placeholder="请选择" v-model="item.type_key">-->
                                <!--<el-option label="账户问题" value="1"></el-option>-->
                                <!--<el-option label="营销问题" value="2"></el-option>-->
                                <!--<el-option label="购买流程" value="3"></el-option>-->
                                <!--<el-option label="推广机制" value="4"></el-option>-->
                            <!--</el-select>-->
                        <!--</div>-->
                        <!--<div class="detail-title">问题描述：</div>-->
                        <!--<div>-->
                            <!--<el-input type="textarea" disabled v-model="item.content"></el-input>-->
                        <!--</div>-->
                        <!--<div class="detail-title">图片：</div>-->
                        <!--<div>-->
                            <!--<img :src="item.original_img?item.original_img:'/src/assets/images/logo.png'" alt="">-->
                        <!--</div>-->
                        <!--<div class="detail-title">回复：</div>-->
                        <!--<div>-->
                            <!--<el-input type="textarea" v-model="item.reply_content"></el-input>-->
                        <!--</div>-->
                        <!--<div class="detail-item">-->
                            <!--处理人：{{item.adminName}}-->
                        <!--</div>-->
                        <!--&lt;!&ndash;<div style="margin-top: 30px">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button type="primary" v-loading="btnLoading" @click="update">确认回复</el-button>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button type="success" v-loading="btnLoading" @click="update">修改问题类型</el-button>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button>取消</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import icon from '../../../common/ico.vue';
    import * as api from '../../../../api/api';
    import moment from 'moment'
    import utils from '../../../../utils/index.js'
    import * as pApi from '../../../../privilegeList/index.js';

    export default {
        components: {
            vBreadcrumb, icon
        },
        data() {
            return {
                // 权限控制
                p:{
                    updateFeedback:false,
                },

                list: [],
                detail:{},
                id:'',
                loading:false,
                btnLoading:false,
                username:'',
                userId:'',
                item:{
                    type_key:'1'
                },
                typeKey:'',
                replyContent:'',
            }
        },
        activated(){
            this.id =
                this.$route.query.id ||
                JSON.parse(sessionStorage.getItem("feedDetail").id);
            this.getDetail();
            this.username = localStorage.getItem("ms_username");
            this.userId = localStorage.getItem("ms_userID");
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
            },
            //获取详情
            getDetail(){
              let that=this;
              let data={
                  id:that.id,
                  url:pApi.feedbackDetail
              };
              that.loading=true;
              that.$axios
                  .post(api.feedbackDetail,data)
                  .then(res=>{
                      if(res.data.code==200){
                          let detailInf=res.data.data.detail_record;
                          // that.detail=Object.assign(detailInf[0]);
                          let temp=detailInf[0];
                          temp.checked=true;
                          temp.type_key=temp.type_key.toString();
                          that.detail=Object.assign(temp);
                          for(let i in res.data.data.history_record){
                              let item=res.data.data.history_record[i];
                              item.type_key=item.type_key.toString();
                              item.checked=false;
                          }
                          that.list=res.data.data.history_record;
                          that.loading=false;
                      }else{
                          that.loading=false;
                          that.$message.warning(res.data.msg);
                      }
                  })
                  .catch(err=>{
                      that.loading=false
                  })
            },
            //展开
            expandItem(item) {
                // this.list[index].checked = !this.list[index].checked
                // let id=item.id;
                this.id=item.id;
                this.getDetail()
            },
            //取消
            cancel(){
                this.$router.push('/feedBack')
            },
            //修改
            update(){
                let that=this;
                let params={
                    id:that.id,
                    typeKey:that.item.type_key,
                    replyContent:that.detail.reply_content,
                    url:pApi.updateFeedback
                };
                that.btnLoading=true;
                that.$axios
                    .post(api.updateFeedback,params)
                    .then(res=>{
                        if(res.data.code==200){
                            that.btnLoading=false;
                            that.$message.success(res.data.msg);
                            setTimeout(function () {
                                that.$router.push('/feedBack')
                            },1000)
                        }else{
                            that.btnLoading = false;
                            that.$message.warning(res.data.msg);
                        }
                    })
                    .catch(err=>{
                        that.btnLoading=false
                    })
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