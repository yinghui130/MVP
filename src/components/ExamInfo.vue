<template>
  <div>
    <fieldset>
      <legend>
        考生信息
        <span style="float:right;margin:1px">
          <logOff/>
        </span>
      </legend>
      <el-form :model="examResultInfo">
        <el-row>
          <table width="100%" style="height:150px" border="0" >
            <tr>
              <td style="color:#666666" align="right">姓名</td>
              <td align="right">{{examResultInfo.xm}}</td>
              <td style="color:#666666" align="right">身份证号</td>
              <td align="right">{{examResultInfo.zjhm}}</td>
              <td style="color:#666666" align="right">报名号</td>
              <td align="right">{{examResultInfo.bmh}}</td>
            </tr>
            <tr>
              <td style="color:#666666" align="right">专业代码</td>
              <td align="right">{{examResultInfo.bkzydm}}</td>
              <td style="color:#666666" align="right">专业名称</td>
              <td align="right">{{examResultInfo.bkzymc}}</td>
              <td style="color:#666666" align="right">所属学院</td>
              <td align="right">{{examResultInfo.bkyxsmc}}</td>
            </tr>
            <tr>
              <td style="color:#666666" align="right">学习方式</td>
              <td align="right">{{examResultInfo.bkxxfsmc}}</td>
              <td style="color:#666666" align="right">总成绩</td>
              <td align="right">{{examResultInfo.zf}}</td>
              <td align="right"></td>
              <td align="right"></td>
            </tr>
          </table>
        </el-row>

        <!-- <el-row>
          <el-col :span="8">
            <div>
              <el-form-item label="姓名">
                <span>{{examResultInfo.xm}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form-item label="身份证号">
                <span>{{examResultInfo.zjhm}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form-item label="报名号">
                <span>{{examResultInfo.bmh}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>
              <el-form-item label="专业代码">
                <span>{{examResultInfo.bkzydm}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form-item label="专业名称">
                <span>{{examResultInfo.bkzymc}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form-item label="所属学院">
                <span>{{examResultInfo.bkyxsmc}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>
              <el-form-item label="学习方式">
                <span>{{examResultInfo.bkxxfsmc}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form-item label="总成绩">
                <span>{{examResultInfo.zf}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row> -->
        <el-row>
          <table width="100%" border="1">
            <tr>
              <td colspan="3">各科目成绩</td>
            </tr>
            <tr>
              <th>科目代码</th>
              <th>科目名称</th>
              <th>成绩</th>
            </tr>
            <tr>
              <td align="right">{{examResultInfo.zzllm}}</td>
              <td align="right">{{examResultInfo.zzllmc}}</td>
              <td align="right">{{examResultInfo.zzll}}</td>
            </tr>
            <tr>
              <td align="right">{{examResultInfo.wgym}}</td>
              <td align="right">{{examResultInfo.wgymc}}</td>
              <td align="right">{{examResultInfo.wgy}}</td>
            </tr>
            <tr>
              <td align="right">{{examResultInfo.ywk1m}}</td>
              <td align="right">{{examResultInfo.ywk1mc}}</td>
              <td align="right">{{examResultInfo.ywk1}}</td>
            </tr>
            <tr>
              <td align="right">{{examResultInfo.ywk2m}}</td>
              <td align="right">{{examResultInfo.ywk2mc}}</td>
              <td align="right">{{examResultInfo.ywk2}}</td>
            </tr>
          </table>
        </el-row>
        <br>
        <br>
        <el-form-item>
          <el-row type="flex" justify="center">
            <a style="cursor:pointer;" @click="download">下载成绩单</a>
          </el-row>
        </el-form-item>
      </el-form>
    </fieldset>
  </div>
</template>
<style scoped>
td {
  text-align: center;
}
th {
  text-align: center;
}
</style>

<script>
import logOff from "@/components/LogOff";

export default {
  name: "examInfo",
  components: { logOff },
  data() {
    var examInfo = {};
    var str = window.sessionStorage.getItem("studentInfo");
    if (str != null) {
      examInfo = JSON.parse(str);
      console.log("examInfo.data()");
      console.log(examInfo);
    } else {
      this.$router.push({ path: "/newlogin/exm" });
    }
    return {
      showFlag: true,
      examResultInfo: examInfo
    };
  },
  methods: {
    onclick: function(event) {
      let url = "/api/exam/print?bmh=" + this.examResultInfo.bmh;
      this.$axios.get(url).then(function(res) {});
      console.log(name);
    },
    download: function() {
      let bmh = this.examResultInfo.bmh;
      let xmlResquest = new XMLHttpRequest();
      xmlResquest.open("GET", "/api/exam/print?bmh=" + bmh, true);
      xmlResquest.setRequestHeader(
        "Content-type",
        "application/json;charset=utf-8"
      );
      xmlResquest.responseType = "blob";
      xmlResquest.onload = function(oEvent) {
        let content = xmlResquest.response;
        let fileName = bmh + ".pdf";

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
    }
  }
};
</script>