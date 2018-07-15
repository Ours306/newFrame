<template>
  <div class="UserForm">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" style="margin: 20px auto;width: 80%;">
      <el-row>
        <el-col :span="12"><el-form-item label="姓名" prop="name">
          <el-input size="medium" v-model="form.name" clearable></el-input>
        </el-form-item></el-col>
         <el-col :span="12"><el-form-item label="联系电话" prop="tel">
          <el-input size="medium" v-model="form.tel" clearable></el-input>
        </el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><el-form-item label="家庭住址" prop="address">
          <el-input size="medium" v-model="form.address" clearable></el-input>
        </el-form-item></el-col>
        <el-col :span="12"><el-form-item label="工号" prop="worknum">
          <el-input size="medium" v-model="form.worknum" clearable></el-input>
        </el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><el-form-item label="电子邮箱" prop="email">
          <el-input size="medium" v-model="form.email" clearable></el-input>
        </el-form-item></el-col>
        <el-col :span="12"><el-form-item label="密码" prop="password">
          <el-input size="medium" v-model="form.password" clearable></el-input>
        </el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item></el-col>
      </el-row>
      <el-row style="text-align: center;margin: 20px auto">
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary" @click="returnSubmit">保存并新增</el-button>
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {save} from '@/api/user'

export default {
  data() {
    return {
      form: {
        name: '',
        tel: '',
        address: '',
        worknum: '',
        email: '',
        password: '',
        birth: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 3 到 15 个字符' }
        ],
        tel: [
          { required: true, pattern: /^1[34578]\d{9}$/, message: '请输入中国国内的手机号码' }
        ],
        address: [
          { required: true, message: '请输入家庭地址', trigger: 'blur' }
        ],
        worknum: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '邮箱格式不正确' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 25, message: '长度在 6 到 25 个字符' }
        ],
        birth: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      let flag
      this.$refs.form.validate(function (result) {
        if (result) {
          save(this.form)
          this.form = {}
          flag = true
        } else {
          flag = false
        }
      }.bind(this))
      return flag
    },
    returnSubmit() {
      if (this.submit()) {
        this.back()
      }
    },
    back() {
      this.$store.dispatch('deleteTab', {
        route: this.$route
      }).then(() => {
        this.$router.back()
      })
    }
  }
}
</script>

<style scoped>
  .UserForm {
    margin: 50px 150px;
  }
  .el-form-item {
    height: 50px;
    width: 80%;
  }

</style>
