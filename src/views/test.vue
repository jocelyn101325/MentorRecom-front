<template>
  <!--  人物关系图-->
  <div class="main">
    <div class="searchBox" style="width: 1100px;">
      <input placeholder="请输入姓名" v-model="message"></input>
      <el-button @click="onsubmit()">查询</el-button>
      <p>{{message}}</p>
    </div>
    <!--    <p>{{graphNodes}}</p>-->
    <!--      <div v-for="item in graphNodes">{{item}}</div>-->
    <!--    <alert :message="graphNodes"></alert>-->
    <div id="graph-chart">
      <div id="main-chart" style="width: 100%; height: 100%;">

      </div>
    </div>
  </div>
</template>
<style>
#graph-chart {
  width: 1000px;
  height: 750px;
}
.searchBox {
  margin: 0 auto;
}
input{
  height: 35px;
  padding-left: 5px;

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
      // graphNodes: [],
      // graphLinks: []
      graph: {}
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
    // getData(personName) {
    //   //http://127.0.0.1:5000/?问号后是参数
    //   const path = 'http://127.0.0.1:5000/';
    //   axios.get(path+personName,).then(res=>{
    //
    //     this.graphNodes=res.data.nodes;
    //     this.graphLinks=res.data.links;
    //     // console.log(this.graphNodes)
    //     // console.log(this.graphLinks);
    //     this.initChart();
    //   })
    //       .catch((error)=>{
    //         console.error(error);
    //       })
    // },
    onsubmit() {
      const personName = this.message
      this.initChart(personName)
    },
    initChart: function(personName) {
      this.myChart = echarts.init(document.getElementById('main-chart'));
      this.myChart.setOption({
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        legend: {
          show: true,
          data: [
            {
              name: "0"
            },
            {
              name: "1"
            },
            {
              name: "2"
            }
          ]
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 80, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
            roam: true, //鼠标缩放功能
            // label: {
            //   show: true, //是否显示标签
            // },
            focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
            categories: [
              {
                name: '0',
                itemStyle: { //可配置颜色
                  normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    color: "#A170DD",
                  }
                }
              }, {
                name: '1',
                itemStyle: { //可配置颜色
                  normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    color: "#41B1EF",
                  }
                }
              }, {
                name: '2',
                itemStyle: { //可配置颜色
                  normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    color: "#E8B842",
                  }
                }
              },
              {
                name: '3',
                itemStyle: { //可配置颜色
                  normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    color: "#91c7ae",
                  }
                }
              },
            ],

            edgeSymbol: ["circle", "arrow"], //关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
            edgeSymbolSize: [4, 10],
            draggable: true,
            edgeLabel: {
              show: false,
              normal: {
                show: true,
                position: 'middle',
                textStyle: {
                  fontSize: 12
                },
                formatter: "{c}"
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 12
                },
              }
            },
            force: {
              repulsion: 1000,
              edgeLength: 300,
            },
            data: [],
            links: [],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#157eff'
                }, {
                  offset: 1,
                  color: '#35c2ff'
                }]),
              },
              shadowBlur: 10
            },
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0.1,
            },
          },
        ]
      });
      // const path = 'http://127.0.0.1:5000/';
      const path = 'http://172.26.53.249:5000/';

      this.axios.get(path + personName).then(res=>{
        // this.axios.get(path).then(res=>{

        this.graph=res.data;
        // this.graphNodes=res.data.nodes;
        // this.graphLinks=res.data.links;
        console.log(this.graph)
        // console.log(this.graphLinks);
        this.myChart.setOption({
          series:[{
            data: this.graph.nodes,
            links: this.graph.links
          }],
        })
      });



    },












    // getData(personName) {
    //   //http://127.0.0.1:5000/?问号后是参数
    //   const path = 'http://127.0.0.1:5000/';
    //   axios.get(path+personName,).then(res=>{
    //
    //     this.graphNodes=res.data.nodes;
    //     this.graphLinks=res.data.links;
    //     // console.log(this.graphNodes)
    //     // console.log(this.graphLinks);
    //     this.initChart();
    //   })
    //   .catch((error)=>{
    //     console.error(error);
    //   })
    // },
    // onsubmit() {
    //   const personName = this.message
    //   this.getData(personName)
    // },

  },



}
</script>
