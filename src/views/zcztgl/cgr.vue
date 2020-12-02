<template>
	<select-layout slot="" :rightShow="true">
		<span slot="title" >招标人主体刻画</span>
		<span slot="describe">查看招标人信息</span>
		<!-- <span slot="listTitle" ><svg-icon icon-class="liebiao" />&nbsp;&nbsp;招标人列表</span> -->
		<span slot="chart1-title" ><svg-icon icon-class="leida" />&nbsp;&nbsp;招标人招标品目金额分布</span>
		<span slot="chart2-title" ><svg-icon icon-class="guanxi" />&nbsp;&nbsp;招标方式统计</span>
		<Pie
			slot="chart1"
			:id="pie"
			:option="option"
			:height="chartWidth"
			width="100%"
		/>
		<Pie
			slot="chart2"
			:id="pie2"
			:option="option2"
			:height="chartWidth"
			width="100%"
		/>
		<template v-slot:left>
			<el-col :span="6" style="position: relative">
				<el-card
					style="
						height: 100%;
						width: calc(100% - 20px);
						position: absolute;
						left: 10px;
						top: 0;
					"
				>
					<div class="grid-content " style="height:100%">
						<div class="zc-title">
							<span name="listTitle"><svg-icon icon-class="qiye" />&nbsp;&nbsp;招标人板块</span>
						</div>
						<!-- 此处放置树形结构 -->
						<el-scrollbar style="height:calc(100% - 25px)">
						<el-tree
							class="flow-tree"
							:data="organData"
							show-checkbox
							node-key="id"
							:default-expanded-keys="['C90E3B3880D00001FFD2FCE31C9B84', 'C90E3B3880E00001E217103011CE71E0']"
							:props="defaultProps"
							@check="getAllSeelect"
							:render-content="renderContent"
						></el-tree>
						</el-scrollbar>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card style="height: 100%">
					<div>
						<div class="zc-title">
							<span name="listTitle"><svg-icon icon-class="liebiao" />&nbsp;&nbsp;招标人列表</span>
						</div>
						<el-table
							slot="resultList"
							v-loading="listLoading"
							:data="list"
							:header-cell-style="{color:'#333',fontWeight:600,border:'none'}"
							:cell-style="{border:'none'}"
							fit
							:stripe="true"
							highlight-current-row
							style="width: 100%"
						>
							<el-table-column
								align="left"
								label="组织简称"
							>
								<template slot-scope="scope">
									<span>{{ scope.row.zzjc | isNull }}</span>
								</template>
							</el-table-column>
							<el-table-column min-width="200px" align="left" label="公司名称">
								<template slot-scope="scope">
									<span class="zc-table-span" :title="scope.row.zzmc |e ">{{ scope.row.zzmc | e}}</span>
								</template>
							</el-table-column>

							<el-table-column
								align="left"
								label="招标总金额"
							>
								<template slot-scope="scope">
									<span>{{ scope.row.zbzje == null?"暂无数据":scope.row.zbzje+"万元"}} </span>
								</template>
							</el-table-column>

							<el-table-column  label="板块名称">
								<template slot-scope="scope">
									<span>{{ scope.row.bkmc }}</span>
								</template>
							</el-table-column>

							<el-table-column
								align="left"
								label="操作"
								width="120"
							>
							<template slot-scope="scope">
								<router-link
									:to="
										'/zcztgl/cgr-detail/' +
										scope.row.zzid +
										'/' +
										scope.row.zzmc
									"
									style="color:#4e95ff"
								>
									<span>进入画像</span>
								</router-link>
							</template>
							</el-table-column>
						</el-table>
						<pagination
							slot="resultList"
							v-show="total > 0"
							:total="total"
							:page-sizes="[15, 25, 35, 45]"
							:page.sync="listQuery.page"
							:limit.sync="listQuery.limit"
							@pagination="getList(false)"
						/>
					</div>
				</el-card>
			</el-col>
		</template>
	</select-layout>
</template>

<script>
import { isNull } from '@/utils/zcfx-filters'
// 查询列表页layout
import SelectLayout from './components/SelectLayout'
// 异步数据
import { cgrlist, cgrzbpmfb, cgrzbcgfs, tzjtorgan } from '@/api/zcztgl'
// 分页插件
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// 工具类
import { countKey, buildTree, changeMoneyUnit } from '@/utils/index'

// echarts 支持(暂时使用测试数据)
import Bar from './components/Bar'
import Pie from './components/Pie'
import { on } from 'codemirror'
import echarts from 'echarts'


export default {
	name: 'cgr',
	components: {
		Pagination,
		Bar,
		Pie,
		SelectLayout,
	},
	filters: {
		statusFilter(status) {
			const statusMap = {
				published: 'success',
				draft: 'info',
				deleted: 'danger',
			}
			return statusMap[status]
		},
	  e(str) {
      return str || "暂无数据";
    },
		isNull:isNull
	},
	data() {
		return {
			gysname: '',
			list: null,
			total: 0,
			listLoading: true,
			listQuery: {
				page: 1,
				limit: 15,
				names: '',
			},
			defaultProps: {
				children: 'children',
				label: 'yzdwmc',
			},
			organData: [],
			pie: 'pie',
			pie2: 'pie2',
			option: {
				// color: colorList,
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/> {b}: {c} 万元 ({d}%)',
				},
				legend: {
					orient: 'horizontal',
					bottom: 5,
					// data: ['货物类', '工程类', '服务类'],
					data: [],
				},
				series: [
					{
						name: '该品类招标总金额',
						type: 'pie',
						radius: ['35%', '60%'],
						center: ['50%', '50%'],
						minAngle: 45, //最小角度
						// startAngle: 180, //起始角度
						itemStyle:{
							normal: {
								borderColor: '#fff',
								borderWidth: 10,
								color: function(params) {
									// console.log(params)
                                     let colorList = [
                                    {
                                        c1: '#ffad25',  
                                        c2: '#ffc057'                                                                   
                                    },
                                    {
                                        c1: '#6a87ff',  
                                        c2: '#48deb9'
                                    },
                                    {
                                        c1: '#6a87ff',
                                        c2: '#ca77f6'
                                    }]
                                     return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
											
                                            offset: 0,
                                            color: colorList[params.dataIndex].c1
                                        }, {
                                            offset: 1,
                                            color: colorList[params.dataIndex].c2
									}])
								}
							},
						},
						data: [],
						avoidLabelOverlap: false,
						label: {
							normal: {
								formatter: function (params) {
									// let num =
									// 	JSON.stringify(params.value).slice(
									// 		0,
									// 		JSON.stringify(params.value)
									// 			.length - 4
									// 	) 
									return params.value + '万'
									//如何调用方法 待研究
									//return changeMoneyUnit(params.value)+"万元"
								},
							},
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold',
							},
						},
						labelLine: {
							show: true,
						}
					},
				]
			},
			option2: {
				color: ['#6395F9', '#68DAAB'],
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/> {b}: {c} 万元 ({d}%)',
				},
				legend: {
					orient: 'horizontal',
					bottom: '5',
					// data: ['自主招标', '委托招标'],
					data: [],
				},
				series: [
					{
						name: '该招标方式总招标金额',
						type: 'pie',
						radius: ['35%', '60%'],
						center: ['50%', '50%'],
						data: [],
						avoidLabelOverlap: false,
						minAngle: 45,
						itemStyle:{
							borderColor: '#fff',
							borderWidth: 10,
						},
						label: {
							normal: {
								formatter: function (params) {
									// console.log(params.value)
									// let num =
									// 	JSON.stringify(params.value).slice(
									// 		0,
									// 		JSON.stringify(params.value)
									// 			.length - 4
									// 	) 
									return params.value  + '万元'
									//如何调用方法 待研究
									//return changeMoneyUnit(params.value)+"万元"
								},
							},
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '20',
								fontWeight: 'bold',
							},
						},
						labelLine: {
							show: true,
						},
					},
				],
			},
			chartWidth: '100%'
		}
	},
	computed: {
		getCgzje() {
			let value = 0
			for (let i in option2.series.data) {
				value = option2.series.dat[i].value + value
			}
			return value
		},
	},
	created() {
		this.tzjtorgan()
		this.getList()
		this.cgrzbpmfb()
		this.cgrzbcgfs()
	},
	watch: {
		organData: {
			handler: function (val, oldval) {},
			deep: true,
		},
	},
	methods: {
		getList(status) {
			if(status===undefined){
				this.listQuery.page=1
			}
			this.listLoading = true
			cgrlist(this.listQuery).then((response) => {
				if (response.data) {
					if (!Array.isArray(response.data)) {
						response.data = [response.data]
					}
					this.list = response.data
					this.total = response.pageInfo.totalCount
					this.listQuery.limit = response.pageInfo.pageSize
				}
				this.listLoading = false
			})
		},
		// 招标人品目分布
		cgrzbpmfb() {
			this.listLoading = true
			cgrzbpmfb({ names: this.listQuery.names }).then((response) => {
				if (response) {
					if (!Array.isArray(response)) {
						response = [response]
					}
					this.option.series[0].data = response
					for (let k in response) {
						// console.log("招标人品目分类",k,response[k])
						this.option.legend.data.push(response[k].name)
					}
				} else {
					this.$message({
						message:
							'招标人品目分布相关数据获取为空,饼图不发生改变',
						type: 'warning',
					})
				}
				this.listLoading = false
			})
		},
		// 招标人采购方式统计
		cgrzbcgfs() {
			this.listLoading = true
			cgrzbcgfs({ names: this.listQuery.names }).then((response) => {
				if (response) {
					if (!Array.isArray(response)) {
						response = [response]
					}
					this.option2.series[0].data = response
					for (let k in response) {
						//console.log("招标人采购方式统计",k,response[k])
						this.option2.legend.data.push(response[k].name)
					}
				} else {
					this.$message({
						message:
							'招标人采购方式统计相关数据获取为空,饼图不发生改变',
						type: 'warning',
					})
				}
				this.listLoading = false
			})
		},
		tzjtorgan() {
			this.listLoading = true
			tzjtorgan().then((response) => {
				if (response) {
					// 将扁平数据立体化为树形结构
					//console.log("组织树",this.buildTree(response, 'parentId',  'organId', 'children'))
					this.organData = this.buildTree(
						response,
						'parentId',
						'organId',
						'children'
					)
				}
				this.listLoading = false
			})
		},
		buildTree(arrayList, pidStr, idStr, childrenStr) {
			return buildTree(arrayList, pidStr, idStr, childrenStr)
		},
		getAllSeelect(currentNode, NodesInfo) {
			//console.log(currentNode, NodesInfo)
			let array = []
			for (let i in NodesInfo.checkedNodes) {
				array.push(NodesInfo.checkedNodes[i].yzdwmc)
			}
			this.listQuery.names = array.join(',')
			this.getList()
			this.cgrzbpmfb()
			this.cgrzbcgfs()
		},
		renderContent(h, { node, data, store }) {
			return (
				<span class="el-tree-node__label">
					<span title={node.label}>{node.label}</span>
				</span>);
		}
	},
}
</script>

<style  type="text/css" scoped>
.el-card >>> .el-card__body{
	height:100%;
}
.el-card >>> .el-scrollbar__wrap{
	overflow-x: hidden;
}
</style>