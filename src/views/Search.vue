<script src="index.js"></script>

<template>
  <div>
    <div class="container" style="padding-top: 5px">

      <div style="margin: 15px auto;width: 600px;height: 45px;">
        <el-input placeholder="请输入姓名" v-model="searchName" class="input-with-select" @input="update($event)" style="width: 280px;">
        </el-input>
        <el-input placeholder="请输入研究领域" v-model="searchSex" class="input-with-select" @input="update($event)" style="width: 280px;margin-left: 20px">
<!--          <el-select v-model="select" slot="prepend" placeholder="请选择" ref="selection">-->
<!--            <el-option label="导师姓名" value="1"></el-option>-->
<!--            <el-option label="导师性别" value="2"></el-option>-->
<!--            <el-option label="所在院校" value="3"></el-option>-->
<!--          </el-select>-->
          <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
        </el-input>
      </div>
    </div>

    <el-table
        :data="tableData"
        border
        style="width: 1200px; margin: 80px auto"
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
          width="160">
      </el-table-column>
      <el-table-column
          prop="orgID"
          label="学校"
          width="250">
      </el-table-column>
      <el-table-column
          prop="department"
          label="学院"
          width="130">
      </el-table-column>
      <el-table-column
          prop="fieldofStudy"
          label="研究领域"
          width="200">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮件地址"
          width="200">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          width="90">
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

.header .logo {
  display: inline-block;
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
      searchSex:'',
      searchId:'',
      select: '导师姓名',
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
      const searchSex = this.searchSex
      // this.searchByName(searchName)
      // if(searchSex)
      this.searchByCondition(searchName,searchSex)
    },
    loadTable(num) {
      this.pageNum = num;
      axios.get("http://159.75.27.46:7086/scholar/findbypage?page=" + this.pageNum).then(res => {
        this.tableData = res.data.content;
      });
    },
    // 表格人名搜索
    searchByName(mentorName) {
      this.name = mentorName;
      axios.get("http://159.75.27.46:7086/scholar/findbyname?name=" + this.name).then(res => {
        this.tableData = res.data;
        console.log(this.tableData)
      });
    },
    searchByCondition(mentorName, mentorSex){
      this.name = mentorName;
      this.sex = mentorSex;
      if(this.sex)
        axios.get("http://159.75.27.46:7086/scholar/findByCondition?name=" + this.name+'&fieldofStudy='+this.sex).then(res => {
          this.tableData = res.data.content;
          console.log('多条件检索'+ this.sex)
        });
      else
        axios.get("http://159.75.27.46:7086/scholar/findbyname?name=" + this.name).then(res => {
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