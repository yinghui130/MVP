<template>
    <div>
        <fieldset>
            <legend>
                考生信息
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

                    <el-row>
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
                    <el-row>
                        <el-col :span="8">
                            <el-form-item
                                label="手机号"
                                prop="telNo"
                            >
                                <el-input v-model="formData.telNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div
                        v-for="(item,index) in formData.stuExamCheckList"
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
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('formData')"
                        >提交</el-button>
                    </el-form-item>
                </el-form>
                <el-alert
                    title="说明："
                    :closable="false"
                    type="error"
                >
                    <p>1.每名考生最多可提出两门科目的成绩复核。</p>
                    <p>2.成绩复核在结束后可再次登录本系统查看复核结果。</p>
                </el-alert>
            </div>
        </fieldset>
    </div>
</template>
<script>
import Vue from "vue";
import logOff from "@/components/LogOff";
export default Vue.extend({
    name: "examCheck",
    components: { logOff },
    data() {
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
            openFlag: true,
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
        console.log(str);
        var student = null;
        if (str != null) {
            student = JSON.parse(str);
        } else {
            this.$router.push({ path: "/newlogin/chk" });
        }
        const res = await this.$axios.post(
            "/api/student/getStuExamCheckList/" + student.ksbh
        );
        //setTimeout(()=>{},1000)
        checkList = await res.data;
        checkSubList.push({ name: student.zzllmc, code: student.zzllm });
        checkNameList.push(student.zzllmc);
        console.log("liuyinghui-------------------");
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
        console.log(this.formData.subjects);

        console.log(this.formData.studentSubjectInfo);
        console.log(res.data);
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
                console.log(err);
            }
        },
        onchange(labels) {
            var list = [];
            labels.forEach(x => {
                this.formData.subjects.forEach(item => {
                    if (item.name == x) {
                        list.push(item);
                    }
                });
            });
            if (list.length == 0) {
                this.formData.stuExamCheckList = [];
            } else {
                this.formData.stuExamCheckList = list;
            }
            console.log(this.formData.stuExamCheckList);
        },
        submitForm(formName) {
            var validFlag = false;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    validFlag = true;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            var saveList = [];
            if (
                this.formData.originalScore0 != "" &&
                this.formData.originalScore0 != NaN
            ) {
                saveList.push({
                    xm: this.formData.studentSubjectInfo.xm,
                    zjhm: this.formData.studentSubjectInfo.zjhm,
                    ksbh: this.formData.studentSubjectInfo.ksbh,
                    kcmc: this.formData.stuExamCheckList[0].name,
                    kcdm: this.formData.stuExamCheckList[0].code,
                    originalResult: this.formData.originalScore0,
                    telNo: this.formData.telNo
                });
            }
            if (
                this.formData.originalScore1 != "" &&
                this.formData.originalScore1 != NaN
            ) {
                saveList.push({
                    xm: this.formData.studentSubjectInfo.xm,
                    zjhm: this.formData.studentSubjectInfo.zjhm,
                    ksbh: this.formData.studentSubjectInfo.ksbh,
                    kcmc: this.formData.stuExamCheckList[1].name,
                    kcdm: this.formData.stuExamCheckList[1].code,
                    originalResult: this.formData.originalScore1,
                    telNo: this.formData.telNo
                });
            }
            if (saveList.length > 0) {
                this.$axios
                    .post("/api/student/saveStuExamCheckList", saveList)
                    .then(response => {
                        alert("信息更新成功！");
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
});
</script>
