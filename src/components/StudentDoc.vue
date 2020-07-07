<template>
    <div>
        <fieldset>
            <legend>考生信息
                <span style="margin:1px;float:right">
                    <logOff />
                </span>
            </legend>
            <div>
                <el-form
                    :model="studentForm"
                    label-width="120px"
                >
                    <el-row>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="姓名">
                                    <span>{{studentForm.xm}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="身份证号">
                                    <span>{{studentForm.zjhm}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="学号">
                                    <span>{{studentForm.xh}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="录取专业">
                                    <span>{{studentForm.lqzymc}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="录取学院">
                                    <span>{{studentForm.lqyxsmc}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="学习方式">
                                    <span>{{studentForm.lqxxfsmc}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="学制">
                                    <span>{{studentForm.xz}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="档案所在单位">
                                    <span>{{studentForm.daszdw}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="调档函下载日期">
                                    <span>{{studentForm.downloadDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row
                        type="flex"
                        justify="center"
                    >
                        <br />
                        <br />
                        <a
                            style="cursor:pointer;"
                            @click="download"
                        >下载调档函</a>
                    </el-row>
                </el-form>
                <br>
                <br>
            </div>
        </fieldset>
    </div>
</template>
<style>
.redItem .el-form-item__label {
    color: red;
}
</style>

<script>
import moment from "moment";
import { Message } from "element-ui";
import logOff from "@/components/LogOff";
export default {
    name: "studentDoc",
    components: { logOff },
    created() {
        var str = window.sessionStorage.getItem("studentInfo");
        var student = {
            zjhm: "",
            xhtxm: "",
            xh: "",
            xm: "",
            xz: "",
            lqzymc: "",
            lqyxsmc: "",
            lqxxfsmc: "",
            daszdw: "",
            downloadDate: null
        };
        if (str != null) {
            student = JSON.parse(str);
            console.log("data()");
            console.log(student);
            this.studentForm = student;
        } else {
            this.$router.push({ path: "/newlogin/doc" });
        }
    },

    data() {
        return {
            studentForm: null,
            logInFlag: this.$store.getters.isLogIn
        };
    },
    methods: {
        download: function() {
            let userId = this.studentForm.zjhm;
            let xmlResquest = new XMLHttpRequest();
            xmlResquest.open(
                "GET",
                "/api/student/print?userId=" + userId,
                true
            );
            xmlResquest.setRequestHeader(
                "Content-type",
                "application/json;charset=utf-8"
            );
            xmlResquest.responseType = "blob";
            xmlResquest.onload = function(oEvent) {
                let content = xmlResquest.response;
                let fileName = userId + ".pdf";

                let blob = new Blob([content], {
                    type: "application/pdf;charset=UTF-8"
                });

                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    let elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.id = "downloadBtn";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                }
            };
            xmlResquest.send();
            this.$axios
                .post("/api/student/updateDownloadDate/" + userId)
                .then(response => {
                    if (response.data == "" || response.data == NaN) {
                    } else {
                        this.studentForm.downloadDate = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>