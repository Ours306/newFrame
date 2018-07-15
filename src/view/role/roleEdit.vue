<template>
  <div class="roleEdit">
    <el-form ref="form" :model="form" label-width="80px" style="margin: 20px auto;width: 80%;">
      <el-row>
        <el-col :span="12"><el-form-item label="序号">
          <el-input size="medium" v-model="form.id" clearable></el-input>
        </el-form-item></el-col>
        <el-col :span="12"><el-form-item label="姓名">
          <el-input size="medium" v-model="form.name" clearable></el-input>
        </el-form-item></el-col>
      </el-row>
      <el-row style="text-align: center;margin: 20px auto">
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {update} from '@/api/role'
import store from '@/store/store'
export default {
  data() {
    return {
      form: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    submit() {
      update(this.form)
    },
    back() {
      this.$store.dispatch('deleteTab', {
        route: this.$route
      }).then(() => {
        this.$router.back()
      })
    }
  },
  created () {
    this.form = store.state.role
  },
  updated () {
    this.form = store.state.role
  }
}
</script>

<style scoped>
  .roleEdit {
    margin: 50px 150px;
  }
  .el-form-item {
    height: 50px;
    width: 80%;
  }

</style>
