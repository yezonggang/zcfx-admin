<template>
	<detail-layout :leftStyle="12" :rightStyle="12">
		<span slot="title">招标人画像</span>
		<span slot="describe">查看招标人详细信息</span>
		<span slot="detail-title"><svg-icon icon-class="qiye" />&nbsp;&nbsp;招标人基本信息</span>
		<span slot="chart1-title"> <svg-icon icon-class="yingbi" />&nbsp;&nbsp;招标方采购项目统计</span>
		<span slot="chart2-title"><svg-icon icon-class="guanxi" />&nbsp;&nbsp;历史中标供应商</span>
		<Bar :option="option" slot="chart1" id="pie" height="100%" width="100%" />
		<!-- 列表轮播 start -->
		<div slot="chart2" style="text-align: center">
			<el-carousel
				:direction="carousel.direction"
				indicator-position="none"
				:interval="carousel.interval"
				height="400px"
			>
				<el-carousel-item v-for="(item,i) in tableData" :key="i">
					<el-row>
						<el-table :data="item" 
						    :header-cell-style="{fontWeight:'normal',border:'none'}"
							:cell-style="{border:'none'}"
							fit
							:stripe="true"
						>
							<el-table-column prop="name" align="left" label="项目名称" min-width="80">
								<template slot-scope="scope">
									<span class="zc-table-span" :title="scope.row.xmmc">{{ scope.row.xmmc }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="name" align="left" label="单位" min-width="50">
								<template slot-scope="scope">
									<span class="zc-table-span" :title="scope.row.gysmc">{{ scope.row.gysmc }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="name" align="center" label="开标时间" min-width="40">
								<template slot-scope="scope">
									<span>{{ scope.row.kbsj | dateFormat }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="name" align="center" label="中标金额" min-width="30">
								<template slot-scope="scope">
									<span v-if="scope.row.zbje ">{{ scope.row.zbje }} 万元</span>
									<span v-else>暂无数据</span>
								</template>
							</el-table-column>
						</el-table>
					</el-row>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- 列表轮播结束 -->
		<el-row slot="row1" :gutter="20" class="zc-mt-20 zc-row1">
			<el-col :span="24" :offset="defaultOffset">
				<div>
					<span style="font-size:24px">{{resultData.zzmc}}</span>
				</div>
			</el-col>
		</el-row>

		<div slot="rowes">
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>统一社会信用代码[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>23123333557859</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6">
					 <div class="zc-field">
						<span>招标项目数量：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span v-if="resultData.zbsl">{{resultData.zbsl}} 个</span>
					<span v-else>暂无数据</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>近两月交易平台采购次数：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span v-if="resultData.jqcgsl">{{resultData.jqcgsl}} 次</span>
					<span v-else>暂无数据</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>注册资本(元）[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>1800万</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>招标总金额：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span v-if="resultData.zbzje">{{resultData.zbzje}} 万元</span>
					<span v-else>暂无数据</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>营业期限[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>1999-08-07至无固定期限</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>认缴资本(元）[演示]：</span>
					</div>
				</el-col>
				<el-col :span="6" :offset="1">
					<span>10,000,000</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>人员规模[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>200人以上</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>招标品目：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span v-if="resultData.zbpm">{{resultData.zbpm }}</span>
					<span v-else>暂无数据</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>联系方式[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>4532319999</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>联系人[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>王某</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>税务登记号[演示]：</span>
					</div>
				</el-col>
				<el-col :span="12" :offset="1">
					<span>0009887655</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="zc-mt-20">
				<el-col :span="6" :offset="0">
					 <div class="zc-field">
						<span>集团组织结构：</span>
					</div>
				</el-col>
				<el-col :span="17" :offset="1">
					<span v-if="resultData.zzjg">{{resultData.zzjg | formatterZzjg}}</span>
					<span v-else>暂无数据</span>
				</el-col>
			</el-row>
		</div>
	</detail-layout>
</template>

<script>
// echarts 支持(暂时使用测试数据)
// import Pie from './components/Pie'
import Bar from './components/Bar'
import DetailLayout from './components/DetailLayout'
import { cgrjbxx2, zbfcgxmtj, lszbgys } from '@/api/zcztgl'
import echarts from 'echarts'
import { dateFormat } from '@/utils/zcfx-filters';

const option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
		type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	},
	formatter: function(params) {
		var result = params[0].axisValue 
		params.forEach(function (item) {
			let color = item.seriesIndex==0?
			'background-image: linear-gradient(180deg,#6a87ff 0%,#48deb9 100%), linear-gradient(#95bfff, #95bfff)':
			'background-image: linear-gradient(180deg, #6b71ad 0%, #e295ff 100%),linear-gradient(#6b99ad, #6b99ad);'
			result +='</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;'+color+'"></span>'+ item.seriesName + ": " + item.data
		})
		return result
		}
	},
	grid: {
		left: '2%',
		right: '4%',
		bottom: '14%',
		top:'16%',
		containLabel: true
	},
	legend: {
		data: [],
		left: 0,
		top:10,
		textStyle: {
			color: "#333"
		},
		itemWidth: 12,
		itemHeight: 10,
		// itemGap: 35
	},
	xAxis: [{
		type: 'category',
		data: [
			'0-10万',
			'10-20万',
			'20-50万',
			'50-100万',
			'100-500万',
			'500万以上'
		],
		axisLine: {
		show:false
		},
		axisTick:{
			show:false
		},
		axisLabel: {
		textStyle: {
			color:'#333'
		}
		},
	}],
	yAxis: [{
		type: 'value',
		axisLine: {
		show: false,
		},
		axisTick:{
			show:false
		},
		axisLabel: {
		textStyle: {
			color:'#333'
		}
		},
		splitLine: {
		show: true,
		lineStyle: {
			color: '#e6e6e6'
		}
		},
		axisLabel: {}
	}],
	series: [
		{
		name: 'bar1',
		type: 'bar',
		barWidth: '10%',
		barMinHeight:5,
		itemStyle: {
		normal: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: '#6a87ff'
			}, {
				offset: 1,
				color: '#48deb9'
			}]),
			barBorderRadius: [12,12,0,0],
		},
		},
		data: []
	},
		{
		name: 'bar2',
		type: 'bar',
		barWidth: '10%',
		barMinHeight:5,
		itemStyle: {
		normal: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: '#6a87ff'
			}, {
				offset: 1,
				color: '#ca77f6'
			}]),
			barBorderRadius: [12,12,0,0],
		},
		},
		data: []
	},
		{
		name: 'bar3',
		type: 'bar',
		barWidth: '10%',
		barMinHeight:5,
		itemStyle: {
		normal: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: '#ffad25'
			}, {
				offset: 1,
				color: '#ffc057'
			}]),
			barBorderRadius: [12,12,0,0],
		},
		},
		data: []
	},
	{
		name: 'bar4',
		type: 'bar',
		barWidth: '10%',
		barMinHeight:5,
		itemStyle: {
		normal: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: '#4463ff'
			}, {
				offset: 1,
				color: '#5ab3fe'
			}]),
			barBorderRadius: [12,12,0,0],
		}
		
		},
		data: []
	},
	{
		name: 'bar5',
		type: 'bar',
		barWidth: '10%',
		barMinHeight:5,
		itemStyle: {
		normal: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: '#e63839'
			}, {
				offset: 1,
				color: '#ff7e7f'
			}]),
			barBorderRadius: [12,12,0,0],
		}
		
		},
		data: []
	},
	{
		name: 'bar6',
		type: 'bar',
		barWidth: '10%',
		barMinHeight:5,
		itemStyle: {
		normal: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgba(146,46,246,0.71)'
			}, {
				offset: 1,
				color: 'rgba(237,79,245,0.71)'
			}]),
			barBorderRadius: [12,12,0,0],
		}
		
		},
		data: []
	}
	]
}
export default {
	name: 'cgr-detail',
	components: { DetailLayout, Bar },
	data() {
		return {
			defaultOffset:1,
			queryParams: {
				zzmc: null,
				dwbh: null,
			},
			resultData: {},
			option: option,
			tableData: [],
			carousel: {
				carousel: 5000,
				direction: 'vertical',
			},
		}
	},
	filters:{
		formatterZzjg(zzjg){
			return (zzjg+"").replaceAll(',',' - ')
		},
		dateFormat: dateFormat
	},
	created() {
		this.queryParams.zzmc = this.$route.params.zzmc
		this.queryParams.dwbh = this.$route.params.zzid
		this.cgrjbxx()
		this.zbfcgxmtj()
		this.lszbgys()
	},
	methods: {
		cgrjbxx() {
			this.listLoading = true
			cgrjbxx2(this.queryParams).then((response) => {
				this.resultData = response
				// console.log(response)
				this.listLoading = false
			})
		},
		zbfcgxmtj() {
			this.listLoading = true
			zbfcgxmtj(this.queryParams).then((response) => {
				// 手动初始化防止刷新
				this.option.legend.data = []
				for (let i in this.option.series) {
					this.option.series[i].data = []
				}
				for (let i in response) {
					// console.log(response)
					this.option.legend.data.push(response[i].cgfs)
					this.option.series[i].name = response[i].cgfs
					delete response[i].cgfs
					for (let j in response[i]) {
						this.option.series[i].data.push(response[i][j])
					}
				}
				
				this.listLoading = false
			})
		},
		lszbgys() {
			this.listLoading = true
			lszbgys(this.queryParams).then((response) => {
				if (!Array.isArray(response)) {
					response = [response]
				}
				// console.log('xx', response)
				let size = 8
				for (var i = 0; i < response.length; i = i + size) {
					this.tableData.push(response.slice(i, i + size))
				}
				this.listLoading = false
			})
		},
	},
}
</script>
<style  type="text/css" scoped>
/* 历史投标次数 */
.bg-lstbcs {
	padding: 10px;
	color: rgb(255, 255, 255);
	background: linear-gradient(to left, #3d91c7, #41a2d5, #46b4e3);
}
.bg-lstbcs :nth-child(2) {
	padding: 5px 0;
	font-size: 30px;
}
.bg-lstbcs :nth-child(3) {
	font-size: 12px;
}
.bg-lszbcs {
	padding: 10px;
	color: rgb(255, 255, 255);
	background: linear-gradient(to left, #49ccb5, #4ed6be, #56dbc3);
}
.bg-lszbcs :nth-child(2) {
	padding: 5px 0;
	font-size: 30px;
}
.bg-lszbcs :nth-child(3) {
	font-size: 12px;
}
.bg-lszbje {
	padding: 10px;
	color: rgb(255, 255, 255);
	background: linear-gradient(to left, #47cbb4, #4ed6be, #52dac2);
}
.bg-lszbje span:nth-child(2) {
	font-size: 8px;
}
.bg-lszbje :nth-child(2) {
	padding: 5px 0;
	font-size: 30px;
}

.bg-lszbje :nth-child(3) {
	font-size: 12px;
}
.bg-jyntbcs {
	padding: 10px;
	color: rgb(255, 255, 255);
	background: linear-gradient(to left, #86ba65, #92c370, #96c775);
}
.bg-jyntbcs :nth-child(2) {
	padding: 5px 0;
	font-size: 30px;
}
.bg-jyntbcs :nth-child(3) {
	font-size: 12px;
}
.bg-jynzbcs {
	padding: 10px;
	color: rgb(255, 255, 255);
	background: linear-gradient(to left, #d5ab64, #e1b365, #e9bf78);
}
.bg-jynzbcs :nth-child(2) {
	padding: 5px 0;
	font-size: 30px;
}
.bg-jynzbcs :nth-child(3) {
	font-size: 12px;
}

.ztpfxj {
	display: flex;
	align-items: flex-end;
	text-align: center;
	margin: 10px auto;
	height: 36px;
}

.ztpfxj .vlaue-1 {
	font-size: 36px;
	color: rgb(2, 167, 240);
}
.ztpfxj .vlaue-2 {
	color: rgb(2, 167, 240);
}
</style>