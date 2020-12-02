<template>
  <select-layout :leftStyle="24" :rightShow="false">
    <span slot="title">用户管理</span>
    <span slot="describe">用户管理列表</span>
    <span slot="listTitle"
      ><svg-icon icon-class="liebiao" />&nbsp;&nbsp;用户管理</span
    >
    <div slot="conditional" class="zc-conditional">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名称" />
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
      style="width: 100%"
    >
      <!-- <el-table-column min-width="200px" align="left" label="员工工号">
        <template slot-scope="scope">
          <span>{{ scope.row.userCode }}</span>
        </template>
      </el-table-column> -->
      <el-table-column min-width="100" align="left" label="用户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" align="left" label="组织名称">
        <template slot-scope="scope">
          <span>{{ scope.row.organName }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="140" align="left" label="移动电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80" align="left" label="状态">
        <template slot-scope="scope">	
          <el-tag :type="scope.row.status | stringFilter ">{{ statusMap[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="300" align="left" label="角色">
        <template slot-scope="scope">
            <el-tag style="margin-right:4px"
             v-if="scope.row.roles != null" 
             v-for="(item,index) in (scope.row.roles|| '').split(',')"
             :key="item"
             >{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.regDate | moment("YYYY-MM-DD") }}</span>&nbsp;
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="{row,$index}">
          <!-- <router-link
						:to="'/zcztgl/gys-detail/' + scope.row.id"
						style="color:#4e95ff"
					>
						<span>进入画像</span>
					</router-link> -->
           <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
                   <el-button v-if="row.status =='1'" size="mini" type="success" @click="handleModifyStatus(row,0)">
            启用
          </el-button>
          <el-button v-if="row.status =='0'" size="mini" @click="handleModifyStatus(row,1)">
            禁用
          </el-button>
          <el-button size="mini" type="warning" @click="handleResetPwd(row)">
            重置
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
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
import convert from '@/utils/convertCache'

export default {
  name: "user",
  components: {
    Pagination,
    SelectLayout,
  },

    filters: {
      stringFilter(status) {
        return status + ''
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
        userName: "",
      },
      leftStyle: 18,
      rules: {
        lxrdh: [
          {
            pattern: /^1[3456789]\d{9}$/,
            required: false,
            message: "请输入正确的手机号码",
          },
        ],
      },
    };
  },
  computed: {
      organsTree() {
        return this.$store.getters.cacheTree('LT_SYS_ORGAN')
      },
      statusMap() {
        return convert(this.$store.getters.cacheList('WORK_STATUS'))
	  },
    },
  created() {

  this.getList();
  // console.log('开始获取状态')
	this.getStatus();

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
        this.listLoading = true
          this.$store.dispatch('user/getPageList', this.listQuery).then(response => {
          this.list = response.records;
          this.total = response.total;
          this.listLoading = false;
          })
      },
	    async getStatus(){
		  if (!this.$store.getters.cacheList('WORK_STATUS')){
        this.$store.dispatch('cache/getCacheList')
		  }
	  },
	//编辑
	 handleUpdate(row) {
        this.$router.push('/sys/user/form/' + row.userId)
	  },
	//禁用
      handleModifyStatus(row, status) {
        const param = {
          userId: row.userId,
          status: status
        }
        this.$store.dispatch('user/changeStatus', param).then(response => {
          // console.log("设置成功")
          this.getList()
        })
      },	  
	//重置
	handleResetPwd(row){
        this.$confirm('此操作将用户密码重置为123456, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            userId: row.userId
          }
          this.$store.dispatch('user/resetPwd', param).then(response => {
            this.$message({
              type: 'success',
              message: '密码重置成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
	  },
	  //删除
      handleDelete(row, index) {
        this.$confirm('此操作将删除此用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user/deleteById', row.userId).then(response => {
            this.$message({
              type: 'success',
              message: '用户删除成功!'
            });
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });

      },
	  
	 handleModifyStatus(row, status) {
        const param = {
          userId: row.userId,
          status: status
        }
        this.$store.dispatch('user/changeStatus', param).then(response => {
          // console.log("设置成功")
          this.getList()
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
            .dispatch("user/getPageList", form)
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
      this.$router.push("/sys/user/form");
    },
  },
};
</script>

<style  type="text/css" scoped>
</style>
