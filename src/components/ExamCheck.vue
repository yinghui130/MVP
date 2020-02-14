<template>
    <div>
        <fieldset>
            <legend>
                考生成绩复核
                <span style="margin:1px;float:right">
                    <logOff />
                </span>
            </legend>
            <div>
                <el-form
                    :model="formData"
                    :rules="myRules"
                    ref="formData"
                    label-position="top"
                    label-width="80px"
                >
                    <el-row
                        type="flex"
                        justify="space-around"
                    >
                        <el-col>
                            <el-form-item label="姓名">
                                <span>{{formData.studentSubjectInfo.xm}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="身份证号">
                                <span>{{formData.studentSubjectInfo.zjhm}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="考生编号">
                                <span>{{formData.studentSubjectInfo.ksbh}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row
                        v-if="editFlag==true"
                        type="flex"
                    >
                        <el-col>
                            <el-form-item label="复核科目">
                                <el-checkbox-group
                                    v-model="formData.checkNameList"
                                    aria-label
                                    :min="0"
                                    :max="4"
                                    @change="onchange"
                                    size="small"
                                >
                                    <el-checkbox
                                        border
                                        v-for="subject in formData.subjects"
                                        :label="subject.name"
                                        :key="subject.code"
                                        :value="subject.code"
                                    >{{subject.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="editFlag==true">
                        <el-col>
                            <el-form-item
                                label="手机号"
                                prop="telNo"
                            >
                                <el-input
                                    v-model="formData.telNo"
                                    style="width:280px"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="editFlag==true">
                        <div
                            v-for="(item,index) in formData.subjects"
                            :key="index"
                        >
                            <el-row>
                                <el-col v-if="item.checkFlag==true">
                                    <el-form-item
                                        :label="item.name+'原始分数'"
                                        :prop="'subjects.'+index+'.score'"
                                        :rules="myRules.score"
                                    >
                                        <el-input
                                            v-model="item.score"
                                            style="width:280px"
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <el-form-item v-if="editFlag==true">
                        <el-button
                            type="primary"
                            @click="submitForm('formData')"
                        >提交</el-button>
                    </el-form-item>
                    <el-alert
                        title="友情提示："
                        :closable="false"
                        type="error"
                    >
                        <p />
                        <span v-if="editFlag==true">
                            <p>1.取消成绩复核申请的方式是反选科目后提交；</p>
                            <p>2.成绩复核结束后可再次登录本系统查看复核结果。</p>
                        </span>
                        <span v-else>
                            {{msg}}
                        </span>
                    </el-alert>
                    <br />
                    <el-card class="box-card">
                        <div
                            slot="header"
                            class="clearfix"
                        >
                            <span>复核详情</span>
                        </div>
                        <div class="text item">
                            <el-table
                                :data="formData.stuExamCheckList"
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="kcmc"
                                    label="科目名称"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="originalResult"
                                    label="原始分数"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="checkResult"
                                    label="复核结果"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-form>

            </div>
        </fieldset>
        <br /><br /><br /><br /><br />
    </div>
</template>
<script>
import Vue from "vue";
import { Message } from "element-ui";
import moment from "moment";
import logOff from "@/components/LogOff";

export default Vue.extend({
    name: "examCheck",
    components: { logOff },
    data() {
        var showFlag = false;
        var showMsg = "";
        var now = new moment().format("YYYY-MM-DDTHH:mm:ss");
        if (
            now >= this.$myconfig.checkBeginDate &&
            now <= this.$myconfig.checkEndDate
        ) {
            showFlag = true;
        }
        if (now < this.$myconfig.checkBeginDate) {
            showMsg =
                " 成绩复核申请将于" +
                this.$myconfig.checkBeginDate.replace(/T/, " ") +
                "开通，于" +
                this.$myconfig.checkEndDate.replace(/T/, " ") +
                "截止！";
        }
        if (now > this.$myconfig.checkEndDate) {
            showMsg =
                "成绩复核申请已于" +
                this.$myconfig.checkEndDate.replace(/T/, " ") +
                "截止！";
        }
        var telNoValidate = (rule, value, callback) => {
            var re = /^1\d{10}$/;
            if (re.test(value) === false) {
                return callback(new Error("手机号必须是以1开头的11位数字"));
            } else {
                return callback();
            }
        };
        var scoreValidate = (rule, value, callback) => {
            //var re = /^(?:[1-9]\d?|1[0-4]\d|150)|(?:[1-9]\d?|1[0-4]\d|150)\.(\d{1,2})$/;
            var re = /^[+]{0,1}(\d+)$/;
            if (re.test(value) === false) {
                return callback(new Error("填写正整数"));
            } else {
                return callback();
            }
        };
        return {
            editFlag: showFlag,
            msg: showMsg,
            formData: {
                telNo: "",
                studentSubjectInfo: {},
                stuExamCheckList: [],
                subjects: [],
                checkNameList: []
            },
            myRules: {
                telNo: [
                    {
                        required: true,
                        message: "手机号必填",
                        trigger: "change"
                    },
                    { validator: telNoValidate, trigger: "blur" }
                ],
                subjects: [
                    { required: true, message: "分数必填", trigger: "change" },
                    { validator: scoreValidate, trigger: "blur" }
                ],
                score: [
                    { required: true, message: "分数必填", trigger: "change" },
                    { validator: scoreValidate, trigger: "blur" }
                ]
            }
        };
    },

    async created() {
        var checkList = [];
        var checkSubList = [];
        var checkNameList = [];
        var str = window.sessionStorage.getItem("studentInfo");
        var student = null;
        if (str != null) {
            student = JSON.parse(str);
        } else {
            this.$router.push({ path: "/newlogin/chk" });
        }
        var res = await this.$axios.post(
            "/api/student/getStuExamCheckList/" + student.ksbh
        );
        checkList = await res.data;
        this.formData.subjects = [];
        if (
            student.zzllm != NaN &&
            student.zzllm.charAt(0) != "-" &&
            student.zzllmc != "无"
        )
            this.formData.subjects.push({
                name: student.zzllmc,
                code: student.zzllm,
                checkFlag: false,
                score: ""
            });
        if (
            student.wgym != NaN &&
            student.wgym.charAt(0) != "-" &&
            student.wgymc != "无"
        )
            this.formData.subjects.push({
                name: student.wgymc,
                code: student.wgym,
                checkFlag: false,
                score: ""
            });
        if (
            student.ywk1m != NaN &&
            student.ywk1m.charAt(0) != "-" &&
            student.ywk1mc != "无"
        )
            this.formData.subjects.push({
                name: student.ywk1mc,
                code: student.ywk1m,
                checkFlag: false,
                score: ""
            });
        if (
            student.ywk2m != NaN &&
            student.ywk2m.charAt(0) != "-" &&
            student.ywk2mc != "无"
        )
            this.formData.subjects.push({
                name: student.ywk2mc,
                code: student.ywk2m,
                checkFlag: false,
                score: ""
            });
        checkList.forEach((x, i) => {
            this.formData.subjects.forEach(s => {
                if (x.kcdm == s.code) {
                    s.score = x.originalResult;
                    s.checkFlag = true;
                    this.formData.checkNameList.push(s.name);
                }
            });
            this.formData.telNo = x.telNo;
        });
        //console.log(this.formData.subjects);
        //console.log("liuyinghui-------------------");
        this.formData.studentSubjectInfo = student;
        this.formData.stuExamCheckList = checkList;
        //console.log(this.formData);

        //console.log(this.formData.studentSubjectInfo);
        //console.log(res.data);
    },
    methods: {
        onchange(labels) {
            var list = [];
            this.formData.subjects.forEach((item, index) => {
                this.formData.subjects[index].checkFlag = false;
                this.formData.checkNameList.forEach(x => {
                    if (item.name == x) {
                        this.formData.subjects[index].checkFlag = true;
                    }
                });
            });
        },
        submitForm(formName) {
            var validFlag = false;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    validFlag = true;
                }
            });
            if (validFlag == false) return false;
            var saveList = [];
            this.formData.subjects.forEach(x => {
                if (x.checkFlag == true) {
                    saveList.push({
                        zjhm: this.formData.studentSubjectInfo.zjhm,
                        xm: this.formData.studentSubjectInfo.xm,
                        ksbh: this.formData.studentSubjectInfo.ksbh,
                        kcmc: x.name,
                        kcdm: x.code,
                        originalResult: x.score,
                        telNo: this.formData.telNo,
                        checkResult: "尚未复核"
                    });
                }
            });

            this.formData.stuExamCheckList = saveList;

            this.$axios
                .post(
                    "/api/student/saveStuExamCheckList/" +
                        this.formData.studentSubjectInfo.ksbh,
                    saveList
                )
                .then(response => {
                    this.$message({
                        showClose: true,
                        message: "恭喜你，提交成功！",
                        type: "success"
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            //console.log(this.formData);
        }
    }
});
</script>
