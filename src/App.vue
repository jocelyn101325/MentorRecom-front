<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
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
    const item = {
      date: '2021-04',
      name: 'j',
      address: '天津大学'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
};
</script>
