<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="编号" prop="id">
        <el-input v-model="form.id" placeholder="请输入编号" clearable/>
      </el-form-item>
      <el-form-item label="表名" prop="types">
        <el-input v-model="form.types" placeholder="请输入表名" clearable/>
      </el-form-item>
      <el-form-item label="缓存表名称，中文说明" prop="description">
        <el-input v-model="form.description" placeholder="请输入缓存表名称，中文说明" clearable/>
      </el-form-item>
      <el-form-item label="查询SQL" prop="queryStatement">
        <el-input v-model="form.queryStatement" placeholder="请输入查询SQL" clearable/>
      </el-form-item>
      <el-form-item label="代码字段" prop="value">
        <el-input v-model="form.value" placeholder="请输入代码字段" clearable/>
      </el-form-item>
      <el-form-item label="名称字段" prop="label">
        <el-input v-model="form.label" placeholder="请输入名称字段" clearable/>
      </el-form-item>
      <el-form-item label="上级代码字段" prop="parentId">
        <el-input v-model="form.parentId" placeholder="请输入上级代码字段" clearable/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="form.version" placeholder="请输入版本" clearable/>
      </el-form-item>
      <el-form-item label="执行数据源" prop="datasource">
        <el-input v-model="form.datasource" placeholder="请输入执行数据源" clearable/>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" placeholder="请输入备注" clearable/>
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
          id: '',
          types: '',
          description: '',
          queryStatement: '',
          value: '',
          label: '',
          parentId: '',
          version: '',
          datasource: '',
          remarks: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('dict/saveOrUpdate', this.form).then(response => {
          this.$message({
            message: '恭喜你，保存成功!',
            type: 'success'
          })
          this.$router.go(-1)
        })
      },
      onCancel() {
        
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>

