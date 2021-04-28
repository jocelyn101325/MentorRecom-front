<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="width: 500px;height: 500px;border: 1px solid black">
      <h1>{{msg}}</h1>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    getMessage() {
      const path = 'http://127.0.0.1:5000/';
      axios
          .get(path)
          .then(res=>{
            this.msg = res.data;
          })
          .catch(error => {
            console.error(error);
          })
    }
  },
  created() {
    this.getMessage();
  }
}
</script>
