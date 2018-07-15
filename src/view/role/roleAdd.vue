<template>
  <div class="roleForm">
    <el-form ref="form" :model="form" label-width="80px" style="margin: 20px auto;width: 80%;">
      <el-row>
        <el-col :span="12"><el-form-item label="角色名">
          <el-input size="medium" v-model="form.name" clearable></el-input>
        </el-form-item></el-col>
      </el-row>
      <el-row style="text-align: center;margin: 20px auto">
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary" @click="Returnsubmit">保存并新增</el-button>
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {save} from '@/api/role'

export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    submit() {
      save(this.form)
      this.form = {}
    },
    Returnsubmit() {
      save(this.form)
      this.back()
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
  .roleForm {
    margin: 50px 150px;
  }
  .el-form-item {
    height: 50px;
    width: 80%;
  }

</style>
