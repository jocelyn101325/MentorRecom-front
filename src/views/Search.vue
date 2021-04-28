<template>
  <div>
<!--    header-->
<!--    <div class="header">-->
<!--      <div class="logo">-->
<!--        <a><img src="images/top-bg.jpg" width="300" height="40"></a>-->
<!--      </div>-->
<!--    </div>-->

    <div class="nav">
      <div class="container">
        <!--include_edit-->
        <div class="nav-lf">
          <p>导师快速分类查询</p>
          <ul>
            <li><a href="">金融学</a></li>
            <li><a href="">计算机</a></li>
            <li><a href="">英语语言文学</a></li>
            <li><a href="">法学</a></li>
          </ul>
        </div>
        <div class="nav-rt">
          <form class="" id="form_name" name="form_name" action="">
            <select class="select" name="search_type" >
              <option selected value ="1">所在学校</option>
              <option  value ="2">招生专业</option>
              <option  value ="3">研究领域</option>
              <option  value ="4">导师姓名</option>
            </select>
            <div class="search">
              <input type="text" name="keyword" placeholder="请输入关键字">
              <button type="button" id="form_submit" name="button">
                <i class="iconfont icon-sousuo"></i>
                <span>搜索</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <el-table
        :data="tableData"
        border
        style="width: 882px; margin: 80px auto"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center'}">
      <el-table-column
          prop="name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orgID"
          label="学校"
          width="130">
      </el-table-column>
      <el-table-column
          prop="department"
          label="学院"
          width="130">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮件地址"
          width="300">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          width="120">
      </el-table-column>
      <el-table-column
          label="操作"
          width="80">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
<!--          <el-button type="text" size="small">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size="15"
        :total="1000"
        @current-change="page"
      style="text-align: center">
    </el-pagination>
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
  methods: {
    handleClick(row) {
      console.log(row);
    },
    page(currentPage){
      // alert(currentPage)
    }
  },
  created() {
    const _this = this;
    axios.get('http://localhost:8011/').then(function (resp){
      _this.tableData = resp.data;
      _this.total = resp.data.length;
      // console.log(resp.data.length);
    })
  },
  data() {
    return {
      total:null,
      tableData: null,
      currentPage:1,
      pagesize:10
    }
  }
}
</script>