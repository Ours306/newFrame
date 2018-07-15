<template>
  <div class="RoleList">
    <el-button type="primary" @click="add()" icon="el-icon-circle-plus-outline">新增</el-button>
    <el-button type="primary" icon="el-icon-delete" :disabled="selected.length==0" @click="removeRoles()">删除</el-button>
    <el-table ref="multipleTable" @selection-change="handleSelectionChange"
              :data="tableData" style="width: 100%;margin-top:10px">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="#" width="55">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            type="primary"
            @click="handleLook(scope.$index, scope.row)">查看</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
            type="success"
            @click="AssignPermissions(scope.$index, scope.row)">分配权限点</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRoles, Delete} from '@/api/role'
import store from '@/store/store'
export default {
  data() {
    return {
      tableData: [{}],
      selected: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selected = val
    },
    handleEdit (index, row) {
      store.commit('changeRole', row)
      this.$router.push('roleEdit')
    },
    handleLook (index, row) {
      store.commit('changeRole', row)
      this.$router.push('roleDisplay')
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Delete(row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getRole()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add() {
      this.$router.push('roleAdd')
    },
    removeRoles() {
      this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selected.forEach(function(e) {
          Delete(e)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getRole()
      })
    },
    getRole() {
      getRoles().then((data) => {
        this.tableData = data
      })
    }
  },
  created () {
    this.getRole()
  }
}
</script>

<style scoped>
  .RoleList {
    margin: 30px 50px;
  }
</style>
