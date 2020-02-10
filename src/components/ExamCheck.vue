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
                >
                    <el-row>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="姓名">
                                    <span>{{formData.studentSubjectInfo.xm}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="身份证号">
                                    <span>{{formData.studentSubjectInfo.zjhm}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div>
                                <el-form-item label="考生编号">
                                    <span>{{formData.studentSubjectInfo.ksbh}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row v-if="editFlag==true">
                        <el-col :span="16">
                            <div>
                                <el-form-item label="复核科目">
                                    <el-checkbox-group
                                        v-model="formData.checkSubNameList"
                                        aria-label
                                        :min="0"
                                        :max="2"
                                        @change="onchange"
                                    >
                                        <el-checkbox
                                            v-for="subject in formData.subjects"
                                            :label="subject.name"
                                            :key="subject.code"
                                            :value="subject.code"
                                        >{{subject.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="editFlag==true">
                        <el-col :span="8">
                            <el-form-item
                                label="手机号"
                                prop="telNo"
                            >
                                <el-input v-model="formData.telNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="editFlag==true">
                        <div
                            v-for="(item,index) in formData.checkSubjects"
                            :key="index"
                        >
                            <el-row>
                                <el-col
                                    :span="8"
                                    v-if="index==0"
                                >
                                    <el-form-item
                                        :label="item.name+'原始分数'"
                                        prop="originalScore0"
                                    >
                                        <el-input v-model="formData.originalScore0"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="8"
                                    v-if="index==1"
                                >
                                    <el-form-item
                                        :label="item.name+'原始分数'"
                                        prop="originalScore1"
                                    >
                                        <el-input v-model="formData.originalScore1"></el-input>
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
                        title="说明："
                        :closable="false"
                        type="error"
                    >
                        <p />
                        <p>1.每名考生最多可对两门科目提出成绩复核请求；</p>
                        <p>2.成绩复核在结束后可再次登录本系统查看复核结果。</p>
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
import moment from "moment";
import logOff from "@/components/LogOff";
export default Vue.extend({
    name: "examCheck",
    components: { logOff },
    data() {
        var showFlag = false;
        var now = new moment().format("YYYY-MM-DD");
        if (
            now >= this.$myconfig.checkBeginDate &&
            now <= this.$myconfig.checkEndDate
        ) {
            showFlag = true;
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
            var re = /^(?:[1-9]\d?|1[0-4]\d|150)$/;
            if (re.test(value) === false) {
                return callback(new Error("填写数字且不能超过150"));
            } else {
                return callback();
            }
        };
        return {
            editFlag: showFlag,
            formData: {
                telNo: "",
                studentSubjectInfo: {},
                stuExamCheckList: [],
                checkSubNameList: [],
                checkSubjects: [],
                originalScore0: "",
                originalScore1: "",
                subjects: []
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
                originalScore0: [
                    { required: true, message: "分数必填", trigger: "change" },
                    { validator: scoreValidate, trigger: "blur" }
                ],
                originalScore1: [
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
        //console.log(str);
        var student = null;
        if (str != null) {
            student = JSON.parse(str);
        } else {
            this.$router.push({ path: "/newlogin/chk" });
        }
        const res = await this.$axios.post(
            "/api/student/getStuExamCheckList/" + student.ksbh
        );
        checkList = await res.data;
        checkList.forEach((x, i) => {
            checkSubList.push({
                name: x.kcmc,
                code: x.kcdm,
                score: x.originalResult
            });
            checkNameList.push(x.kcmc);
            this.formData.telNo = x.telNo;
            if (i == 0) this.formData.originalScore0 = x.originalResult;
            else this.formData.originalScore1 = x.originalResult;
        });
        //console.log("liuyinghui-------------------");
        this.formData.studentSubjectInfo = student;
        this.formData.stuExamCheckList = checkList;
        this.formData.checkSubNameList = checkNameList;
        this.formData.checkSubjects = checkSubList;
        this.formData.subjects = [
            { name: student.zzllmc, code: student.zzllm },
            { name: student.wgymc, code: student.wgym },
            { name: student.ywk1mc, code: student.ywk1m },
            { name: student.ywk2mc, code: student.ywk2m }
        ];
        console.log(this.formData);

        //console.log(this.formData.studentSubjectInfo);
        //console.log(res.data);
    },
    methods: {
        getStuExamCheckList() {
            return this.$axios.post(
                "/api/student/getStuExamCheckList/" + student.ksbh
            );
        },
        async getData() {
            try {
                let tempData = await getStuExamCheckList();
                return tempData.data;
            } catch (err) {
                //console.log(err);
            }
        },
        onchange(labels) {
            var list = [];
            labels.forEach(x => {
                this.formData.subjects.forEach(item => {
                    var score = "";
                    this.formData.stuExamCheckList.forEach(c => {
                        if (c.kcmc == x) {
                            score = c.originalResult;
                        }
                    });
                    if (item.name == x) {
                        item.score = score;
                        list.push(item);
                    }
                });
            });
            if (list.length == 0) {
                this.formData.checkSubjects = [];
            } else {
                this.formData.checkSubjects = list;
                list.forEach((x, i) => {
                    if (i == 0) {
                        this.formData.originalScore0 = x.score;
                    } else if (i == 1) {
                        this.formData.originalScore1 = x.score;
                    }
                });
            }
            //console.log(this.formData.checkSubjects);
        },
        submitForm(formName) {
            var validFlag = false;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    validFlag = true;
                } else {
                    //console.log("error submit!!");
                    return false;
                }
            });
            {
                var saveList = [];
                this.formData.checkSubjects.forEach((x, index) => {
                    saveList.push({
                        zjhm: this.formData.studentSubjectInfo.zjhm,
                        xm: this.formData.studentSubjectInfo.xm,
                        ksbh: this.formData.studentSubjectInfo.ksbh,
                        kcmc: this.formData.checkSubjects[index].name,
                        kcdm: this.formData.checkSubjects[index].code,
                        originalResult:
                            index == 0
                                ? this.formData.originalScore0
                                : this.formData.originalScore1,
                        telNo: this.formData.telNo,
                        checkResult: "尚未复核"
                    });
                });
            }
            if (saveList.length > 0) {
                this.formData.stuExamCheckList = saveList;
                if (saveList.length == 1) {
                    this.formData.originalScore1 = "";
                }

                this.$axios
                    .post("/api/student/saveStuExamCheckList", saveList)
                    .then(response => {
                        alert("信息更新成功！");
                    })
                    .catch(error => {
                        //console.log(error);
                    });
                console.log(this.formData);
            } else {
                alert("选择要复核的科目填写原始分数后提交！！");
                return false;
            }
        }
    }
});
</script>
