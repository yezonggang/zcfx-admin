<template>
	<div class="app-container">
		<!-- titie start-->
		<el-card>
			<div class="zc-title">
				<span v-if="isEdit">标签树编辑</span>
				<span v-else>标签树新增</span>
				<el-divider></el-divider>
			</div>
	
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
								<el-form-item label="标签名称" prop="bqmc">
									<el-input v-if="isEdit" v-model="formParams.bqmc" class="zc-wth-200"></el-input>
									<el-input v-else v-model="formParams.bqmc" class="zc-wth-200"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="叶子节点" prop="yzbz">
									<el-input v-if="isEdit" v-model="formParams.yzbz" class="zc-wth-200"></el-input>
									<el-input v-else v-model="formParams.yzbz" class="zc-wth-200"></el-input>
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
// import { bkhfSelect, bkhfUpdate, bkhfAdd,bkhfCount} from '@/api/zcztgl'
import {wdbqAdd , wdbqCount , wdbqDelete, wdbqSelect , wdbqUpdate} from '@/api/wdbqgl'
export default {
	data() {
		return {
			// 查询参数
			queryParams: {
				bqdm: '',
			},
			// 更新参数
			formParams: {
                bqdm:null,
				bqmc: null,
                sjbqdm:null,
				yzbz: null,
            },
            	formParams1: {

				bqmc: null,
                sjbqdm:null,
				yzbz: null,
			},
			// 是否加载
			loading: false,
			// 定时器
			timer: null,
			// 是否编辑页面
			isEdit: true,
			labelPosition: 'left',
			rules: {
                bqmc: [ { required: true, message: '请输入标签名称', trigger: 'blur' },],
				yzbz: [{ required: true, message: '请输入是否叶子节点', trigger: 'blur' },],

			},
		}
	},
	created() {
		// 初始化当前页面状态状态
		if (this.$route.params.isEdit != undefined) {
			this.isEdit = this.$route.params.isEdit
		}
		// 如果是编辑状态 根据记录唯一id查询组织信息进行初始化
		// 如果是新增状态 根据父组织id 生成当前组织id
		if (this.isEdit) {
            // 编辑
            this.queryParams.bqdm = this.$route.params.bqdm
			this.wdbqSelect()
		}else{
            // 新增
			this.formParams.sjbqdm = this.$route.params.sjbqdm
			this.wdbqCount(this.formParams.sjbqdm)
        }
	},
	methods: {
		wdbqUpdate: function () {
			this.loading = true
			wdbqUpdate(this.formParams).then((response) => {
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
		wdbqSelect: function () {
			this.loading = true
			wdbqSelect(this.queryParams).then((response) => {
				if (response) {
					this.formParams = response
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
		wdbqCount:function(bqdm){
			this.loading = true
			wdbqCount({bqdm:bqdm}).then((response) => { 
				if (response || response==0) {
                    console.log(response)
					// 组装该组织的组织id
                    response = response+1
                    console.log(response)
					if(response<10){
                        
                        this.formParams.bqdm = this.formParams.sjbqdm+'00'+response

					}else if(response<100){
                        this.formParams.bqdm = this.formParams.sjbqdm+'0'+response

					}else{
						this.formParams.bqdm = this.formParams.sjbqdm+''+response
                    }
                    
				} else {
					this.$message({
						message: '获取父组织关键数据出错，无法新增数据，请刷新后重试',
						type: 'warning',
					})
					this.onCloseTab()
				}
				this.loading = false
			})	
		},
		wdbqAdd() {
			this.loading = true
			wdbqAdd(this.formParams).then((response) => {
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
						this.wdbqUpdate()
					} else {
						this.wdbqAdd()
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
		// 将后台传递的字符格式化为指定时间字符串
		covertDate(date) {
			if (date) {
				date = date + ''
				date = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(
					6,
					2
				)}`
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