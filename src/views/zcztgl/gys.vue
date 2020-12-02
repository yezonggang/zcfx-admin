<template>
	<select-layout slot :rightShow="true" :leftStyle="leftStyle">
		<span slot="title">供应商主体刻画</span>
		<span slot="describe">查询供应商查询画像</span>
		<span slot="listTitle"><svg-icon icon-class="liebiao" />&nbsp;&nbsp;供应商列表</span>
		<span slot="chart1-title"><svg-icon icon-class="yingbi" />&nbsp;&nbsp;供应商注册金额区间分布</span>
		<span slot="chart2-title"><svg-icon icon-class="ditu" />&nbsp;&nbsp;供应商地域分布</span>
		<Pie
			:option="zcjefb"
			slot="chart1"
			id="pie"
			height="100%"
			width="100%"
		/>
		<Bar :option="dyfb" slot="chart2" id="bar" height="100%" width="100%" />
		<div slot="conditional" class="zc-conditional">
			<el-form :model="listQuery" ref="listQuery" :rules="rules" inline>
				<el-form-item label="供应商名称:" prop="ztmc">
					<el-input
						type="text"
						v-model="listQuery.ztmc"
						@keyup.enter.native="validateListQuery()"
					></el-input>
				</el-form-item>
				<el-form-item label="法定代表人:" prop="frmc">
					<el-input
						type="text"
						style="width:120px"
						v-model="listQuery.frmc"
						@keyup.enter.native="validateListQuery()"
					></el-input>
				</el-form-item>
				<el-form-item label="联系人:" prop="lxr">
					<el-input
						type="text"
						style="width:120px"
						v-model="listQuery.lxr"
						@keyup.enter.native="validateListQuery()"
					></el-input>
				</el-form-item>
				<el-form-item label="联系电话:" prop="lxrdh">
					<el-input
						type="text"
						v-model.number="listQuery.lxrdh"
						maxlength="11"
						@keyup.enter.native="validateListQuery()"
					></el-input>
				</el-form-item>

				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-search"
						@click="validateListQuery()"
						>搜索</el-button
					>
					<el-button
						icon="el-icon-refresh-right"
						@click="resetForm()"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<el-table
			slot="resultList"
			:max-height="screenWidth"
			v-loading="listLoading"
			:data="list"
			:header-cell-style="{color:'#333',fontWeight: 600,border:'none'}"
			:cell-style="{border:'none'}"
			fit
			:stripe="true"
			highlight-current-row
			style="width: 100%"
		>
			<el-table-column
				min-width="200px"
				align="left"
				label="供应商名称"
			>
				<template slot-scope="scope">
					<span class="zc-table-span" :title="scope.row.ztmc | e">{{ scope.row.ztmc | e}}</span>
				</template>
			</el-table-column>
			<el-table-column
				min-width="100px"
				align="left"
				label="中标总金额"
			>
				<template slot-scope="scope">
					<span class="zc-table-span" :title="scope.row.zbje | e">{{ scope.row.zbje + "万元" | e}}</span>
				</template>
			</el-table-column>
			<el-table-column align="left" label="法定代表人">
				<template slot-scope="scope">
					<span>{{ scope.row.frmc | e }}</span>
				</template>
			</el-table-column>
			<el-table-column
				width="170px"
				align="left"
				label="企业类型"
			>
				<template slot-scope="scope">
					<span class="zc-table-span" :title="scope.row.ztlb | conventDmmc(dmmcList) | e ">{{ scope.row.ztlb | conventDmmc(dmmcList) | e }}</span>
				</template>
			</el-table-column>
			<el-table-column min-width="90px" align="left" label="联系人">
				<template slot-scope="scope">
					<span>{{ scope.row.lxr | e }}</span>
				</template>
			</el-table-column>
			<el-table-column
				min-width="110px"
				align="left"
				label="联系人电话"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.lxrdh | e }}</span>
				</template>
			</el-table-column>
			<el-table-column align="left" label="操作" width="120">
				<template slot-scope="scope">
					<router-link
						:to="'/zcztgl/gys-detail/' + scope.row.id"
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
			:page-sizes="[14, 24, 34, 44]"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="getList(false)"
		/>
	</select-layout>
</template>
<script>
import { isNull } from '@/utils/zcfx-filters'

// 查询列表页layout
import SelectLayout from './components/SelectLayout'
// 请求数据
import { gyslist, gyszcje, gysdyfb, getdmmc } from '@/api/zcztgl'
// 分页插件
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// echarts 支持
import Bar from './components/Bar'
import Pie from './components/Pie'
import echarts from 'echarts'
export default {
	name: 'gysztkh',
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
		e: isNull,
		conventDmmc(value, list) {
			return list.get(value)
		},
	},
	data() {
		return {
			screenWidth: document.body.clientWidth<1400?600:645,
			list: null,
			total: 0,
			listLoading: true,
			listQuery: {
				ztmc: '',
				frmc: '',
				lxr: '',
				lxrdh: '',
				page: 1,
				limit: 14,
			},
			// 注册金额分布
			zcjefb: {
				color: ['#74D390', '#63B5FD', '#67D4D4'],
				tooltip: {
					trigger: 'item',
					formatter: '{b} : {c} ({d}%)',
				},
				legend: {
					orient: 'horizontal',
					bottom: '5',
					data: [],
				},
				series: [
					{
						name: '金额分布',
						type: 'pie',
						minAngle: 15, //最小角度
						startAngle: 180, //起始角度
						radius: ['35%', '60%'],
						center: ['50%', '50%'],
						itemStyle: {
							normal: {
								borderColor: '#fff',
								borderWidth: 10,
							},
						},
						data: [],
						emphasis: {
							itemStyle: {
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			},
			// 供应商地域分布
			dyfb: {
				grid: [
					{
						//左侧的柱状图grid
						width: '100%',
						left: '3%',
						top: '10%',
						right: '0',
						bottom: '0',
					},
				],
				xAxis: [
					{
						//左侧柱状图的X轴
						gridIndex: 0, //x 轴所在的 grid 的索引
						show: false,
					},
				],
				yAxis: [
					{
						//左侧柱状图的Y轴
						gridIndex: 0, //y轴所在的 grid 的索引
						splitLine: 'none',
						axisTick: 'none',
						axisLine: 'none',
						axisLabel: {
							verticalAlign: 'bottom',
							align: 'left',
							padding: [0, 0, 15, 15],
							textStyle: {
								color: '#333333',
								fontSize: '14',
							},
						},
						data: [],
						inverse: true,
					},
					{
						//左侧柱状图的Y轴
						gridIndex: 0, //y轴所在的 grid 的索引
						splitLine: 'none',
						axisTick: 'none',
						axisLine: 'none',
						data: [],
						inverse: true,
						axisLabel: {
							show: true,
							verticalAlign: 'bottom',
							align: 'right',
							padding: [0, 60, 15, 0],
							textStyle: {
								color: '#333',
								fontSize: '16',
							},
							formatter: function (value) {
								return value + '个'
							},
							rich: {
								y: {
									color: '#befbff',
									fontSize: 14,
								},
								x: {
									color: '#f6cf42',
									fontSize: 14,
								},
							},
						},
					},
					{
						//左侧柱状图的Y轴
						gridIndex: 0, //y轴所在的 grid 的索引
						splitLine: 'none',
						axisTick: 'none',
						axisLine: 'none',
						data: [],
					},
				],
				series: [
					{
						name: '检查',
						type: 'bar',
						xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
						yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
						data: [],
            barWidth: 8,
            barMinHeight: 70,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									1,
									0,
									0,
									0,
									[
										// 'rgba(68, 180, 255, 0.2)',
                    // 'rgba(68, 180, 255, 1)',
                    'rgba(157, 163, 255, 1)',
                    // 'rgba(206, 161, 204, 1)',
                    'rgba(255, 159, 152, 1)'
									].map((color, offset) => ({
										color,
										offset,
									}))
                ),
                barBorderRadius: 6,
							},
						},
						z: 2,
					},
					{
						name: '外框',
						type: 'bar',
						xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
						yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
						barGap: '-100%',
						data: [],
						barWidth: 8,
						itemStyle: {
							normal: {
								color: '#f2f2f2',
								barBorderRadius: 6,
							},
						},
						emphasis:{
							itemStyle:{
								color:'#f2f2f2'
							}
						},
						z: 0,
					},
				],
			},
			leftStyle: 18,
			rules: {
				lxrdh: [
					{
						pattern: /^1[3456789]\d{9}$/,
						required: false,
						message: '请输入正确的手机号码',
					},
				],
			},
			dmmcList: new Map(),
		}
	},
	created() {
		this.getList()
		this.gyszcje()
		this.gysdyfb()
		this.getdmmcList()
	},
	methods: {
		validateListQuery() {
			this.$refs['listQuery'].validate((valid) => {
				if (valid) {
					this.getList()
				} else {
					// console.log('error submit!!')
					return false
				}
			})
		},
		resetForm() {
			this.$refs['listQuery'].resetFields()
		},
		getList(status) {
			if(status===undefined){
				this.listQuery.page=1
			}
			this.listLoading = true
			gyslist(this.listQuery).then((response) => {
				if (response.data) {
					// console.log(response)
					if (!Array.isArray(response.data))
						response.data = [response.data]
					this.list = response.data
					console.log(this.list)
					this.total = response.pageInfo.totalCount
					this.listQuery.limit = response.pageInfo.pageSize
				} else {
					this.$message.error('没有查询到结果')
				}
				this.listLoading = false
			})
		},
		gyszcje() {
			this.listLoading = true
			gyszcje(this.listQuery).then((response) => {
				if (response) {
					let k = null
					for (k in response) {
						// console.log("k",k,response[k])
						this.zcjefb.legend.data.push(k)
						this.zcjefb.series[0].data.push({
							name: k,
							value: response[k],
						})
					}
				}
				this.listLoading = false
			})
		},
		gysdyfb() {
			this.listLoading = true
			gysdyfb().then((response) => {
				if (response) {
          let j = 0
          let count = 0
          for (let i = response.length - 1; i >= 0; i--) {
            count = count + response[i].num
          }
					for (let i = 0; i < response.length;  i++) {
            // 名称
            this.dyfb.yAxis[0].data.push('NO.'+(++j) +'    '+response[i].city);
            // 个数
            this.dyfb.yAxis[1].data.push(response[i].num);
            // 柱状图长度
            this.dyfb.series[0].data.push(response[i].num);
            // 柱状图外框
            this.dyfb.series[1].data.push(count);
					}
				}
				this.listLoading = false
			})
		},
		getdmmcList() {
			getdmmc({ dmlbid: '2099C0C9830D4E91AE57AE5181EC1B78' }).then(
				(response) => {
					if (response) {
						let map = new Map()
						for (const dm of response) {
							map.set(dm.dmbs, dm.dmmc)
						}
						this.dmmcList = map
					}
				}
			)
		},
	},
}
</script>

<style  type="text/css" scoped>

.pagination-container {
    margin-top: 5px;
}
</style>
