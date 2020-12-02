<template>
  <select-layout :leftStyle="24" :rightShow="false">
    <span slot="title">角色管理</span>
    <span slot="describe">角色管理列表</span>
    <span slot="listTitle"><svg-icon icon-class="liebiao" />&nbsp;&nbsp;角色管理</span>
    <div slot="conditional">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="onSubmit('form')">查询</el-button>
          <el-button icon="el-icon-refresh-right" @click="onCancel('form')">重置</el-button>
          <el-button icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      slot="resultList"
      v-loading="listLoading"
      :data="list"
      :header-cell-style="{
        color: '#333',
        fontWeight: 600,
        border: 'none',
      }"
      :cell-style="{ border: 'none' }"
      fit
      :stripe="true"
      highlight-current-row
      style="padding: 0 20px; width: 100%"
    >
      <el-table-column min-width="0" align="left" label="角色id">
        <template slot-scope="scope">
          <span>{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="left" label="角色编码">
        <template slot-scope="scope">
          <span>{{ scope.row.roleCode }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="left" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="left" label="角色类型">
        <template slot-scope="scope">
          <span>{{ scope.row.roleType |getRoleName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="480">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      slot="resultList"
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </select-layout>
</template>
<script>
// 查询列表页layout
import SelectLayout from "@/views/zcztgl/components/SelectLayout";

// 分页插件
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "role",
  components: {
    Pagination,
    SelectLayout,
  },

  filters: {
    stringFilter(status) {
      return status + "";
    },
    getRoleName(roleType){
      if(roleType=="1"){
        return "超级管理员"
      }else if(roleType=="2"){
        return "招采平台普通员工"
      }else if(roleType=="3"){
        return "平台维护人员"
      }else if(roleType=="4"){
        return "外部用户"
      }else{
        return "未知"
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 12,
      },
      form: {
        roleName: "",
      },
      leftStyle: 18
    };
  },
  created() {
    this.getList();
  },
  methods: {
    validateListQuery() {
      this.$refs["listQuery"].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["listQuery"].resetFields();
    },
    //分页查询
    getList() {
      this.listLoading = true;
      this.$store.dispatch('role/getPageList', this.listQuery).then(response => {
      this.list = response.records;
      this.total = response.total;
      this.listLoading = false;
      });
    },
    //编辑
    handleUpdate(row) {
      this.$router.push("/sys/role/form/" + row.roleId);
    },
    //删除
    handleDelete(row, index) {
      this.$confirm("此操作将删除此角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("role/deleteById", row.roleId)
          .then((response) => {
            this.$message({
              type: "success",
              message: "角色删除成功!",
            })
            this.getList();
          }).catch(() => {
            this.$message({
              type: "error",
              message: "角色删除失败",
            })
          });
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.form;
          form.pageNo = this.currentPage;
          form.pageSize = this.pageSize;
          //   console.log(form);
          this.$store
            .dispatch("role/getPageListFuzzy", form)
            .then((response) => {
              //   console.log(response.records);
              this.list = response.records;
              this.total = response.total;
              this.listLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel(formName) {
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      this.$router.push("/sys/role/form/");
    },
  },
};
</script>

<style  type="text/css" scoped>
</style>
