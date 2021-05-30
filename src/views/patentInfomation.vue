<template>

  <div class="mentor-info">
    <el-card class="left">
      <div class="b-info">
        <el-card class="card1">
          <div class="photo">
            <el-avatar shape="square" :size="130" :src="squareUrl" ></el-avatar>
          </div>
          <div class="basic-info1">
            <h1><b>{{ mentorDetail.name }}</b></h1>
            <p><b>性别：</b>{{mentorDetail.sex}}</p>
            <p><b>职称：</b>{{mentorDetail.postRank}}</p>
          </div>
          <div class="basic-info2">
            <span><b>学校：</b>{{mentorDetail.orgID}} {{mentorDetail.department}}
            </span>

          </div>
        </el-card>
        <el-card class="card2">

          <p><b>研究领域：</b>{{mentorDetail.fieldofStudy}}</p>
          <p><b>教育背景：</b>{{mentorDetail.eduBackg}}</p>
          <p><b>发表论文：</b>{{mentorDetail.papers}}</p>
          <p><b>发表专利：</b>{{mentorDetail.patents}}</p>
        </el-card>
      </div>
    </el-card>
    <el-card class="right">
        <el-card class="graph-chart">
          <h2>关系图</h2>
          <div id="main-chart" style="width: 1000px; height: 1000px;"></div>
        </el-card>
    </el-card>
    <!-- 浮动会使元素脱标，在所有浮动元素后面加一个块状元素，并设置clear:both清除浮动造成的父元素高度撑不起来问题 -->
    <div class="clear"></div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/graph");
export default {
      name: "personInfomation",
      data() {
        return{
          squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          mentorId:'',
          mentorDetail:[]
        }
      },
      updated() {
        this.initChart();
      },
      mounted() {
        this.getDetails();
        this.getGraph();
      },
      methods: {
        getDetails() {
          //获取当前页面接收到的id
          this.id = this.$route.params && this.$route.params.id;
          console.log('获取到的id='+ this.id)
          axios.get("http://159.75.27.46:7086/patent/EN/findbyinventor?inventor=" + this.id).then(res => {
            this.mentorDetail = res.data;
            // console.log('返回的'+this.mentorDetail.name)
          });
        },
        // initChart: function() {
        //   this.myChart = echarts.init(document.getElementById('main-chart'));
        //   this.mentorId = this.$route.params && this.$route.params.id;
        //   console.log(this.mentorId)
        //   this.myChart.setOption({
        //     animationDurationUpdate: 1500,
        //     animationEasingUpdate: "quinticInOut",
        //     legend: {
        //       show: true,
        //       data: [
        //         {
        //           name: "0"
        //         },
        //         {
        //           name: "1"
        //         }
        //       ]
        //     },
        //     series: [
        //       {
        //         type: "graph",
        //         layout: "force",
        //         symbolSize: 80, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
        //         roam: true, //鼠标缩放功能
        //         // label: {
        //         //   show: true, //是否显示标签
        //         // },
        //         // focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
        //         categories: [
        //           {
        //             name: '0',
        //             itemStyle: { //可配置颜色
        //               normal: {
        //                 // borderColor: '#fff',
        //                 // borderWidth: 1,
        //                 // shadowBlur: 10,
        //                 color: "#DF4949",
        //               }
        //             }
        //           }, {
        //             name: '1',
        //             itemStyle: { //可配置颜色
        //               normal: {
        //                 // borderColor: '#fff',
        //                 // borderWidth: 1,
        //                 // shadowBlur: 10,
        //                 color: "#293950",
        //               }
        //             }
        //           }
        //         ],
        //         edgeSymbol: ["circle", "arrow"], //关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
        //         edgeSymbolSize: [4, 10],
        //         draggable: true,
        //         edgeLabel: {
        //           show: false,
        //           normal: {
        //             show: true,
        //             position: 'middle',
        //             textStyle: {
        //               fontSize: 12
        //             },
        //             formatter: "{c}"
        //           },
        //         },
        //         label: {
        //           normal: {
        //             position: "inside",
        //             show: true,
        //             textStyle: {
        //               color: '#fff',
        //               fontSize: 12
        //             },
        //           }
        //         },
        //         force: {
        //           repulsion: 900,
        //           edgeLength: 200,
        //         },
        //         data: [],
        //         links: [],
        //         itemStyle: {
        //         },
        //         lineStyle: {
        //           opacity: 0.9,
        //           width: 2,
        //           curveness: 0.1,
        //         },
        //       },
        //     ]
        //   });
        //   this.axios.get('http://159.75.27.46:7086/scholar/scholarnetwork/findbyid?personid=' + this.mentorId).then(res=>{
        //     this.graph=res.data;
        //     console.log(this.graph)
        //     this.myChart.setOption({
        //       series:[{
        //         data: this.graph.nodes,
        //         links: this.graph.links
        //       }],
        //     })
        //   }).catch(function (error) { // 请求失败处理
        //     console.log("查无此人");
        //     console.log(error);
        //   });
        // },
      }
    }

</script>

<style scoped>
* {
  padding: 0;
  color: #303133;
}
p, span {
  font-size: 20px;
  padding: 10px 0;
}
h1 {
  padding-bottom: 5px;
}
.graph-chart {
  width: 1200px;
  height: 750px;
  /*border-radius: 20px;*/
}
.card1 {
  height: 300px;
  padding: 30px;
}
.card2 {
  height: 450px;
  padding: 30px;
}
.left {
  height: 800px;
  width: 40%;
  float: left;
}
.right {
  height: 800px;
  width: 57%;
  float: left;
  position: relative;
}
.photo {
  height: 170px;
  width: 30%;
  float: left;
}
.basic-info1 {
  height: 170px;
  width: 55%;
  float: left;
  position: relative;
}
.basic-info2 {
  height: 70px;
  width: 90%;
  float: left;
  position: relative;
}

.clear {
  clear: both;
}
</style>