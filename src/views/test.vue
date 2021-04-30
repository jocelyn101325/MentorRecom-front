<template>
  <!--  人物关系图-->
  <div>
    <input placeholder="请输入姓名" v-model="message"></input>
    <el-button @click="onsubmit()">查询</el-button>
    <p>{{message}}</p>
    <!--    <p>{{graphNodes}}</p>-->
    <!--      <div v-for="item in graphNodes">{{item}}</div>-->
    <alert :message="graphNodes"></alert>
    <div id="graph-chart">
      <div id="main-chart" style="width: 100%; height: 100%;">

      </div>
    </div>
  </div>
</template>
<style>
#graph-chart {
  width: 1000px;
  height: 500px;
}
</style>
<script>
import axios from 'axios';
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/graph");
export default {
  name: "graph-echart",
  data() {
    return {
      graphNodes: [],
      graphLinks: []
    };
  },
  updated() {
    this.initChart();
  },
  // mounted() {
  //   this.initChart();
  // },
  // created() {
  // },
  methods: {
    getData(personName) {
      //http://127.0.0.1:5000/?问号后是参数
      const path = 'http://127.0.0.1:5000/';
      axios.get(path+personName,).then(res=>{

        this.graphNodes=res.data.nodes;
        this.graphLinks=res.data.links;
        // console.log(this.graphNodes)
        // console.log(this.graphLinks);
        this.initChart();
      })
          .catch((error)=>{
            console.error(error);
          })
    },
    onsubmit() {
      const personName = this.message
      this.getData(personName)
    },
    initChart: function() {
      let myChart = this.echarts.init(document.getElementById('main-chart'));
      let option = {
        title: {
          text: "Graph 简单示例",
        },
        tooltip: {}, //提示框
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            // symbolSize: 50, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
            symbolSize: (value, params) => {
              switch (params.data.category) {
                case 0:
                  return 100;
                  break;
                case 1:
                  return 50;
                  break;
              }
            },
            roam: true, //鼠标缩放功能
            label: {
              show: true, //是否显示标签
            },
            focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
            edgeSymbol: ["none", "arrow"], //关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
            edgeSymbolSize: [4, 10],
            draggable: true,
            edgeLabel: {
              fontSize: 20, //关系（也即线）上的标签字体大小
            },
            force: {
              repulsion: 200,
              edgeLength: 120,
            },
            data: [
              {
                name: "节点1",
                category: 0,
              },
              {
                name: "节点2",
                category: 1,
              },
              {
                name: "节点3",
                category: 1,
              },
              {
                name: "节点4",
                category: 1,
              },
            ],
            // links: [],
            links: [
              {
                source: "节点1",
                target: "节点3",
              },
              {
                source: "节点1",
                target: "节点2",
              },
              {
                source: "节点1",
                target: "节点4",
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      myChart.resize();
      myChart.setOption(option);
    },
  },



}
</script>
