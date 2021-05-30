<script src="index.js"></script>
<template>
  <div class="index_main_banner">

    <!--搜索条 开始-->
    <div class="search_block sub_search">
      <div class="container">
        <div class="wfzs_logo"><a href="/mainsearch" class="indexIcon wfzs_logo-img"></a></div>
        <div class="searchContainer">
          <input id="subtitle" type="hidden" value="首页">
          <form action="" method="get" id="subform" onsubmit="$('#loading').show();return sub();">
            <input type="hidden" value="" name="searchType" id="searchType">
            <input type="hidden" value="" name="showType" id="showTypeTmp">
            <input type="hidden" value="" name="pageSize" id="pageSizeTmp">
<!--            <div class="resource_type clear">-->
<!--              <a href="javascript:void(0);" class="selected">全部</a>-->
<!--              <a href="javascript:void(0);">专利</a>-->
<!--              <a href="javascript:void(0);">期刊</a>-->
<!--              <a href="javascript:void(0);">学位</a>-->
<!--              <a href="javascript:void(0);">会议</a>-->

<!--                <input type="radio" name="test" v-for="(item,index) in list" :value="item.value" :checked="item.isCheck" @change="changeInput(index)">-->
<!--                <button @click="test">获取选中的值</button>-->

<!--              <a id="search_type_more"><span class="type_more">更多</span><span class="type_arrow">&gt;&gt;</span></a>-->
<!--            </div>-->

            <div class="search-radio" style="color: #fff;text-align: center;padding-bottom: 15px;padding-top:10px;font-size: 16px">

              <input type="radio" id="scholar" value="scholar" v-model="stype" >导师
<!--              <label for="scholar">metor</label>-->

              <input type="radio" id="patent" value="patent" v-model="stype" style="margin-left: 30px">专利
<!--              <label for="patent">patent</label>-->
              <br>
<!--              <span>{{stype}}</span>-->

            </div>
            <div class="searchBox">
              <div class="searchInput" style="padding-right: 100px;">
                <input v-model="title" meetname="keyWords" type="text" autocomplete="off" id="keyWords" name="searchWord" value="" style="height: 40px;line-height: normal; line-height: 40px\9;" placeholder="请输入关键字">
                <input meetname="isFirst" type="hidden" value="true">
                <input id="triggerTag" type="hidden" name="isTriggerTag">
              </div>

              <div class="searchBtn">
                <input type="button" value="检索" @click="onSubmit">
              </div>
            </div>

            <div class="searchInput_bomb" style="margin-top:10px;left:160px;">        <i class="triangle"></i>
              <div class="bomb_list"><a href="javascript:void(0);" onclick="search_aclick(this)"> 作者</a>
                <a href="javascript:void(0);" onclick="search_aclick(this)">题名</a>
                <a href="javascript:void(0);" onclick="search_aclick(this)"> 作者单位</a>
                <a href="javascript:void(0);" onclick="search_aclick(this)"> 关键词</a>
                <a href="javascript:void(0);" onclick="search_aclick(this)"> 摘要</a></div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--搜索条 结束-->
    <div class="bottom" v-if="stype==0">

      <div class="MyAchievement" style="margin-top: 80px">
        <div class="MyAchievement-echart">
          <div class="echart-title">数据概览
          </div>
          <div class="echart-content">
            <div class="left">
              <div id="myChart1" style="width:700px; height:440px"></div>

            </div>
            <div class="right">
              <div id="myChart2" style="width:700px; height:440px"></div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="bottom" v-if="stype=='scholar'">
      <el-table
          :data="tableData"
          border
          style="width: 1000px; margin: 80px auto"
          :header-cell-style="{textAlign:'center'}"
          :cell-style="{textAlign:'center'}">
        <el-table-column
            prop="id"
            label="id"
            width="80">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="130">
        </el-table-column>
        <el-table-column
            prop="orgID"
            label="学校"
            width="220">
        </el-table-column>
        <el-table-column
            prop="department"
            label="学院"
            width="160">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮件地址"
            width="150">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="100">
        </el-table-column>
        <el-table-column
            label="操作"
            width="80">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看<i class="el-icon-view el-icon--right"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: -20px">
        <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="pageNum"
            @prev-click="loadTable"
            @current-change="loadTable"
            @next-click="loadTable"
            :total=48889>
        </el-pagination>
      </el-row>
    </div>
    <div class="bottom" v-if="stype=='patent'">
      <el-table
          :data="tableData"
          border
          style="width: 1000px; margin: 80px auto"
          :header-cell-style="{textAlign:'center'}"
          :cell-style="{textAlign:'center'}">
        <el-table-column
            prop="id"
            label="id"
            width="80">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="130">
        </el-table-column>
        <el-table-column
            prop="orgID"
            label="学校"
            width="220">
        </el-table-column>
        <el-table-column
            prop="department"
            label="学院"
            width="160">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮件地址"
            width="150">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="100">
        </el-table-column>
        <el-table-column
            label="操作"
            width="80">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看<i class="el-icon-view el-icon--right"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: -20px">
        <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="pageNum"
            @prev-click="loadTable"
            @current-change="loadTable"
            @next-click="loadTable"
            :total=48889>
        </el-pagination>
      </el-row>
    </div>
  </div>

</template>
<style>

.index_main_banner {
  /*background: url("images/banner.jpg") center;*/
  background-size: cover;
  overflow: hidden;
}
button, input, select, textarea {
  margin: 0;
  font-family: inherit;
  font-size: 100%;
}
.search_block.sub_search {
  height: 130px;
  position: relative;
}
.search_block {
  background: none;
  padding: 5px 0 20px 0;
}
.search_block {
  height: 120px;
   background: url('images/index_bg.jpg') no-repeat center bottom;
}
.search_block .container {
  max-width: 1000px;
  margin: 0 auto;
  padding-right: 80px;
  padding-left: 10px;
  width: auto;
}
.index_main_banner .container {
  height: 410px;
  position: relative;
}
.container {
  max-width: 1200px;
  min-width: 480px;
  margin: 0 auto;
  *zoom: 1;
  padding: 0 48px 0 66px;
}
.wfzs_logo {
  float: left;
  left: 0;
  color: rgb(87, 29, 29);
  width: 160px;
  height: 61px;
  min-width: 150px;
  z-index: 9;
  position: relative;
  top: 57px;
  line-height: 72px;
}

.wfzs_logo-img {
  width: 138px;
  height: 32px;
  background-position: -90px -109px;
}
.indexIcon {
  /*background: url("images/banner.jpg") no-repeat center center;*/
  display: inline-block;
}

.searchContainer {
  float: none;
  padding-right: 80px;
  margin: 0;
}
.searchContainer {
  float: left;
  width: 100%;
  margin-left: -180px;
  position: relative;
}
form {
  display: block;
  margin-top: 0;
}

.clear {
  zoom: 1;
}

a:link {
  text-decoration: none;
}
a {
  background: transparent;
  color: #417dc9;
  cursor: pointer;
}

.search_block.sub_search .resource_type a {
  color: #d5e5fa;
  font-size: 16px;
  padding: 0 8px;
}
.resource_type a {
  color: #d5e5fa;
  font-size: 16px;
  padding: 0 8px;
  line-height: 60px;
  float: left;
  display: block;
}

.searchBox {
  margin: 0;
}
.searchBox {
  margin-left: 180px;
  position: relative;
  margin-right: 80px;
  overflow: hidden;
  height: 45px;
  background: #ffffff;
  border: 1px solid #ababab;
  /*-webkit-box-shadow: 0px 3px 5px 2px rgb(80 80 80 / 30%);*/
  -moz-box-shadow: 0px 3px 5px 2px rgba(80,80,80,.3);
  -o-box-shadow: 0px 3px 5px 2px rgba(80,80,80,.3);
  /*box-shadow: 0px 0px 5px 2px rgb(80 80 80 / 30%);*/
  z-index: 2;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.searchInput {
  height: 45px;
  padding-right: 200px;
}
.searchInput input {
  height: 41px;
  width: 100%;
  margin: 2px;
  padding: 0 0 0 10px;
  border: 0;
  font-size: 14px;
  outline: none;
}
button, input {
  line-height: normal;
}

.searchBtn {
  height: 45px;
  position: absolute;
  top: 0;
  right: 0;
  background: -ms-linear-gradient(top, #2453ad, #183c82);
  background: -webkit-linear-gradient(top, #2453ad, #183c82);
  background: -moz-linear-gradient(top, #2453ad, #183c82);
  background: -webkit-gradient(linear, 0 0, 0 bottom, from(#2453ad), to(#183c82));
  background: -o-linear-gradient(top, #2453ad, #183c82);
}
button, html input[type="button"], input[type="reset"], input[type="submit"] {
  cursor: pointer;
  -webkit-appearance: button;
}
.searchBtn input {
  font-size: 14px;
  font-weight: normal;
  height: 45px;
  width: 90px;
  /* background: transparent url(/images/fdj.png) no-repeat 9px 12px; */
  line-height: 45px;
  color: #100f0f;
  border: 0;
  padding-left: 10px;
}

.searchInput_bomb {
  padding: 10px 15px;
  position: absolute;
  top: 107px;
  z-index: 200;
  background: #fff;
  border: 1px solid #dfdfdf;
  display: none;
  left: 200px;
}
.triangle {
  /* background: url(../images/sanjiao.png) no-repeat; */
  width: 19px;
  height: 11px;
  position: absolute;
  top: -10px;
  left: 25px;
}

.bomb_list {
  background: #fff;
  line-height: 30px;
  text-align: left;
}
.bomb_list a {
  display: block;
  width: 110px;
}

.bomb_list {
  background: #fff;
  line-height: 30px;
  text-align: left;
}

.bottom{
  width: 100%;
  height: 700px;
}

.MyAchievement{
  display: flex;
  flex-direction: column;
  padding:0px 90px;
}
.MyAchievement .MyAchievement-echart{
  width: 100%;
  height: 570px;
  border-radius: 10px;
  border:1px solid #d3d9e9;
  box-shadow: 4px 6px 10px -2px #d3d9e9;
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
}
.MyAchievement-echart .echart-title{
  width: 100%;
  height: 70px;
  /* background-color: #5398f3; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 26px;
  color: rgb(235, 236, 241);
  text-align: center;
  line-height: 75px;
}
.MyAchievement-echart .echart-content{
  width: 100%;
  height: 500px;
  /*display: center;*/
  /*align-items: right;*/
  justify-content: center;
}
.MyAchievement-echart .echart-content .left{
  width: 48%;
  height: 480px;
  float:left;
  border:1px solid #d3d9e9;
  Margin:10px
}
.MyAchievement-echart .echart-content .right{
  width: 48%;
  height: 480px;
  float:right;
  border:1px solid #d3d9e9;
  Margin:10px
}
.echart-content #myChart1, #myChart2 {
  margin-top: 35px;
}

</style>


<script>

let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
export default {

  data() {
    return {
      myChart1:null,
      stype:'0'
    };
  },
  methods: {
    onSubmit: function () {
      console.log('点集搜索：'+this.title)
      const searchTitle = this.title;
      this.searchByTitle(searchTitle)
    },
    searchType (title) {

      this.$router.push({path:"search/" + rowData.id})
      this.title = this.$route.params && this.$route.params.id;
      console.log('获取到的id='+ this.id)
      axios.get("http://159.75.27.46:7086/" + type + '/EN/' + this.title).then(res => {
        this.mentorDetail = res.data;
        // console.log('返回的'+this.mentorDetail.name)
      });
    },
    searchByTitle(title) {
      this.title = title;
      this.url=(this.stype==='scholar')?'http://159.75.27.46:7086/scholar/findByCondition?name='+this.title: 'http://159.75.27.46:7086/patent/EN/findbyinventor?inventor='+this.title
      axios.get(this.url).then(res => {
        this.tableData = res.data;
        console.log(this.tableData)
      });
    },
    patentSearch () {

    },
    initChart() {
      //基于准备好的dom，初始化echarts实例
      this.myChart1 = echarts.init(document.getElementById('myChart1'));

// 绘制图表
      this.myChart1.setOption({
        title: {
          text: '发文数量'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['导师人数', '专利数', '论文数', '待定', '待定', '待定']
        },
        yAxis: { type: 'value' },
        series: [{
          name: '销量',
          type: 'bar',
          data: [12389, 154220, 0, 0, 0, 0]
        }]
      });

    }
  },
  mounted() {
    this.initChart();
  },

};

</script>