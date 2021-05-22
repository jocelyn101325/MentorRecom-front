<template>
  <div id="app">
<!--    <el-container>-->
<!--      <el-header style="height: 80px;">-->
<!--        <div style="text-align: center;text-shadow: 0 0 0.06em white;font-size: 40px;color: #eeeeee;font-weight: bold;line-height: 80px">-->
<!--          <span>双创朋友圈</span>-->
<!--        </div>-->
<!--      </el-header>-->
<!--    </el-container>-->

<!--    <el-container style="height: 840px; border: 1px solid #eee">-->
      <!--        左侧导航栏内容-->
      <!--        default-openeds="['1','3']" 默认展开的菜单，通过菜单的index值关联
                  default-active="['1-1']" 默认选中菜单1-1
                  el-submenu：可展开的菜单，常用属性index，菜单的下标（文本类型，不能是数值类型）
                  template：对应el-submenu的菜单名
                      i：设置菜单图标，通过class属性设置（el-icon-message,el-icon-menu,el-icon-setting）
                  el-menu-item 菜单的子节点，不可展开-->
<!--左侧导航-->
<!--      <el-aside width="260px" style="background-color: rgb(238, 241, 246)">-->
<!--        <el-menu router :default-openeds="['1']">-->
<!--          <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''">-->
<!--            <template slot="title"><i class="el-icon-setting"></i>{{item.name}}</template>-->
<!--            <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
<!--      </el-aside>-->

      <el-menu
          :default-active="this.$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
      >
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>

      </el-menu>
      <el-main style="padding: 0;height: 100%;">
        <router-view></router-view>
      </el-main>
<!--    </el-container>-->
  </div>
</template>

<style>
.el-main {
  height: 930px;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      navList:[
        {name:'/search', navItem:'综合检索'},
        {name:'/portrait',navItem:'导师画像'},
      ]

    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
