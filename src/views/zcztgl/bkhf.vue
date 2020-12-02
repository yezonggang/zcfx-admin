<template>
		<select-layout slot :rightShow="false" :leftStyle="leftStyle">
			<span slot="title" >企业板块信息维护</span>
			<span slot="describe">企业板块信息的查询录入、编辑、更新、删除</span>
			<span slot="listTitle"><svg-icon icon-class="liebiao" />&nbsp;&nbsp;企业列表</span>
			<div slot="conditional" class="zc-conditional">
				<el-button type="primary" class="zc-mb-10" icon="el-icon-refresh-left" @click="getList()">刷新</el-button>
				<!-- <el-button class="zc-mb-10" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button> -->
				<el-button icon="el-icon-upload2" @click="dialogVisible = true">导入</el-button>
				<el-button icon="el-icon-download" @click="submitDowload">导出</el-button>
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
						<div slot="tip" class="el-upload__tip">只能上传1个 xls/xlsx文件哦~</div>
					</el-upload>

					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="submitUpload">上传</el-button>
					</span>
				</el-dialog>
			</div>

			<el-table
				ref="table"
				slot="resultList"
				:header-cell-style="{color:'#333',fontWeight: 600}"
				v-loading="listLoading"
				:data="list"
				border
				fit
				highlight-current-row
				lazy
				max-height="620"
				:load="load"
				row-key="id"
				:tree-props="{children: 'children', hasChildren: 'bkmc'}"
				style="width: 100%"
				:span-method="arraySpanMethod"
			>
				<el-table-column min-width="80px" align="left" label="业务板块" header-align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.bkmc }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="80px" align="center" label="企业名称">
					<template slot-scope="scope">
						<span class="zc-table-span" :title="scope.row.yzdwmc | e">{{ scope.row.yzdwmc }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="160px" align="center" label="企业地址">
					<template slot-scope="scope">
						<span class="zc-table-span" :title="scope.row.qydz | e">{{ scope.row.qydz }}</span>
					</template>
				</el-table-column>
				<el-table-column class-name="status-col" align="center" label="行政区域">
					<template slot-scope="scope">
						<span>{{scope.row.xzxh}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="60px" align="center" label="经度">
					<template slot-scope="scope">
						<span>{{ scope.row.longitude }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="60" align="center" label="纬度">
					<template slot-scope="scope">
						<span>{{ scope.row.latitude }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="80" align="center" label="经纬度">
					<template slot-scope="scope">
						<span>{{ scope.row.gnote }}</span>
					</template>
				</el-table-column>

				<el-table-column align="center" label="操作" width="200">
					<template slot-scope="scope">
						<!-- 此处的新增是给当前板块下新增，所以organId 是待新增单位的parentId -->
						<a class="link-type" @click="addBkhf(scope.row.organId)">
							新增
						</a>
						<!--  顶级板块不允许更新和删除 -->
						<a
							v-if="!(scope.row.parentId=='001.001')"
							class="link-type"
							@click="updateBkhf(scope.row.id)"
						>
							更新
						</a>
						<template>
							<el-popconfirm
							v-if="!(scope.row.parentId=='001.001')" 
							confirmButtonText="好的"
							@onConfirm="bkhfDelete(scope.row)"
							cancelButtonText="不用了"
							icon="el-icon-info"
							iconColor="red"
							title="删除后该组织下的其他组织也将失效，确定删除？"
						>
						<a class="link-type" slot="reference">
							删除
						</a>
						</el-popconfirm>
						</template>
					</template>
				</el-table-column>
			</el-table>
			<pagination
				slot="resultList"
				v-show="total>0"
				:total="total"
				:page.sync="listQuery.page"
				:limit.sync="listQuery.limit"
				@pagination="getList"
			/>
		</select-layout>
		
</template>
<script>
import { isNull } from '@/utils/zcfx-filters'
// 查询列表页layout
import SelectLayout from './components/SelectLayout'
// 请求数据
import {
	bkhfList,
	bkhfDelete,
	shrinkTable,
	bkhfUpdate,
	bkhfAdd,
	bkhfImport,
	bkhfExport,
} from '@/api/zcztgl'
import { parseTime } from '@/utils/index'
// 分页插件
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// 第三方图标引入(alibaba图标库) 如果需要新增图标需要整体更新
import '@/assets/icon/iconfont.css'

import store from '@/store'
import {getToken} from '@/utils/auth'
export default {
	name: 'bkhf',
	components: {
		Pagination,
		SelectLayout,
	},
	data() {
		return {
			importHeaders: {Authorization: store.getters.token || getToken()},
			list: [],
			total: 0,
			listLoading: true,
			listQuery: {
				parentId: null,
				limit: 20,
				page: 1,
			},
			leftStyle: 24,
			dialogVisible: false,
			upLoadUrl: process.env.VUE_APP_BASE_API_ES_ADMIN+'/bkhf/importData',
			fileList: [],
			file: null,
			maps: new Map()
		}
	},
	created() {
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
		e: isNull,
	},
	methods: {
		getList() {
			this.listLoading = true
			bkhfList(this.listQuery).then((response) => {
				if (response.data) {
					// console.log(response)
					if (!Array.isArray(response.data))
						response.data = [response.data]
					this.list = response.data
					this.total = response.pageInfo.totalCount
				} else {
					this.$message({
						message: '未查询到企业信息',
						type: 'warning',
					})
				}
				this.listLoading = false
			})
		},
		refresh() {
			this.listQuery = { parentId: null, limit: 20, page: 1 }
			this.getList()
		},
		load(tree, treeNode, resolve) {
			this.listLoading = true
			let id = tree.id
			this.maps.set(tree.organId,{ id, tree, treeNode, resolve })  //将当前选中节点数据存储到maps中
			bkhfList({ parentId: tree.organId }).then((res) => {
				if (res.data) {
					if (!Array.isArray(res.data)) res.data = [res.data]
					resolve(res.data)
				} else {
					resolve([])
				}
				console.log(this.$refs.table.store.states.lazyTreeNodeMap);
				this.listLoading = false
			})
		},
		bkhfDelete(row) {
			this.listLoading = true
			bkhfDelete({ id: row.id }).then((response) => {
				if (response == 1) {
					// 删除后执行表空间清理
					shrinkTable()
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					//删除成功 刷新列表
					const {parentId} = row
					const { id, tree, treeNode, resolve } = this.maps.get(parentId)//根据pid取出对应的节点数据
					this.$set(this.$refs.table.store.states.lazyTreeNodeMap, id, []); //将对应节点下的数据清空，从而实现数据的重新加载
					this.load(tree,treeNode,resolve) //刷新父节点下子节点数据
				} else {
					this.$message({
						message: '删除失败，请刷新列表后后重试',
						type: 'error',
					})
				}
				this.listLoading = false
			})
		},
		addBkhf(parentId) {
			// console.log(parentId)
			if (!parentId) {
				this.$message({
					message: '组织关键数据缺失，不能在该组织下新增组织',
					type: 'error',
				})
				return
			}
			// console.log(parentId)
			this.$router.push({
				name: 'bkhf-edit',
				params: {
					isEdit: false,
					parentId: parentId,
				},
			})
		},
		updateBkhf(id) {
			if (!id) {
				this.$message({
					message: '组织关键数据缺失，不能更新该组织',
					type: 'error',
				})
				return
			}
			// console.log(parentId)
			this.$router.push({
				name: 'bkhf-edit',
				params: {
					isEdit: true,
					id: id,
				},
			})
		},
		submitUpload: function () {
			this.$refs.upload.submit()
		},
		submitDowload: function () {
			bkhfExport()
				.then((response) => {
					const content = response
					const blob = new Blob([content])
					const fileName = '企业信息.xlsx'
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
			if (res>0) {
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
		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
			if (row.parentId === '001.001') {
				if (columnIndex === 0) {
					// 操作列合并
					return [1, 7]
				}
				if (columnIndex === 7) {
					// 操作列保留
				} else {
					// 其余不展示
					return [0, 0]
				}
			}
		},
	},
}
</script>

<style  type="text/css" scoped>
tbody >>> .el-table__row--level-0 {
	background-color: #409eff;
}

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
</style>
