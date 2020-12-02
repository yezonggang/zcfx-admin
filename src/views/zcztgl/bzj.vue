<template>
	<select-layout slot :rightShow="false" :leftStyle="leftStyle">
		<span slot="title">保证金信息管理</span>
		<span slot="describe">保证金的查询录入、编辑、更新、删除</span>
		<span slot="listTitle"
			><svg-icon icon-class="liebiao" />&nbsp;&nbsp;保证金列表</span
		>
		<div slot="conditional" class="zc-conditional">
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
				<el-upload
					:action="upLoadUrl"
					:headers="importHeaders"
					ref="upload"
					name="file"
					:drag="true"
					:limit="1"
					:before-remove="beforeRemove"
					:file-list="fileList"
					:auto-upload="false"
					:on-success="upSuccess"
					:on-error="upError"
				>
					<i class="el-icon-plus avatar-uploader-icon avatar"></i>
					<div slot="tip" class="el-upload__tip">
						只能上传1个 xls/xlsx文件哦~
					</div>
				</el-upload>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitUpload"
						>上传</el-button
					>
				</span>
			</el-dialog>
			<el-form ref="listQuery" :inline="true">
				<el-form-item label="银行名称:" prop="yhmc">
					<el-input
						class="zc-wth-200 zc-mb-10"
						size="medium"
						type="text"
						v-model="listQuery.yhmc"
						@keyup.enter.native="getList()"
					></el-input>
				</el-form-item>
				<el-form-item label="日期:" prop="rq">
					<el-date-picker
						v-model="rq"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="---"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="formatRq"
					></el-date-picker>
				</el-form-item>
				<el-button
					type="primary"
					class="zc-mb-10"
					icon="el-icon-search"
					@click="getList()"
					>搜索</el-button
				>
				<el-button
					class="zc-mb-10"
					icon="el-icon-plus"
					@click="addBzj()"
					>新增</el-button
				>
				<el-button icon="el-icon-upload2" @click="dialogVisible = true"
					>导入</el-button
				>
				<el-button icon="el-icon-download" @click="submitDowload"
					>导出</el-button
				>
			</el-form>
		</div>
		<el-table
			:max-height="screenWidth"
			slot="resultList"
			v-loading="listLoading"
			:data="list"
			:header-cell-style="{
				color: '#333',
				fontWeight: 600,
			}"
			border
			fit
			:stripe="true"
			highlight-current-row
			style="width: 100%"
		>
			<el-table-column min-width="80px" align="left" label="日期">
				<template slot-scope="scope">
					<span>{{ scope.row.rq | covertDate(scope.row.rq) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				min-width="180px"
				align="left"
				label="银行名称"
				width="280px"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.yhmc }}</span>
				</template>
			</el-table-column>
			<el-table-column width="100px" align="left" label="当天入账">
				<template slot-scope="scope">
					<span>{{ scope.row.rzje }}</span>
				</template>
			</el-table-column>
			<el-table-column align="left" label="入账笔数">
				<template slot-scope="scope">
					<span>{{ scope.row.rzbs }}</span>
				</template>
			</el-table-column>
			<el-table-column min-width="80px" align="left" label="当天出账">
				<template slot-scope="scope">
					<span>{{ scope.row.czje }}</span>
				</template>
			</el-table-column>
			<el-table-column min-width="80px" align="left" label="出账笔数">
				<template slot-scope="scope">
					<span>{{ scope.row.czbs }}</span>
				</template>
			</el-table-column>
			<el-table-column min-width="100px" align="left" label="银行余额">
				<template slot-scope="scope">
					<span>{{ scope.row.ye }}</span>
				</template>
			</el-table-column>
			<el-table-column
				min-width="100px"
				align="left"
				label="总余额"
				width="180px"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.yhye }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="180">
				<template slot-scope="scope">
					<router-link :to="{path:'/sjwh/bzj-edit/' + scope.row.id,query:{isEdit: true}}" class="link-type">
						更新
					</router-link>
					<a class="link-type" @click="bzjDelete(scope.row.id)">
						删除
					</a>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			slot="resultList"
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="getList(false)"
		/>
	</select-layout>
</template>
<script>
// 查询列表页layout
import SelectLayout from './components/SelectLayout'
// 请求数据
import {
	bzjList,
	bzjDelete,
	bzjUpdate,
	bzjAdd,
	bzjImport,
	bzjExport,
} from '@/api/zcztgl'
import { parseTime } from '@/utils/index'
// 分页插件
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// 第三方图标引入(alibaba图标库) 如果需要新增图标需要整体更新
import '@/assets/icon/iconfont.css'

import store from '@/store'
import {getToken} from '@/utils/auth'
export default {
	// name: 'bzj',
	components: {
		Pagination,
		SelectLayout,
	},
	data() {
		return {
			importHeaders: {Authorization: store.getters.token || getToken()},
			screenWidth: document.body.clientWidth < 1400 ? 600 : 645,
			list: [],
			total: 0,
			listLoading: true,
			listQuery: {
				yhmc: '',
				startDate: null,
				endDate: null,
				limit: 10,
				page: 1,
			},
			rightShow: false,
			leftStyle: 24,
			rq: '',
			dialogVisible: false,
			upLoadUrl:process.env.VUE_APP_BASE_API_ES_ADMIN + '/bzj/importData',
			fileList: [],
			file: null,
		}
	},
	mounted() {
		this.getList()
	},
	filters: {
		covertDate(date) {
			if (date) {
				date = date + ''
				date =
					date.substr(0, 4) +
					'-' +
					date.substr(4, 2) +
					'-' +
					date.substr(6, 2)
			}
			//console.log( date)
			return date
		},
	},
	methods: {
		getList(status) {
			if (status === undefined) {
				this.listQuery.page = 1
			}
			this.listLoading = true
			bzjList(this.listQuery).then((response) => {
				if (response.data) {
					// console.log(response)
					if (!Array.isArray(response.data))
						response.data = [response.data]
					this.list = response.data
					this.total = response.pageInfo.totalCount
				} else {
					this.$message({
						message: '未查询到保证金信息',
						type: 'warning',
					})
				}
				this.listLoading = false
			})
		},
		bzjDelete(id) {
			this.listLoading = true
			let $this = this
			bzjDelete({ id: id }).then((response) => {
				if (response == 1) {
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					//删除成功 刷新列表
					$this.getList()
				} else {
					this.$message({
						message: '删除失败，请刷新列表后后重试',
						type: 'error',
					})
				}
				this.listLoading = false
			})
		},
		addBzj() {
			this.$router.push({
				name: 'bzj-add',
				params: {
					isEdit: false,
				},
			})
		},
		formatRq(args) {
			// console.log(args)
			this.listQuery.startDate = parseTime(args[0], '{y}{m}{d}')
			this.listQuery.endDate = parseTime(args[1], '{y}{m}{d}')
			this.getList()
		},
		submitUpload: function () {
			this.$refs.upload.submit()
		},
		submitDowload: function () {
			bzjExport()
				.then((response) => {
					const content = response
					const blob = new Blob([content])
					const fileName = '保证金.xlsx'
					if ('download' in document.createElement('a')) {
						// 非IE下载
						const elink = document.createElement('a')
						elink.download = fileName
						elink.style.display = 'none'
						elink.href = URL.createObjectURL(blob)
						document.body.appendChild(elink)
						elink.click()
						URL.revokeObjectURL(elink.href) // 释放URL 对象
						document.body.removeChild(elink)
					} else {
						// IE10+下载
						navigator.msSaveBlob(blob, fileName)
					}
					this.$message({
						message: '下载成功',
						type: 'success',
					})
				})
				.catch((err) => {
					this.$message({
						message: '出了点问题,下载失败了',
						type: 'error',
					})
				})
		},
		beforeRemove: function (file, fileList) {
			// console.log(file, fileList)
		},
		upSuccess: function (res, file, fileList) {
			if (res > 0) {
				this.$message({
					message: '上传成功',
					type: 'success',
				})
			}
			this.dialogVisible = false
			this.getList()
		},
		upError: function (err, file, fileList) {
			if (err) {
				this.$message({
					message: '上传失败',
					type: 'error',
				})
			}
		},
	},
}
</script>

<style  type="text/css" scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 180px;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 300px;
	height: 180px;
	line-height: 180px;
	text-align: center;
}
.avatar {
	width: 100%;
	height: 180px;
	display: block;
}

.pagination-container {
	margin-top: 5px;
}
</style>
