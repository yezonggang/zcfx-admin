<template>
  <div class="app-container">

    <el-form ref="form" :rules="rules" :model="form" label-width="120px">

      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请输入角色编码,例如：r0005" clearable/>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" clearable/>
      </el-form-item>
      <el-form-item label="角色分类" prop="roleType">
        <el-radio-group v-model="form.roleType">
          <el-radio-button :label="1">超级管理员</el-radio-button>
          <el-radio-button :label="2">招采平台普通员工</el-radio-button>
          <el-radio-button :label="3">平台维护人员</el-radio-button>
          <el-radio-button :label="4">外部用户</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色排序" prop="roleSort">
         <el-input-number v-model="form.roleSort" :min="1" :max="1000" label="请输入角色排序（升序）"></el-input-number>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="form.remarks" type="text" placeholder="请输入备注信息" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCloseTab">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>


  export default {
    components: {},
    data() {
      return {
        form: {
          roleId: '',
          roleCode: '',
          roleName: '',
          roleType: '',
          roleSort: '',
          // dataScope: '',
          bizScope: '',
          remarks: '',
          corpId: '',
          createBy:'',
        },
        rules: {
          roleCode: [ { required: true, message: '角色编码必选', trigger: 'blur' },],
          roleName: [{ required: true, message: '角色编码必选', trigger: 'blur' },],
          roleType: [{ required: true, message: '角色类型必选', trigger: 'blur' },],
          roleSort: [{ required: true, message: '角色排序必选', trigger: 'blur' },],
			  }
      }
    },
    mounted() {
      this.initForm()
    },
    methods: {
      initForm() {
        const id = this.$route.params.id
        if (id) {
          this.edit = true
          this.form = this.$store.getters.roleById(id)
        }
      },
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.createBy = this.$store.getters.name
            this.$store.dispatch('role/saveOrUpdate', this.form).then(response => {
              this.$message({
                message: '保存成功!',
                type: 'success'
              })
              this.returnList()
            })
          } else {
            return false
          }
        })
      },
      returnList() {
        //清除延迟执行
        clearTimeout(this.timer)
        //设置延迟执行
        this.timer = setTimeout(() => {
          this.onCloseTab()
        }, 1000)
      },
      // 关闭当前tab页并放回
      onCloseTab() {
        // 调用全局挂载的方法
        this.$store.dispatch('tagsView/delView', this.$route)
        // 返回上一步路由
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped>
.el-form-item {
    margin-bottom: 30px;
}
</style>

