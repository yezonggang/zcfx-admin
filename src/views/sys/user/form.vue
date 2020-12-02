<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">

      <!-- <el-form-item label="员工工号" prop="userCode">
        <el-input v-model="form.userCode" placeholder="请输入员工工号(3-6位)" clearable :disabled="edit"/>
      </el-form-item> -->
      <el-form-item label="员工姓名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入员工姓名" clearable/>
      </el-form-item>

      <el-form-item label="登录账号" prop="loginName">
        <el-input v-model="form.loginName" placeholder="请输入登录账号(默认密码123456)"  clearable/>
      </el-form-item>
      <el-form-item label="用户角色" prop="roleIds">
        <el-checkbox-group v-model="form.roleIds" @change="handleCheckedRolesChange">
          <el-checkbox v-for="(role, index) in this.roleList" name="type" :key="index" :label="role.roleId">{{role.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="员工性别" prop="sex">
        <el-radio-group v-model="form.sex" placeholder="请选择员工性别">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属机构" prop="organName">
        <el-input v-model="form.organName" placeholder="请选择所属机构" clearable>
          <el-button slot="append" icon="el-icon-search" @selected="handleSelected" @click="dialog.visible = true"/>
        </el-input>

      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" placeholder="请输入电子邮箱" suffix-icon="el-icon-message" clearable/>
      </el-form-item>
      <el-form-item label="手机号码">

        <el-input v-model="form.mobile" placeholder="请输入手机号码" suffix-icon="el-icon-mobile-phone" clearable/>
      </el-form-item>

      <el-form-item label="个性签名">
        <el-input v-model="form.sgin" type="textarea" placeholder="说点什么吧？"/>
      </el-form-item>

      <el-form-item label="备注信息">
        <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注信息"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <OrganDialog :dialog="dialog" @selected="handleSelected"/>
  </div>
</template>

<script>
  import OrganDialog from '@/components/OrganDialog/index'

  export default {
    components: {
      OrganDialog: OrganDialog
    },
    data() {
      return {
        form: {
          userNo: '',
          userName: '',
          loginName: '',
          organName: '',
          organId: '',
          email: '',
          roleIds: [],
          sex: '',
          mobile: '',
          remarks: '',
          sgin: '',
          op: 'add'
        },
        rules: {
          userCode: [
            { required: true, message: '请输员工工号', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' }
          ],
          roleIds: [
            { required: true, message: '请选择用户角色', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择用户性别', trigger: 'change' }
          ],
          loginName: [
            { required: true, message: '请输入员工姓名登录名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          organName: [
            { required: true, message: '请选择用户组织', trigger: 'change' }
          ]
        },
        dialog: {
          visible: false
        },
        edit: false,
        roleList: []
      }
    },
    computed: {
    },
    async created() {
      this.roleList = await this.$store.dispatch('role/getList');
    },
    mounted() {
      this.initForm()
    },
    methods: {
      initForm() {
        const id = this.$route.params.id
        if (id) {
          this.edit = true
          this.form = this.$store.getters.userById(id)
          this.$store.dispatch('role/getListByUserId',id).then(response=>{
                const data = response;
                const roleIds = data.map(role => role.roleId)
                this.form.roleIds = roleIds
            })
          this.$store.dispatch('user/getAuthByUserId',id).then(response=>{
            const data = response;
            this.form.loginName = data.loginName;
            // console.log(this.form.roleIds);
          })
        }
      },
      handleSelected(node) {
        this.form.organName = node.label
        this.form.organId = node.value
      },
      handleCheckedRolesChange(value){
        this.form.roleIds = value;
      },
      onSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/saveOrUpdate', this.form).then(response => {
              this.$message({
                message: '恭喜你，保存成功!',
                type: 'success'
              })
              this.$router.go(-1)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onCancel() {
        
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

