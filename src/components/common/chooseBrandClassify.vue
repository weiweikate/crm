<template>
    <div>
        <div class="check-area">
            <div class="title">选择品牌</div>
            <div>
                <ul>
                    <li v-for="(item,index) in brandList" v-if="!item.allChecked"
                        @click="chooseBrand(item,index)"
                        :class="item.checked?'selected':''">{{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="check-area">
            <div class="title">选择品类</div>
            <div>
                <ul>
                    <li v-for="(item,index) in brandList[brandIndex].classifyList"
                        @click="chooseClassify(item,index)"
                        v-if="!item.hasChecked" :class="item.checked?'selected':''">{{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="opr-area">
            <el-button type="primary" @click="addBrandClassify">添加品类</el-button>
            <el-button @click="delBrandClassify">删除品类</el-button>
        </div>
        <div class="check-area">
            <div class="title">已选择品牌-品类</div>
            <div>
                <ul>
                    <li v-for="(item,index) in chooseList" @click="delItem(item,index)"
                        :class="item.checked?'selected':''">{{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import icon from "./ico";
    export default {
        props: {
            id: {
                require: true
            },
            url: {
                require: true
            }
        },
        components: {
            icon
        },
        data() {
            return {
                brandList: [{
                    name: 'A',
                    checked: false,
                    allChecked: false,
                    id: 0,
                    classifyList: []
                }, {
                    name: 'B',
                    checked: false,
                    allChecked: false,
                    id: 1,
                    classifyList: [{
                        hasChecked: false
                    }]
                }],
                classifyListA: [{
                    name: 'AA',
                    id: 0,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'AB',
                    id: 1,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'AC',
                    id: 2,
                    checked: false,
                    hasChecked: false
                }],
                classifyListB: [{
                    name: 'BA',
                    id: 3,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'BB',
                    id: 4,
                    checked: false,
                    hasChecked: false
                }, {
                    name: 'BC',
                    id: 5,
                    checked: false,
                    hasChecked: false
                }],
                tempChooseList:[],
                chooseList: [],
                brandName: '',
                classifyName: [],
                brandIndex: 0,
                brandId: '',
                classifyId: [],
                delBrandId: '',
                delClassifyId:[]
            };
        },
        created(){
            //获取品牌列表并默认加载第一个品牌对于的品类列表
            this.brandList[0].classifyList = this.classifyListA;
            this.brandName = this.brandList[0].name;
            this.brandId = this.brandList[0].id;
        },
        methods: {

            //获取品牌下品类列表
            getClassifyList() {
                this.brandList[1].classifyList = this.classifyListB;
            },
            //选择品牌
            chooseBrand(item, index) {
                let that = this;
                that.brandName = that.brandList[index].name;
                that.brandIndex = index;
                that.brandId = item.id;
                that.getClassifyList();
                for (let i in that.brandList) {
                    if (i == index) {
                        that.brandList[i].checked = true;
                    } else {
                        that.brandList[i].checked = false;
                    }
                }
            },
            //选择品类
            chooseClassify(item, index) {
                let that = this;
                that.brandList[that.brandIndex].classifyList[index].checked = !that.brandList[that.brandIndex].classifyList[index].checked//添加样式
                let id=item.id;
                let name=that.brandList[that.brandIndex].classifyList[index].name;
                if (that.brandList[that.brandIndex].classifyList[index].checked) {
                    that.classifyId.push(id);
                    that.classifyName.push(name);
                    that.tempChooseList.push({
                        brandId:that.brandList[that.brandIndex].id,
                        brandName:that.brandList[that.brandIndex].name
                    })
                }else{
                    for(let i in that.classifyId){
                        if(id==that.classifyId[i]){
                            that.classifyId.splice(i,1);
                            that.classifyName.splice(i,1);
                            that.tempChooseList.splice(i,1);
                        }
                    }
                }
            },
            //添加品类
            addBrandClassify() {
                let that = this;
                that.chooseList=[];
                for (let i in that.tempChooseList) {
                    let param = {
                        brandId: that.tempChooseList[i].brandId,
                        classifyId: that.classifyId[i],
                        name: that.tempChooseList[i].brandName + '-' + that.classifyName[i],
                        checked: false
                    };
                    that.chooseList.push(param);
                    that.changeClassifyList(that.tempChooseList[i].brandId, that.classifyId[i],'add');
                    that.brandIsAllCheck();
                }
            },
            //选中已选择的品类
            delItem(item, index) {
                let that = this;
                that.chooseList[index].checked = !that.chooseList[index].checked;
                if(that.chooseList[index].checked){
                    if(that.delClassifyId.indexOf(item.classifyId)==-1){
                        that.delBrandId=item.brandId;
                        that.delClassifyId.push(item.classifyId);
                    }
                }else {
                    for(let i in that.delClassifyId){
                        if(item.classifyId==that.delClassifyId[i]){
                            that.delClassifyId.splice(i,1);
                        }
                    }
                }
            },
            //删除品类
            delBrandClassify() {
                let that=this;
                for(let i in that.delClassifyId){
                    for(let j in that.chooseList){
                        if(that.delClassifyId[i]==that.chooseList[j].classifyId&&that.chooseList[j].checked){
                            that.changeClassifyList(that.chooseList[j].brandId, that.delClassifyId[i],'del');
                            that.brandIsAllCheck();
                            that.chooseList.splice(j,1);
                            that.tempChooseList.splice(j,1);
                            that.classifyId.splice(j,1);
                            that.classifyName.splice(j,1);
                        }
                    }
                }
            },
            // 判断品牌是否已被全选
            brandIsAllCheck() {
                let that = this;
                for (let i in that.brandList) {
                    let num = 0;
                    for (let j in that.brandList[i].classifyList) {
                        if (that.brandList[i].classifyList[j].hasChecked) {
                            num++;
                        }
                        if (num == that.brandList[i].classifyList.length) {
                            that.brandList[i].allChecked = true
                        } else {
                            that.brandList[i].allChecked = false
                        }
                    }
                }
            },
            //改变品类容器节点
            changeClassifyList(brandId, classifyId,addOrDel) {
                let that = this;
                for (let i in that.brandList) {
                    if (that.brandList[i].id == brandId) {
                        for (let j in that.brandList[i].classifyList) {
                            if (that.brandList[i].classifyList[j].id == classifyId && ((!that.brandList[i].classifyList[j].hasChecked&&addOrDel=='add')||(that.brandList[i].classifyList[j].hasChecked&&addOrDel=='del'))) {
                                that.brandList[i].classifyList[j].hasChecked = !that.brandList[i].classifyList[j].hasChecked;
                                that.brandList[i].classifyList[j].checked = false
                            }
                        }
                    }
                }
            }
        }
    };
</script>
<style lang="less" scoped>
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
</style>


