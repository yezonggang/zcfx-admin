<template>
	<div
		:id="id"
		:class="className"
		:style="{ height: height, width: width }"
	/>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import china from '@/assets/js/china'
//   import {mapOptions} from '@/assets/js/map-options'

const defaultOption = {
	backgroundColor: '#FFFFFF',
	title: {
		text: '全国供应商分布',
		subtext: '',
		x: 'center',
	},
	tooltip: {
		trigger: 'item',
	},
	//左侧小导航图标
	visualMap: {
		show: true,
		x: 'left',
		y: 'center',
		splitList: [
			{ start: 500, end: 600 },
			{ start: 400, end: 500 },
			{ start: 300, end: 400 },
			{ start: 200, end: 300 },
			{ start: 100, end: 200 },
			{ start: 0, end: 100 },
		],
		color: [
			'#5475f5',
			'#9feaa5',
			'#85daef',
			'#74e2ca',
			'#e6ac53',
			'#9fb5ea',
		],
	},
	//配置属性
	series: [
		{
			name: '数据',
			type: 'map',
			mapType: 'china',
			roam: true,
			label: {
				normal: {
					show: true, //省份名称
				},
				emphasis: {
					show: false,
				},
			},
			data: [], //数据
		},
	],
}
export default {
	name: 'Map',
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: 'map',
		},
		id: {
			type: String,
			default: 'map',
		},
		width: {
			type: String,
			default: '200px',
		},
		height: {
			type: String,
			default: '200px',
		},
		option: {
			type: Object,
			default: () => defaultOption,
		},
	},
	data() {
		return {
			chart: null,
		}
	},
	watch: {
		option: {
			handler: function (val, oldval) {
				//console.log('监听到数据变化，饼图初始化....')
				this.initChart()
			},
			// 声明后立刻执行,echarts演示需要dom初始化完成，此处不要打开
			//immediate: true,
			deep: true,
		},
	},
	mounted() {
		//console.log('饼图初始化,注意此mounted处执行的初始化只是用来演示组件')
		this.initChart()
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
	methods: {
		initChart() {
			this.chart = echarts.init(document.getElementById(this.id))

			this.chart.setOption(this.option)
		},
		resizeChart(){
      		this.chart.resize()
      	}
	},
}
</script>
