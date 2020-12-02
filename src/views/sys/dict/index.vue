<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">

      <el-form-item label="编号" prop="id">
        <el-input v-model="form.id" placeholder="请输入编号"/>
      </el-form-item>
      <el-form-item label="表名" prop="types">
        <el-input v-model="form.types" placeholder="请输入表名"/>
      </el-form-item>
      <el-form-item label="缓存表名称，中文说明" prop="description">
        <el-input v-model="form.description" placeholder="请输入缓存表名称，中文说明"/>
      </el-form-item>
      <el-form-item label="查询SQL" prop="queryStatement">
        <el-input v-model="form.queryStatement" placeholder="请输入查询SQL"/>
      </el-form-item>
      <el-form-item label="代码字段" prop="value">
        <el-input v-model="form.value" placeholder="请输入代码字段"/>
      </el-form-item>
      <el-form-item label="名称字段" prop="label">
        <el-input v-model="form.label" placeholder="请输入名称字段"/>
      </el-form-item>
      <el-form-item label="上级代码字段" prop="parentId">
        <el-input v-model="form.parentId" placeholder="请输入上级代码字段"/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="form.version" placeholder="请输入版本"/>
      </el-form-item>
      <el-form-item label="执行数据源" prop="datasource">
        <el-input v-model="form.datasource" placeholder="请输入执行数据源"/>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" placeholder="请输入备注"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        <el-button @click="onCancel('form')">重置</el-button>
      </el-form-item>

    </el-form>
    <div class="btnRight">
      <el-button type="primary" icon="view" @click="handleAdd()"> 添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="id" width="200">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="types" width="200">
        <template slot-scope="scope">{{ scope.row.types }}</template>
      </el-table-column>
      <el-table-column align="center" label="description" width="200">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column align="center" label="queryStatement" width="200">
        <template slot-scope="scope">{{ scope.row.queryStatement }}</template>
      </el-table-column>
      <el-table-column align="center" label="value" width="200">
        <template slot-scope="scope">{{ scope.row.value }}</template>
      </el-table-column>
      <el-table-column align="center" label="label" width="200">
        <template slot-scope="scope">{{ scope.row.label }}</template>
      </el-table-column>
      <el-table-column align="center" label="parentId" width="200">
        <template slot-scope="scope">{{ scope.row.parentId }}</template>
      </el-table-column>
      <el-table-column align="center" label="version" width="200">
        <template slot-scope="scope">{{ scope.row.version }}</template>
      </el-table-column>
      <el-table-column align="center" label="datasource" width="200">
        <template slot-scope="scope">{{ scope.row.datasource }}</template>
      </el-table-column>
      <el-table-column align="center" label="remarks" width="200">
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
      </el-table-column>

    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script>

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: "正常",
          1: "禁用",
        };
        return statusMap[status];
      }
    },
    data() {
      return {
        list: null,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        listLoading: true,
        defaultProps: {
          children: 'children',
          label: 'label',
        },
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
        },
      };
    },
    created() {
      this.fetchData();
    },
    computed: {},
    mounted() {

    },
    methods: {
      fetchData() {
        this.listLoading = true;
        const param = {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        };
        this.$store.dispatch("dict/getPageList", param).then(response => {
          this.list = response.records;
          this.total = response.total;
          this.listLoading = false;
        })
        ;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData();
      },
      handleCheckChange(data, checked, indeterminate) {

      },
      loadNode() {

      },
      handleAdd() {
        this.$router.push("/dict/form")
      },
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let form = this.form
            form.pageNo = this.currentPage;
            form.pageSize = this.pageSize;
            this.$store.dispatch('dict/getList', form).then(response => {
              this.list = response.records;
              this.total = response.total;
              this.listLoading = false;
            })
            ;
          } else {
            return false;
          }
        })
        ;
      },
      onCancel(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
<style scoped>
  .btnRight {
    float: right;
  }
</style>
