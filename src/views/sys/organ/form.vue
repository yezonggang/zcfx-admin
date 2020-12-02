<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="机构id" prop="organId">
        <el-input v-model="form.organId" placeholder="请输入机构id" clearable/>
      </el-form-item>
      <el-form-item label="父级编号" prop="parentId">
        <el-input v-model="form.parentId" placeholder="请输入父级编号" clearable/>
      </el-form-item>
      <el-form-item label="所有父级编号" prop="parentIds">
        <el-input v-model="form.parentIds" placeholder="请输入所有父级编号" clearable/>
      </el-form-item>
      <el-form-item label="本级排序号（升序）" prop="treeSort">
        <el-input v-model="form.treeSort" placeholder="请输入本级排序号（升序）" clearable/>
      </el-form-item>
      <el-form-item label="所有级别排序号" prop="treeSorts">
        <el-input v-model="form.treeSorts" placeholder="请输入所有级别排序号" clearable/>
      </el-form-item>
      <el-form-item label="是否最末级（1是 0否）" prop="treeLeaf">
        <el-input v-model="form.treeLeaf" placeholder="请输入是否最末级（1是 0否）" clearable/>
      </el-form-item>
      <el-form-item label="层次级别" prop="treeLevel">
        <el-input v-model="form.treeLevel" placeholder="请输入层次级别" clearable/>
      </el-form-item>
      <el-form-item label="全节点名" prop="treeNames">
        <el-input v-model="form.treeNames" placeholder="请输入全节点名" clearable/>
      </el-form-item>
      <el-form-item label="机构编码" prop="organCode">
        <el-input v-model="form.organCode" placeholder="请输入机构编码" clearable/>
      </el-form-item>
      <el-form-item label="机构名称" prop="organName">
        <el-input v-model="form.organName" placeholder="请输入机构名称" clearable/>
      </el-form-item>
      <el-form-item label="机构全称" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入机构全称" clearable/>
      </el-form-item>
      <el-form-item label="区域编码" prop="areaCode">
        <el-input v-model="form.areaCode" placeholder="请输入区域编码" clearable/>
      </el-form-item>
      <el-form-item label="机构维度编码" prop="dimensionCode">
        <el-input v-model="form.dimensionCode" placeholder="请输入机构维度编码" clearable/>
      </el-form-item>
      <el-form-item label="机构类型(0部门 1组织)" prop="organType">
        <el-input v-model="form.organType" placeholder="请输入机构类型(0部门 1组织)" clearable/>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" placeholder="请输入负责人" clearable/>
      </el-form-item>
      <el-form-item label="办公电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入办公电话" clearable/>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入联系地址" clearable/>
      </el-form-item>
      <el-form-item label="邮政编码" prop="zipCode">
        <el-input v-model="form.zipCode" placeholder="请输入邮政编码" clearable/>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入电子邮箱" clearable/>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="form.remarks" placeholder="请输入备注信息" clearable/>
      </el-form-item>
      <el-form-item label="租户代码" prop="corpId">
        <el-input v-model="form.corpId" placeholder="请输入租户代码" clearable/>
      </el-form-item>
      <el-form-item label="租户名称" prop="corpName">
        <el-input v-model="form.corpName" placeholder="请输入租户名称" clearable/>
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
          organId: '',
          parentId: '',
          parentIds: '',
          treeSort: '',
          treeSorts: '',
          treeLeaf: '',
          treeLevel: '',
          treeNames: '',
          organCode: '',
          organName: '',
          fullName: '',
          areaCode: '',
          dimensionCode: '',
          organType: '',
          leader: '',
          phone: '',
          address: '',
          zipCode: '',
          email: '',
          remarks: '',
          corpId: '',
          corpName: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('organ/saveOrUpdate', this.form).then(response => {
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

