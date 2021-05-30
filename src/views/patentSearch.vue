<script src="index.js"></script>

<template>
  <div>
    <div class="container" style="padding-top: 5px">

      <div style="margin: 15px auto;width: 600px;height: 45px;">
        <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select" @input="update($event)">
          <el-select v-model="select" slot="prepend" placeholder="请选择国家">
            <el-option label="中国" value="1"></el-option>
            <el-option label="美国" value="2"></el-option>
            <el-option label="巴西" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
        </el-input>
      </div>
    </div>
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
          prop="patentType"
          label="专利类型"
          width="130">
      </el-table-column>
      <el-table-column
          prop="patentName"
          label="专利名称"
          width="220">
      </el-table-column>
      <el-table-column
          prop="patentCode"
          label="专利代码"
          width="160">
      </el-table-column>
      <el-table-column
          prop="inventor"
          label="发明人"
          width="300">
      </el-table-column>
      <el-table-column
          prop="publicationDate"
          label="公开日期"
          width="100">
      </el-table-column>
<!--      <el-table-column-->
<!--          label="操作"-->
<!--          width="80">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看<i class="el-icon-view el-icon&#45;&#45;right"></i></el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
</template>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6 {
  font-weight: normal;
}
i,em {
  font-style: normal;
}
input,select {
  vertical-align: middle;
}
.el-select {
  width: 130px;
}
.input-with-select {
  width: 250px;
  background-color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  /*color: #eff;*/
}
a img {
  border: 0 none;
}
a,input,textarea {
  outline: none;
}
input:focus,select:focus,textarea:focus {
  color: #666 !important;
}
.tl li {
  white-space: nowrap;
  overflow: hidden;
}
body {
  /*font-family: "microsoft yahei";*/
  color: #333;
  font-size: 14px!important;
}

.container {
  width: 1000px;
  margin: 0 auto;
}
/* header */
.header {
  width: 1000px;
  height: 65px;
  margin: 0 auto;
  line-height: 3;
  padding-top: 10px;
}
.header .logo {
  display: inline-block;
}
/* nav */
.nav {
  width: 100%;
  height: 70px;
  background: #0066cb;
}
.nav .nav-lf {
  width: 460px;
  height: 70px;
  display: inline-block;
  line-height: 1.7;
  padding: 10px 5px;
}
.nav .nav-lf p {
  width: 65px;
  color: #fff;
  float: left;
  margin-right: 35px;
  display: inline-block;
}
.nav .nav-lf ul {
  display: block;
  height: 70px;
  padding: 13px 0;
  cursor: default;
}
.nav .nav-lf ul li {
  width: auto;
  height: 20px;
  display: inline-block;
  background: #2482dc;
  padding: 0 10px 3px;
  box-sizing: content-box;
  border-radius: 3px;
  cursor: pointer;
  transition: background .3s;
}
.nav .nav-lf ul li:hover {
  background: #2482ff;
}
.nav .nav-lf ul li + li {
  margin-left: 5px;
}
.nav .nav-rt {
  display: inline-block;
  margin-left: 50%;
  transform: translate(-50%, 50%);
}
.nav .nav-rt .select {
  width: 110px;
  height: 30px;
  border: none;
  float: left;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 20px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /*background: #fff url('../images/down.png') no-repeat 90px 10px;*/
  background-size: 13px 13px;
}
.nav .nav-rt .search {
  display: inline-block;
  width: 410px;
  height: 30px;
  margin-left: 10px;
}
.nav .nav-rt .search input {
  width: 345px;
  height: 30px;
  float: left;
  border: none;
  padding-left: 10px;
}
.nav .nav-rt .search button {
  width: 65px;
  height: 30px;
  color: #fff;
  background: #1e80e3;
  border: none;
  cursor: pointer;
  transition: background .1s;
}
.nav .nav-rt .search button span {
  display: inline-block;
  font-size: 15px;
}
.nav .nav-rt .search button:hover {
  background: #2482ff;
}
</style>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      total:null,
      currentPage:1,
      searchName:'',
      searchId:'',
      select: '',
      //总数据
      tableData:[],
      //默认显示第几页
      page: 1,
      //总条数
      totalCount: 1000,
      //默认每页显示条数
      // PageSize: 10,
    }
  },
  methods: {
    update(e) {
      this.$forceUpdate()	// 刷新
      console.log('input内容：'+e)
    },
    onSubmit: function () {
      console.log('点集搜索：'+this.searchName)
      const searchName = this.searchName;
      this.searchByName(searchName)
    },
    loadTable(num) {
      this.pageNum = num;
      axios.get("http://159.75.27.46:7086/patent/EN/findByPage?pageNo=" + this.pageNum).then(res => {
        this.tableData = res.data.content;
      });
    },
    // 表格人名搜索
    searchByName(mentorName) {
      this.name = mentorName;
      axios.get("http://159.75.27.46:7086/patent/EN/findbyinventor?inventor=" + this.name).then(res => {
        this.tableData = res.data;
        console.log(this.tableData)
      });
    },
    handleClick(rowData){
      // 获取id
      console.log('点击查看获取id：'+ rowData.id)
      // let id = rowData.id
      this.$router.push({path:"personInfomation/" + rowData.id});
      // this.$router.push({name:'personInfomation',params:{mentorId: id}});

    }
  //  ======
  },
  created() {
    this.loadTable(this.pageNum);
  },
  computed() {
    // let search = this.search
    // console.log(search)
  }

}
</script>