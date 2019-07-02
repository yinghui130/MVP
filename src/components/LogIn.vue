<template>
  <div v-if="logInFlag==false">
    <!--     <p class="MsoNormal" align="center" style="text-align: center">
      <span style="color: blue">
        <font size="6" face="黑体">
          <img src="@/assets/ldxh.jpg" width="101" height="79">
          <img src="@/assets/ldzt.jpg" width="220" height="75">
        </font>
      </span>
    </p>
    <p class="MsoNormal" align="center" style="text-align: center">
      <span style="color: blue">
        <font size="6" face="黑体">研究生招生录取通知书邮寄地址查询修改系统</font>
      </span>
    </p>-->
    <br>
    <br>
    <div align="center">
      <span style="color:red">{{msg}}</span>
      <el-form ref="logForm" :model="accountInfo" label-position="right" label-width="80px">
        <el-row type="flex" justify="center">
          <el-col :span="16">
            <el-form-item label="考生姓名" prop="username">
              <el-input v-model="accountInfo.username" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="16">
            <el-form-item label="身份证号" prop="password">
              <el-input v-model="accountInfo.password" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="logIn">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "logIn",

  data() {
    var str = window.sessionStorage.getItem("studentInfo");
    if (str != null) {
      this.$store.dispatch("setLogInFlag", true);
      this.logInFlag = true;
    }
    console.log(str);
    return {
      msg: "",
      title: "",
      url: "",
      accountInfo: {
        username: "",
        password: ""
      },
      logInFlag: this.$store.getters.isLogIn
    };
  },
  mounted: function() {
    var str = window.sessionStorage.getItem("studentInfo");
    if (str != null) {
      this.$router.push({ path: "/student" });
    }
  },
  methods: {
    logIn: function() {
      let url = "/api/student/login";

      this.$axios
        .post(
          url +
            "?username=" +
            this.accountInfo.username +
            "&password=" +
            this.accountInfo.password
        )
        .then(response => {
          if (response.data == "") {
            this.msg = "姓名或者身份证错误查无此人。";
          } else {
            window.sessionStorage.setItem(
              "studentInfo",
              JSON.stringify(response.data)
            );
            console.log("sessionStorage");
            var str = window.sessionStorage.getItem("studentInfo");
            var obj = JSON.parse(str);  
            console.log(obj);
            this.logInFlag = true;
            this.$store.commit("setLogInFlag", true);
            this.$store.dispatch("setLogInFlag", true);
            console.log("this.$store.logInFlag");
            console.log(this.$store.getters.isLogIn);
            console.log(response);
            console.log(response.data);
            this.$router.push({ path: "student" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
</script>
