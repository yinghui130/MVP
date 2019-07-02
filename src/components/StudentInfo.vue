<template>
  <div>
    <fieldset>
      <legend>考生信息
        <span style="margin:1px;float:right">
          <logOff/>
        </span>
      </legend>
      <div v-if="openFlag==true">
        <el-form :model="studentForm" :rules="studentRules" ref="studentForm" label-width="120px">
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="姓名">
                  <span>{{studentForm.name}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="身份证号">
                  <span>{{studentForm.personId}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="学习方式">
                  <span>{{studentForm.eduType}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="考试编号">
                  <span>{{studentForm.examNo}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="录取通知书编号（学号）">
                  <span>{{studentForm.studentNo}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="院系代码">
                  <span>{{studentForm.collegeCode}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="院系名称">
                  <span>{{studentForm.collegeName}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="专业代码">
                  <span>{{studentForm.majorCode}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="专业名称">
                  <span>{{studentForm.majorName}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="上次更新时间">
                  <span>{{studentForm.updateTime}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="通知书领取方式" prop="accessType">
            <el-radio v-model="studentForm.accessType" label="邮寄" name="accessType">邮寄</el-radio>
            <el-radio v-model="studentForm.accessType" label="自取" name="accessType">自取</el-radio>
          </el-form-item>
          <el-form-item label="通信地址" prop="address">
            <el-input v-model="studentForm.address"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="postCode">
            <el-input v-model="studentForm.postCode"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telNo1">
            <el-input v-model="studentForm.telNo1"></el-input>
          </el-form-item>
          <el-form-item label="备用通讯方式" prop="telNo2">
            <el-input v-model="studentForm.telNo2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('studentForm')">提交</el-button>
          </el-form-item>
        </el-form>
        <el-alert title="说明：" :closable="false" type="error">
          <p>1.凡是欲自行领取通知书的考生，以及鲁东大学应届本科毕业生或报名时所留地址为鲁东大学的考生，“领取方式”请选择“自取”;其他考生“领取方式”请选择“邮寄”。</p>
          <p>2.因浏览器兼容性问题，个别考生可能出现信息提交保存失败的情况（尤其是手机上网）。请点击“确定修改”按钮后，务必再次登录系统查看一下，修改信息是否提交成功。如出现信息栏为空白的情况，则说明没有提交成功，请更换浏览器后重新提交并再次查看。</p>
        </el-alert>
      </div>
      <div v-else>
        <el-form :model="studentForm" label-width="120px">
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="姓名">
                  <span>{{studentForm.name}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="身份证号">
                  <span>{{studentForm.personId}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="学习方式">
                  <span>{{studentForm.eduType}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="考试编号">
                  <span>{{studentForm.examNo}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="录取通知书编号（学号）">
                  <span>{{studentForm.studentNo}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="院系代码">
                  <span>{{studentForm.collegeCode}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="院系名称">
                  <span>{{studentForm.collegeName}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="专业代码">
                  <span>{{studentForm.majorCode}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="专业名称">
                  <span>{{studentForm.majorName}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="通知书领取方式">
                  <span>{{studentForm.accessType}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="通信地址">
                  <span>{{studentForm.address}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="邮政编码">
                  <span>{{studentForm.postCode}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="手机号">
                  <span>{{studentForm.telNo1}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="备用通讯方式">
                  <span>{{studentForm.telNo2}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="更新时间">
                  <span>{{studentForm.updateTime}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="EMS快递单号" class="redItem" prop="ems">
            <span>{{studentForm.ems}}</span>
          </el-form-item>
          <el-alert title="说明：" :closable="false" type="error">
            <p>1.凡是“领取方式”为“自取”的考生，请尽快携有效身份证件到我校研招办自行领取通知书；</p>
            <p>
              2.领取方式”为“邮寄”的考生，将按地址通过邮政EMS特快寄出，一般五天左右寄到，考生可自行登录邮政特快专递查询网站：
              <a
                href="http://www.ems.com.cn"
                target="_blank"
              >www.ems.com.cn</a>输入本人的“特快专递单号”查询录取通知书邮寄状态 。
            </p>
          </el-alert>
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
import logOff from "@/components/LogOff";
export default {
  name: "studentInfo",
  components: { logOff },
  data() {
    var postCodeValidate = (rule, value, callback) => {
      var re = /^[0-9][0-9]{5}$/;
      if (re.test(value) === false) {
        return callback(new Error("邮政编码必须为6位数字"));
      } else {
        return callback();
      }
    };
    var telNo1Validate = (rule, value, callback) => {
      var re = /^1\d{10}$/;
      if (re.test(value) === false) {
        return callback(new Error("手机号必须是以1开头的11位数字"));
      } else {
        return callback();
      }
    };
    var str = window.sessionStorage.getItem("studentInfo");
    var student = {
      name: "",
      personId: "",
      eduType: "",
      telNo1: "",
      telNo2: "",
      postCode: "",
      majorCode: "",
      majorName: "",
      accessType: null,
      address: "",
      collegeCode: "",
      collegeName: "",
      studentNo: "",
      examNo: "",
      ems: ""
    };
    if (str != null) {
      student = JSON.parse(str);
      console.log("data()");
      console.log(student);
    }
    else{
      this.$router.push({ path: "/newlogin/stu" });
    }
    console.log("sudentinfo.vue islogin");
    console.log(this.$store.getters.isLogIn);
    return {
      studentForm: student,
      openFlag: this.$myconfig.openFlag,
      logInFlag: this.$store.getters.isLogIn,
      studentRules: {
        accessType: [
          { required: true, message: "请选择领取通知书的方式", trigger: "blur" }
        ],
        address: [
          { required: true, message: "通信地址必填", trigger: "change" }
        ],
        postCode: [
          { required: true, message: "通信地址必填", trigger: "change" },
          { validator: postCodeValidate, trigger: "blur" }
        ],
        telNo1: [
          { required: true, message: "手机号必填", trigger: "change" },
          { validator: telNo1Validate, trigger: "blur" }
        ],
        telNo2: [
          { required: true, message: "备用通讯方式必填", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      console.log(this.studentForm);
      console.log(this.studentForm.address);
      var validFlag = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          validFlag = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.studentForm.updateTime);
      this.studentForm.updateTime = new moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(this.studentForm.updateTime);
      if (validFlag) {
        this.$axios
          .post("/api/student/update", this.studentForm)
          .then(response => {
            alert("信息更新成功！");
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>