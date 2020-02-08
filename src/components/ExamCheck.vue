<template>
  <div>
    <fieldset>
      <legend>
        考生信息
        <span style="margin:1px;float:right"></span>
      </legend>
      <div>
        <el-form :model="studentSubjectInfo" :rules="myRules"  ref="studentForm"  label-width="120px">
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="姓名">
                  <span>{{studentSubjectInfo.xm}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="身份证号">
                  <span>{{studentSubjectInfo.zjhm}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="考生编号">
                  <span>{{studentSubjectInfo.ksbh}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <div>
                <el-form-item label="复核科目">
                  <el-checkbox-group
                    v-model="checkSubNameList"
                    aria-label
                    :min="0"
                    :max="2"
                    @change="onchange"
                  >
                    <el-checkbox
                      v-for="subject in subjects"
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
              <el-form-item label="手机号" prop="telNo">
                <el-input v-model="telNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-for="(item,index) in stuExamCheckList" :key="index">
            <el-row>
              <el-col :span="8" v-if="index==0">
                <el-form-item :label="item.name" prop="originalScore0">
                  <el-input v-model="originalScore0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="index==1">
                <el-form-item :label="item.name" prop="originalScore1">
                  <el-input v-model="originalScore1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('studentForm')">提交</el-button>
          </el-form-item>
        </el-form>
        <el-alert title="说明：" :closable="false" type="error">
          <p>1.每名考生最多可提出两门科目的成绩复核。</p>
          <p>2.成绩复核在结束后可再次登录本系统查看复核结果。</p>
        </el-alert>
      </div>
    </fieldset>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "examCheck",
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
      var re = /^(?:[1-9]d?1[0-4]\d|150)$/;
      if (re.test(value) === false) {
        return callback(new Error("填写数字且不能超过150"));
      } else {
        return callback();
      }
    };
    return {
      telNo: "",
      studentSubjectInfo: {},
      stuExamCheckList: [],
      checkSubNameList: [],
      checkSubjects: [],
      openFlag: true,
      originalScore0: "",
      originalScore1: "",
      subjects: [],
      myRules: {
        telNo: [
          { required: true, message: "手机号必填", trigger: "change" },
          { validator: telNoValidate, trigger: "blur" }
        ],
        originalScore0: [
          { required: false, message: "分数必填", trigger: "change" },
          { validator: scoreValidate, trigger: "blur" }
        ],
        originalScore1: [
          { required: false, message: "分数必填", trigger: "change" },
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
    checkList = await res.data;
    checkSubList.push({ name: student.zzllmc, code: student.zzllm });
    checkNameList.push(student.zzllmc);
    console.log("liuyinghui-------------------");
    console.log(this.studentSubjectInfo);
    this.studentSubjectInfo = student;
    this.stuExamCheckList = checkList;
    this.checkSubNameList = checkNameList;
    this.checkSubjects = checkSubList;
    this.openFlag = true;
    this.subjects = [
      { name: student.zzllmc, code: student.zzllm },
      { name: student.wgymc, code: student.wgym },
      { name: student.ywk1mc, code: student.ywk1m },
      { name: student.ywk2mc, code: student.ywk2m }
    ];
    console.log(this.subjects);

    console.log(this.studentSubjectInfo);
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
        this.subjects.forEach(item => {
          if (item.name == x) {
            list.push(item);
          }
        });
      });
      if (list.length == 0) {
        this.stuExamCheckList = [];
      } else {
        this.stuExamCheckList = list;
      }
      console.log(this.stuExamCheckList);
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
      }
  }
});
</script>
