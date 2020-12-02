<template>
  <div class="app-container">
    <!-- titie start-->
    <el-card>
      <div class="zc-title">
        <span v-if="isEdit">保证金信息编辑</span>
        <span v-else>保证金信息新增</span>
        <el-divider></el-divider>
      </div>
      <span v-if="isEdit">保证金信息编辑</span>
      <span v-else>保证金信息新增</span>
    </el-card>
    <!-- content start-->
    <el-row :gutter="24" class="zc-mt-20">
      <!-- left start -->
      <el-col :span="24">
        <el-card>
          <div class="zc-title">
            <span v-if="isEdit">编辑区域</span>
            <span v-else>新增区域</span>
            <el-divider></el-divider>
          </div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            status-icon
            :rules="rules"
            :model="formParams"
            ref="Form"
            style="min-height: 660px;"
          >
            <el-row :gutter="20" class="zc-mt-20">
              <el-col :span="10" :offset="4">
                <el-form-item label="日期" prop="rq">
                  <el-date-picker
                    v-model="rq"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                    @change="formatRq"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="银行名称" prop="yhmc">
                  <el-select v-if="isEdit" v-model="formParams.yhmc" class="zc-wth-200" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-else v-model="formParams.yhmc" class="zc-wth-200" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="zc-mt-20">
              <el-col :span="10" :offset="4">
                <el-form-item label="入账笔数" prop="rzbs">
                  <el-input v-if="isEdit" v-model="formParams.rzbs" class="zc-wth-200"></el-input>
                  <el-input v-else v-model="formParams.rzbs" class="zc-wth-200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="入账金额" prop="rzje">
                  <el-input v-if="isEdit" v-model="formParams.rzje" class="zc-wth-200"></el-input>
                  <el-input v-else v-model="formParams.rzje" class="zc-wth-200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="zc-mt-20">
              <el-col :span="10" :offset="4">
                <el-form-item label="出账笔数" prop="czje">
                  <el-input v-if="isEdit" v-model="formParams.czje" class="zc-wth-200"></el-input>
                  <el-input v-else v-model="formParams.czje" class="zc-wth-200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="出账金额" prop="czbs">
                  <el-input v-if="isEdit" v-model="formParams.czbs" class="zc-wth-200"></el-input>
                  <el-input v-else v-model="formParams.czbs" class="zc-wth-200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="zc-mt-20">
              <el-col :span="10" :offset="4">
                <el-form-item label="银行余额" prop="yhye">
                  <el-input v-if="isEdit" v-model="formParams.yhye" class="zc-wth-200"></el-input>
                  <el-input v-else v-model="formParams.yhye" class="zc-wth-200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="总余额" prop="ye">
                  <el-input v-if="isEdit" v-model="formParams.ye" class="zc-wth-200"></el-input>
                  <el-input v-else v-model="formParams.ye" class="zc-wth-200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="zc-mt-20" style="text-align:center">
              <el-button @click="onSubmit('Form')" type="primary">提交</el-button>
              <el-button @click="onCloseTab">取消</el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import '@/styles/zc.css'
  import {bzjAdd, bzjSelect, bzjUpdate} from '@/api/zcztgl'
  import {parseTime} from '@/utils/index'

  export default {
    name: 'bzj-edit',
    data() {
      var checkMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('金额不能为空'))
        }
        setTimeout(() => {
          value = Number(value)
          if (!(typeof value === 'number' && !isNaN(value))) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 0) {
              callback(new Error('金额不能小于0'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('笔数不能为空'))
        }
        value = Number(value)
        setTimeout(() => {
          if (!(typeof value === 'number' && !isNaN(value))) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 0) {
              callback(new Error('笔数不能小于0'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      return {
        options: [{
          value: '光大银行',
          label: '光大银行'
        }, {
          value: '中信银行',
          label: '中信银行'
        }],
        // 查询参数
        queryParams: {
          id: '',
        },
        // 更新参数
        formParams: {
          id: null,
          rq: null,
          yhmc: null,
          rzje: null,
          czje: null,
          rzbs: null,
          czbs: null,
          yhye: null,
          ye: null,
        },
        // 日期 用来和组件映射，实际不作为参数传递
        rq: '',
        // 是否加载
        loading: false,
        // 定时器
        timer: null,
        // 是否编辑页面
        isEdit: false,
        labelPosition: 'left',
        rules: {
          rq: [
            {
              required: true,
              message: '请选择日期',
              trigger: 'blur',
            },
          ],
          yhmc: [
            {
              required: true,
              message: '请输入银行名称',
              trigger: 'blur',
            },
            {
              min: 4,
              max: 20,
              message: '长度在 4 到 20 个字符',
              trigger: 'blur',
            },
          ],
          rzje: [{required: true, validator: checkMoney, trigger: 'blur'}],
          czje: [{required: true, validator: checkMoney, trigger: 'blur'}],
          rzbs: [{required: true, validator: checkNumber, trigger: 'blur'}],
          czbs: [{required: true, validator: checkNumber, trigger: 'blur'}],
          yhye: [{required: true, validator: checkMoney, trigger: 'blur'}],
          ye: [{required: true, validator: checkMoney, trigger: 'blur'}],
        },
      }
    },
    created() {
      this.queryParams.id = this.$route.params.id
      if (this.$route.query.isEdit != undefined) {
        this.isEdit = this.$route.query.isEdit
      }
      if (this.isEdit) {
        this.bzjSelect()
      }
    },
    methods: {
      bzjUpdate: function () {
        this.loading = true
        bzjUpdate(this.formParams).then((response) => {
          if (response == 1) {
            this.$message({
              message: '更新成功',
              type: 'success',
            })
            //更新成功 刷新列表
            this.returnList()
          } else {
            this.$message({
              message: '更新失败，请刷新列表后后重试',
              type: 'warning',
            })
          }
          this.loading = false
        })
      },
      bzjSelect: function () {
        this.loading = true
        bzjSelect(this.queryParams).then((response) => {
          if (response) {
            this.formParams = response
            this.rq = new Date(Date.parse(this.covertDate(response.rq)))
            // console.log('查询结果', response)
          } else {
            this.$message({
              message: '查询失败，请刷新列表后后重试',
              type: 'warning',
            })
          }
          this.loading = false
        })
      },
      bzjAdd() {
        this.loading = true
        bzjAdd(this.formParams).then((response) => {
          if (response == 1) {
            this.$message({
              message: '新增成功',
              type: 'success',
            })
            this.returnList()
          } else {
            this.$message({
              message: '新增失败，请刷新列表后后重试',
              type: 'warning',
            })
          }
          this.loading = false
        })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              this.bzjUpdate()
            } else {
              this.bzjAdd()
            }
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
      // 将时间格式化为指定格式字符串
      formatRq(args) {
        // console.log(args)
        this.formParams.rq = parseTime(args, '{y}{m}{d}')
      },
      // 将后台传递的字符格式化为指定时间字符串
      covertDate(date) {
        if (date) {
          date = date + ''
          date = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6,2)}`
        }
        //console.log( date)
        return date
      },
    },
  }
</script>

<style type="text/css" scoped>
</style>>

</style>
