<template>
		<select-layout slot :rightShow="false" :leftStyle="leftStyle">
			<span slot="listTitle"><svg-icon icon-class="liebiao" />&nbsp;&nbsp;标签树维护</span>
            <div slot="conditional" class="zc-conditional">
				<el-button type="primary" class="zc-mb-10" icon="el-icon-refresh-left" @click="getList()">刷新</el-button>
			</div>
			<el-table
				slot="resultList"
				:header-cell-style="{color:'#333',fontWeight: 600}"
				v-loading="listLoading"
				:data="list"
				max-height="620"
				border
				fit
				highlight-current-row
				lazy
				:load="load"
				row-key="bqdm"
				:tree-props="{children: 'children', hasChildren: 'bqdm'}"
				style="width: 100%"
				:span-method="arraySpanMethod"
			>
				<el-table-column min-width="80px" align="left" label="标签代码" header-align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.bqdm }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="80px" align="center" label="标签名称">
					<template slot-scope="scope">
						<span>{{ scope.row.bqmc }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="140px" align="center" label="上级标签代码">
					<template slot-scope="scope">
						<span>{{ scope.row.sjbqdm }}</span>
					</template>
				</el-table-column>
				
				<el-table-column min-width="60" align="center" label="叶子节点">
					<template slot-scope="scope">
						<span>{{ scope.row.yzbz }}</span>
					</template>
				</el-table-column>


				<el-table-column align="center" label="操作" width="200">
					<template slot-scope="scope">
						<!-- 此处的新增是给当前板块下新增，所以organId 是待新增单位的parentId -->
						<a class="link-type" @click="wdbqAdd(scope.row.sjbqdm)">
							新增
						</a>
						<!--  顶级板块不允许更新和删除 -->
						<a
							v-if="!(scope.row.sjbqdm=='0')"
							class="link-type"
							@click="wdbqUpdate(scope.row.bqdm)"
						>
							更新
						</a>
						<template>
							<el-popconfirm
							v-if="!(scope.row.sjbqdm=='0')" 
							confirmButtonText="好的"
							@onConfirm="wdbqDelete(scope.row)"
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
// 查询列表页layout
import SelectLayout from '@/views/zcztgl/components/SelectLayout'
// 请求数据
import { wdbqList , wdbqAdd, wdbqUpdate, wdbqDelete} from '@/api/wdbqgl'

// 分页插件
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// 第三方图标引入(alibaba图标库) 如果需要新增图标需要整体更新
import '@/assets/icon/iconfont.css'
export default {
	name: 'bsqwh',
	components: {
		Pagination,
		SelectLayout,
	},
	data() {
		return {
			list: [],
			total: 0,
			listLoading: true,
			listQuery: {
				sjbqdm: null,
				limit: 20,
				page: 1,
			},
			leftStyle: 24,
			dialogVisible: false,
			fileList: [],
			file: null,
			lazySave:{}
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
	},
	methods: {
		getList() {
			this.listLoading = true
			wdbqList(this.listQuery).then((response) => {
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
			this.listQuery = { sjbqdm: null, limit: 20, page: 1 }
			this.getList()
		},
		load(tree, treeNode, resolve) {
			this.listLoading = true
			wdbqList({ sjbqdm:tree.bqdm }).then((res) => {
				if (res.data) {
					if (!Array.isArray(res.data)) res.data = [res.data]
					resolve(res.data)
					this.lazySave[tree.bqdm]={tree:tree,treeNode:treeNode,resolve:resolve}
				} else {
					resolve([])
				}
				this.listLoading = false
			})
		},
		wdbqDelete(row,resolve) {
			this.listLoading = true
			let $this = this
			wdbqDelete({ id: row.bqdm }).then((response) => {
				if (response == 1) {
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					//删除成功 刷新列表
					let parent=this.lazySave[row.sjbqdm]
					$this.load(parent.tree,parent.treeNode,parent.resolve)
				} else {
					this.$message({
						message: '删除失败，请刷新列表后后重试',
						type: 'error',
					})
				}
				this.listLoading = false
			})
		},
		wdbqAdd(sjbqdm) {
			console.log(sjbqdm)
			if (!sjbqdm) {
				this.$message({
					message: '组织关键数据缺失，不能在该组织下新增组织',
					type: 'error',
				})
				return
			}
			// console.log(parentId)
			this.$router.push({
				name: 'addBqs',
				params: {
					isEdit: false,
					sjbqdm: sjbqdm,
				},
			})
		},
		wdbqUpdate(bqdm) {
            console.log(bqdm)
			if (!bqdm) {
				this.$message({
					message: '组织关键数据缺失，不能更新该组织',
					type: 'error',
				})
				return
			}
			// console.log(parentId)
			this.$router.push({
				name: 'editBqs',
				params: {
					isEdit: true,
					bqdm: bqdm,
				},
			})
		},
	

	

		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
			if (row.parentId === '0') {
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
