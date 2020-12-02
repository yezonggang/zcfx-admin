<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">

      <el-form-item label="机构id" prop="organId">
        <el-input v-model="form.organId" placeholder="请输入机构id"/>
      </el-form-item>
      <el-form-item label="父级编号" prop="parentId">
        <el-input v-model="form.parentId" placeholder="请输入父级编号"/>
      </el-form-item>
      <el-form-item label="所有父级编号" prop="parentIds">
        <el-input v-model="form.parentIds" placeholder="请输入所有父级编号"/>
      </el-form-item>
      <el-form-item label="本级排序号（升序）" prop="treeSort">
        <el-input v-model="form.treeSort" placeholder="请输入本级排序号（升序）"/>
      </el-form-item>
      <el-form-item label="所有级别排序号" prop="treeSorts">
        <el-input v-model="form.treeSorts" placeholder="请输入所有级别排序号"/>
      </el-form-item>
      <el-form-item label="是否最末级（1是 0否）" prop="treeLeaf">
        <el-input v-model="form.treeLeaf" placeholder="请输入是否最末级（1是 0否）"/>
      </el-form-item>
      <el-form-item label="层次级别" prop="treeLevel">
        <el-input v-model="form.treeLevel" placeholder="请输入层次级别"/>
      </el-form-item>
      <el-form-item label="全节点名" prop="treeNames">
        <el-input v-model="form.treeNames" placeholder="请输入全节点名"/>
      </el-form-item>
      <el-form-item label="机构编码" prop="organCode">
        <el-input v-model="form.organCode" placeholder="请输入机构编码"/>
      </el-form-item>
      <el-form-item label="机构名称" prop="organName">
        <el-input v-model="form.organName" placeholder="请输入机构名称"/>
      </el-form-item>
      <el-form-item label="机构全称" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入机构全称"/>
      </el-form-item>
      <el-form-item label="区域编码" prop="areaCode">
        <el-input v-model="form.areaCode" placeholder="请输入区域编码"/>
      </el-form-item>
      <el-form-item label="机构维度编码" prop="dimensionCode">
        <el-input v-model="form.dimensionCode" placeholder="请输入机构维度编码"/>
      </el-form-item>
      <el-form-item label="机构类型(0部门 1组织)" prop="organType">
        <el-input v-model="form.organType" placeholder="请输入机构类型(0部门 1组织)"/>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" placeholder="请输入负责人"/>
      </el-form-item>
      <el-form-item label="办公电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入办公电话"/>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入联系地址"/>
      </el-form-item>
      <el-form-item label="邮政编码" prop="zipCode">
        <el-input v-model="form.zipCode" placeholder="请输入邮政编码"/>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入电子邮箱"/>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="form.remarks" placeholder="请输入备注信息"/>
      </el-form-item>
      <el-form-item label="租户代码" prop="corpId">
        <el-input v-model="form.corpId" placeholder="请输入租户代码"/>
      </el-form-item>
      <el-form-item label="租户名称" prop="corpName">
        <el-input v-model="form.corpName" placeholder="请输入租户名称"/>
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

      <el-table-column align="center" label="organId" width="200">
        <template slot-scope="scope">{{ scope.row.organId }}</template>
      </el-table-column>
      <el-table-column align="center" label="parentId" width="200">
        <template slot-scope="scope">{{ scope.row.parentId }}</template>
      </el-table-column>
      <el-table-column align="center" label="parentIds" width="200">
        <template slot-scope="scope">{{ scope.row.parentIds }}</template>
      </el-table-column>
      <el-table-column align="center" label="treeSort" width="200">
        <template slot-scope="scope">{{ scope.row.treeSort }}</template>
      </el-table-column>
      <el-table-column align="center" label="treeSorts" width="200">
        <template slot-scope="scope">{{ scope.row.treeSorts }}</template>
      </el-table-column>
      <el-table-column align="center" label="treeLeaf" width="200">
        <template slot-scope="scope">{{ scope.row.treeLeaf }}</template>
      </el-table-column>
      <el-table-column align="center" label="treeLevel" width="200">
        <template slot-scope="scope">{{ scope.row.treeLevel }}</template>
      </el-table-column>
      <el-table-column align="center" label="treeNames" width="200">
        <template slot-scope="scope">{{ scope.row.treeNames }}</template>
      </el-table-column>
      <el-table-column align="center" label="organCode" width="200">
        <template slot-scope="scope">{{ scope.row.organCode }}</template>
      </el-table-column>
      <el-table-column align="center" label="organName" width="200">
        <template slot-scope="scope">{{ scope.row.organName }}</template>
      </el-table-column>
      <el-table-column align="center" label="fullName" width="200">
        <template slot-scope="scope">{{ scope.row.fullName }}</template>
      </el-table-column>
      <el-table-column align="center" label="areaCode" width="200">
        <template slot-scope="scope">{{ scope.row.areaCode }}</template>
      </el-table-column>
      <el-table-column align="center" label="dimensionCode" width="200">
        <template slot-scope="scope">{{ scope.row.dimensionCode }}</template>
      </el-table-column>
      <el-table-column align="center" label="organType" width="200">
        <template slot-scope="scope">{{ scope.row.organType }}</template>
      </el-table-column>
      <el-table-column align="center" label="leader" width="200">
        <template slot-scope="scope">{{ scope.row.leader }}</template>
      </el-table-column>
      <el-table-column align="center" label="phone" width="200">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column align="center" label="address" width="200">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="center" label="zipCode" width="200">
        <template slot-scope="scope">{{ scope.row.zipCode }}</template>
      </el-table-column>
      <el-table-column align="center" label="email" width="200">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column align="center" label="remarks" width="200">
        <template slot-scope="scope">{{ scope.row.remarks }}</template>
      </el-table-column>
      <el-table-column align="center" label="corpId" width="200">
        <template slot-scope="scope">{{ scope.row.corpId }}</template>
      </el-table-column>
      <el-table-column align="center" label="corpName" width="200">
        <template slot-scope="scope">{{ scope.row.corpName }}</template>
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
        this.$store.dispatch("organ/getPageList", param).then(response => {
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
        this.$router.push("/organ/form")
      },
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let form = this.form
            form.pageNo = this.currentPage;
            form.pageSize = this.pageSize;
            this.$store.dispatch('organ/getList', form).then(response => {
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
