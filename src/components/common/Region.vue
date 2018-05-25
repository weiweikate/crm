<template>
    <div>
        <el-select v-model="province" filterable placeholder="请选择省份" @change="getCity(false)" :loading="pLoading">
            <el-option v-for="item in provinceArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="city" filterable placeholder="请选择城市" @change="getArea(false)" :loading="cLoading">
            <el-option v-for="item in cityArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="area" filterable placeholder="请选择区" @change="getAllRegion" :loading="aLoading">
            <el-option v-for="item in areaArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>
<script>
import * as api from "../../api/api.js";
export default {
  props: ["regionMsg"],
  data() {
    return {
      pLoading: false,
      cLoading: false,
      aLoading: false,
      province: "",
      city: "",
      area: "",
      provinceArr: [],
      cityArr: [],
      areaArr: [],
      region: []
    };
  },
  watch:{
      regionMsg(params){
        if(params.length == 0){
            this.province = '';
            this.city = '';
            this.area = '';
        }else{
            this.province = this.regionMsg[0];
            this.getCity(true);
        }
      }
  },
  created() {
      this.getProvinceList();
    // if(this.regionMsg != undefined && this.regionMsg.length != 0){
    //     this.province = this.regionMsg[0];
    //     this.getCity(true);
    //     console.log(this.regionMsg+'====='+this.city);
    // }
  },
  methods: {
    //   获取省份列表
    getProvinceList() {
      this.pLoading = true;
      this.$axios
        .post(api.getProvinced, {})
        .then(res => {
          this.provinceArr = [];
          res.data.data.forEach((v, k) => {
            this.provinceArr.push({ label: v.name, value: v.zipcode });
            this.pLoading = false;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取城市列表
    getCity(val) {
      this.cLoading = true;
      this.$axios
        .post(api.getCity, { fatherZipcode: this.province })
        .then(res => {
          if (res.data.data.length != 0 && val == false) {
            this.city = res.data.data[0].zipcode;
          }else if(val == true){
              this.city = this.regionMsg[1];
          } else {
            this.city = "";
          }
          this.cityArr = [];
          res.data.data.forEach((v, k) => {
            this.cityArr.push({ label: v.name, value: v.zipcode });
            this.cLoading = false;
          });
          if(val == true){
              this.getArea(true);
              return;
          }
          this.getArea(false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取区
    getArea(val) {
      this.aLoading = true;
      let data = {};
      if (this.city == "") {
        data.fatherZipcode = this.province;
      } else {
        data.fatherZipcode = this.city;
      }
      this.$axios
        .post(api.getArea, data)
        .then(res => {
          if (res.data.data.length != 0 && val == false) {
            this.area = res.data.data[0].zipcode;
          }else if(val == true){
            this.area = this.regionMsg[2];
          } else {
            this.area = "";
          }
          this.areaArr = [];
          res.data.data.forEach((v, k) => {
            this.areaArr.push({ label: v.name, value: v.zipcode });
            this.aLoading = false;
          });
          this.region = [];
          this.region.push(this.province);
          this.region.push(this.city);
          this.region.push(this.area);
          this.$emit("regionMsg", this.region);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取省市区
    getAllRegion() {
      this.region = [];
      this.region.push(this.province);
      this.region.push(this.city);
      this.region.push(this.area);
      this.$emit("regionMsg", this.region);
    }
  }
};
</script>
<style lang="less" scoped>
</style>


