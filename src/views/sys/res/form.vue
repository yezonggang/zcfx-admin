<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="资源id" prop="resId" hidden>
        <el-input v-model="form.id" placeholder="请输入资源id" :disabled="true"/>
      </el-form-item>
      <el-form-item label="资源名称" prop="resName">
        <el-input v-model="form.resName" placeholder="请输入资源名称" clearable/>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="form.url" placeholder="请输入url" clearable/>
      </el-form-item>
      <el-form-item label="http请求类型" prop="httpMethod">
        <!--        <el-input v-model="form.httpMethod" placeholder="请输入http请求类型" clearable/>-->
        <el-select v-model="form.httpMethod" placeholder="http请求类型">
          <el-option v-for="item in httpMethods"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <el-select v-model="form.resType" placeholder="请输入资源类型">
          <el-option v-for="item in resTypes"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
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
          resName: '',
          url: '',
          httpMethod: '',
          resType: ''
        }
      }
    },
    methods: {
      initForm() {
        const id = this.$route.params.id
        if (id) {
          let data = this.$store.getters.resById(id)
          data.httpMethod = String(data.httpMethod)
          data.resType = String(data.resType)
          this.form = data
        }
      },
      onSubmit() {
        this.$store.dispatch('res/saveOrUpdate', this.form).then(response => {
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
    },
    computed: {
      httpMethods() {
        return this.$store.getters.cacheList('HTTP_METHOD')
      },
      resTypes() {
        return this.$store.getters.cacheList('RES_TYPE')
      }
    },
    mounted() {
      console.log('initform')
      this.initForm()
    }
  }
</script>

<style scoped>

</style>

