<template>
  <el-row>
    <el-button type="warning" @click="logOff">退出登录</el-button>
  </el-row>
</template>
<script>
export default {
  name: "logOff",
  data() {
    return {};
  },
  methods: {
    logOff: function() {
      let type = this.$store.getters.getLogInUrl;
      this.$store.dispatch("setLogInFlag", false);
      window.sessionStorage.getItem("studentInfo");
      this.$store.dispatch("setLogInUrl", "");
      window.sessionStorage.removeItem("studentInfo");
      console.log("logOff-------" + type);
      this.$router.push({
        name: "newlogin",
        path: "/newlogin",
        params: { type: type }
      });
    }
  }
};
</script>
