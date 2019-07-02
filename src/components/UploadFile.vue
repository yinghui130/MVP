<template>
  <div>
    <div>上传研究生基础数据（Excel文档)</div>
    <br/>
    <br/>
    <el-row>
      <el-col :span="12">
        <input type="file" ref="input" @change="selectedFile" accept=".xls, .xlsx">
      </el-col>
      <el-col :span="12">
        <button @click="upload">上传</button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "uploadFile",
  data() {
    return {};
  },
  methods: {
    selectedFile: function(e) {
      console.log(e.target.files[0]);
    },
    async upload() {
      let files = this.$refs.input.files;
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let url = "/api/fileupload/upload?fileName=" + files[0].name;
        let requestConfig = {
          headers: {
            "Content-type": "multipart/form-data"
          }
        };
        this.$axios.post(url, formData, requestConfig).then(function(res) {
          alert("处理完毕！！");
          this.$refs.input.value = "";
        });
      }
    }
  }
};
</script>