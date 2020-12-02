<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">

      <!--      <el-form-item label="资源id" prop="id">-->
      <!--        <el-input v-model="form.id" placeholder="请输入资源id"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="资源名称" prop="resName">
        <el-input v-model="form.resName" placeholder="请输入资源名称"/>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="form.url" placeholder="请输入url"/>
      </el-form-item>
      <el-form-item label="http请求类型" prop="httpMethod">
        <!--        <el-input v-model="form.httpMethod" placeholder="请输入http请求类型"/>-->
        <el-select v-model="form.httpMethod" placeholder="http请求类型" clearable>
          <el-option v-for="item in httpMethods"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <!--        <el-input v-model="form.resType" placeholder="请输入资源类型"/>-->
        <el-select v-model="form.resType" placeholder="请输入资源类型" clearable>
          <el-option v-for="item in resTypes"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"/>
        </el-select>
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

      <!--      <el-table-column align="center" label="资源id" min-width="20%">-->
      <!--        <template slot-scope="scope">{{ scope.row.id }}</template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="资源名称" min-width="20%">
        <template slot-scope="scope">{{ scope.row.resName }}</template>
      </el-table-column>
      <el-table-column align="center" label="url" min-width="20%">
        <template slot-scope="scope">{{ scope.row.url }}</template>
      </el-table-column>
      <el-table-column align="center" label="http请求类型" min-width="20%">
        <!--        <template slot-scope="scope">{{ scope.row.httpMethod }}</template>-->
        <template slot-scope="scope">
          <el-tag :type="scope.row.httpMethod | stringFilter ">{{ httpMethodMapping[scope.row.httpMethod] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资源类型" min-width="20%">
        <!--        <template slot-scope="scope">{{ scope.row.resType }}</template>-->
        <template slot-scope="scope">
          <el-tag :type="scope.row.resType | stringFilter ">{{ resTypeMapping[scope.row.resType] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="20%">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
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
  import convert from '@/utils/convertCache'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '正常',
          1: '禁用'
        }
        return statusMap[status]
      },
      stringFilter(status) {
        return status + ''
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
          label: 'label'
        },
        form: {
          id: '',
          resName: '',
          url: '',
          httpMethod: '',
          resType: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      httpMethods() {
        return this.$store.getters.cacheList('HTTP_METHOD')
      },
      resTypes() {
        return this.$store.getters.cacheList('RES_TYPE')
      },
      httpMethodMapping() {
        return convert(this.$store.getters.cacheList('HTTP_METHOD'))
      },
      resTypeMapping() {
        return convert(this.$store.getters.cacheList('RES_TYPE'))
      }

    },
    mounted() {

    },
    methods: {
      fetchData() {
        this.listLoading = true
        const param = {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        }
        this.$store.dispatch('res/getPageList', param).then(response => {
          this.list = response.records
          this.total = response.total
          this.listLoading = false
        })

      },
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
      },
      handleCheckChange(data, checked, indeterminate) {

      },
      loadNode() {

      },
      handleAdd() {
        this.$router.push('/sys/res/form')
      },
      handleUpdate(row) {
        this.$router.push('/sys/res/form/' + row.id)
      },
      handleDelete(row, index) {
        this.$store.dispatch('res/deleteById', row.id).then(response => {
          this.fetchData()
        })
      },
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let form = this.form
            form.pageNo = this.currentPage
            form.pageSize = this.pageSize
            this.$store.dispatch('res/getPageList', form).then(response => {
              this.list = response.records
              this.total = response.total
              this.listLoading = false
            })

          } else {
            return false
          }
        })

      },
      onCancel(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>
  .btnRight {
    float: right;
  }
</style>
