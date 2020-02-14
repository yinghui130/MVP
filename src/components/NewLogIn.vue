<template>
    <div v-if="logInFlag==false">
        <p
            class="MsoNormal"
            align="center"
            style="text-align: center"
        >
            <span style="color: blue">
                <font
                    size="6"
                    face="黑体"
                >
                    <img
                        src="@/assets/ldxh.jpg"
                        width="101"
                        height="79"
                    />
                    <img
                        src="@/assets/ldzt.jpg"
                        width="220"
                        height="75"
                    />
                </font>
            </span>
        </p>
        <p
            class="MsoNormal"
            align="center"
            style="text-align: center"
        >
            <span style="color: blue">
                <font
                    size="6"
                    face="黑体"
                >{{appName}}</font>
            </span>
        </p>
        <br />
        <br />
        <div align="center">
            <span style="color:red">{{msg}}</span>
            <el-form
                ref="logForm"
                :model="accountInfo"
                label-position="right"
                label-width="80px"
            >
                <el-row
                    type="flex"
                    justify="center"
                >
                    <el-col :span="16">
                        <el-form-item
                            v-bind:label="loginName"
                            prop="username"
                        >
                            <el-input
                                v-model="accountInfo.username"
                                size="small"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row
                    type="flex"
                    justify="center"
                >
                    <el-col :span="16">
                        <el-form-item
                            v-bind:label="loginPwd"
                            prop="password"
                        >
                            <el-input
                                v-model="accountInfo.password"
                                size="small"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row
                    type="flex"
                    justify="center"
                >
                    <el-col>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="logIn"
                            >登录</el-button>
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
    name: "newLogIn",

    data() {
        var str = window.sessionStorage.getItem("studentInfo");
        if (str != null) {
            this.$store.dispatch("setLogInFlag", true);
            this.logInFlag = true;
        }
        //console.log(str);
        //console.log("参数" + this.$route.params.type);
        var logInUrl = "/api/exam/getExamResultInfo";
        var route = "/exam";
        var myTitle = "研究生招生成绩查询打印系统";
        var myName = "考生姓名";
        var myPwd = "身份证号";
        if (this.$route.params.type == "stu") {
            logInUrl = "/api/student/login";
            route = "/student";
            myTitle = "研究生招生录取通知书邮寄地址查询修改系统";
        }
        if (this.$route.params.type == "chk") {
            logInUrl = "/api/student/login";
            route = "/examCheck";
            myTitle = "研究生招生初试成绩复核申请系统";
            myName = "考生编号";
            myPwd = "身份证号";
        }
        return {
            appName: myTitle,
            loginPwd: myPwd,
            loginName: myName,
            msg: "",
            title: "",
            url: logInUrl,
            jmpRoute: route,
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
            this.$router.push({ path: this.jmpRoute });
        }
    },
    methods: {
        logIn: function() {
            // console.log(this);
            var type = "/stu";
            if (this.$route.params.type == "chk") {
                type = "/chk";
            }
            this.$axios
                .post(
                    this.url +
                        "/" +
                        this.accountInfo.username +
                        "/" +
                        this.accountInfo.password +
                        type
                )
                .then(response => {
                    if (response.data == "") {
                        this.msg =
                            this.loginName +
                            "或者" +
                            this.loginPwd +
                            "错误查无此人。";
                    } else {
                        window.sessionStorage.setItem(
                            "studentInfo",
                            JSON.stringify(response.data)
                        );
                        //console.log(this.$route.params.type);
                        this.$store.dispatch(
                            "setLogInUrl",
                            this.$route.params.type
                        );
                        //console.log("sessionStorage");
                        var str = window.sessionStorage.getItem("studentInfo");
                        var obj = JSON.parse(str);
                        //console.log(obj);
                        this.logInFlag = true;
                        this.$store.commit("setLogInFlag", true);
                        this.$store.dispatch("setLogInFlag", true);
                        //console.log("this.$store.logInFlag");
                        //console.log(this.$store.getters.isLogIn);
                        //console.log(response);
                        //console.log(response.data);
                        this.$router.push({ path: this.jmpRoute });
                    }
                })
                .catch(error => {
                    //console.log(error);
                });
        }
    }
});
</script>
