<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  background-color: #F2F6FC;
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
